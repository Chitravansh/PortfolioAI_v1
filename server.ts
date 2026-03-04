import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
// Add this inside server.ts near the top, if not already there
import crypto from "crypto";
import slugify from "slugify";
import nodemailer from "nodemailer"; // 👈 Add this with your other imports

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfoliai";
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = "http://localhost:3000/api/auth/github/callback";

  // --- GOOGLE OAUTH ---
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = "http://localhost:3000/api/auth/google/callback";

/* ======================================================
   MongoDB Connection
   ====================================================== */
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

/*================================================================
   * Node Mailer 
   =================================================================*/

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

/**======================================================
                      Helper Function 
     ======================================================*/

const generateUniqueSlug = async (name: string) => {
  const baseSlug = slugify(name, { lower: true, strict: true });

  let slug = baseSlug;
  let counter = 1;

  while (await Portfolio.findOne({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

/* ======================================================
   Schemas & Models
   ====================================================== */

// Users collection
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String }, // optional for mock / OAuth users
    name: { type: String, required: true },
    profilePicture: { type: String }, // 👈 Store Base64 image
    isVerified: { type: Boolean, default: false }, // 👈 OTP Verification flag
    otp: { type: String }, // 👈 Stores the hashed or plain 6-digit code
    otpExpires: { type: Date },
    googleId: { type: String },
    githubId: { type: String },
  },
  { timestamps: true },
);

// Portfolios collection
const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // ownership enforced
    },
    name: { type: String, required: true },
    data: { type: Object, required: true }, // full portfolio JSON
    template: { type: String, default: "Modern" },
    status: {
      type: String,
      enum: ["draft", "active"], // 👈 explicit states
      default: "draft", // 👈 IMPORTANT: new portfolios start as draft
    },
    slug: {
      // <--- ADD THIS
      type: String,
      unique: true,
      sparse: true, // allows multiple nulls for drafts
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

/* ======================================================
   JWT Middleware (protects private routes)
   ====================================================== */
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user; // { id, email }
    next();
  });
};

/* ======================================================
   Server Bootstrap
   ====================================================== */
async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  /* --------------------
     Health Check
     -------------------- */
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  /* ======================================================
     AUTH ROUTES
     ====================================================== */

  // Register (real users)
  // app.post("/api/auth/register", async (req, res) => {
  //   const { email, password, name } = req.body;

  //   try {
  //     if (!email || !password || !name) {
  //       return res.status(400).json({ error: "Missing fields" });
  //     }

  //     const existing = await User.findOne({ email });
  //     if (existing) {
  //       return res.status(409).json({ error: "User already exists" });
  //     }

  //     const hashedPassword = await bcrypt.hash(password, 10);
  //     const user = await User.create({
  //       email,
  //       password: hashedPassword,
  //       name,
  //     });

  //     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
  //       expiresIn: "7d",
  //     });

  //     res.status(201).json({
  //       user: { id: user._id, email: user.email, name: user.name },
  //       token,
  //     });
  //   } catch (error: any) {
  //     res.status(500).json({ error: error.message });
  //   }
  // });

  /**===============================================================
   * Register and Verify Otp
   =================================================================*/
   // 1. Request Registration & Send OTP
  app.post("/api/auth/register-request", async (req, res) => {
    const { email, password, confirmPassword, name, profilePicture } = req.body;

    try {
      if (!email || !password || !confirmPassword || !name) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser.isVerified) {
        return res.status(409).json({ error: "User already exists and is verified" });
      }

      // Generate a 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // Valid for 5 mins
      const hashedPassword = await bcrypt.hash(password, 10);

      // Upsert user (Create new, or overwrite unverified existing)
      if (existingUser) {
        existingUser.password = hashedPassword;
        existingUser.name = name;
        existingUser.profilePicture = profilePicture;
        existingUser.otp = otpCode;
        existingUser.otpExpires = otpExpires;
        await existingUser.save();
      } else {
        await User.create({
          email,
          password: hashedPassword,
          name,
          profilePicture,
          otp: otpCode,
          otpExpires,
          isVerified: false,
        });
      }

      // Send the email
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your PortfoliAI Account",
        text: `Hi ${name},\n\nYour verification code is: ${otpCode}\n\nThis code will expire in 5 minutes.`,
      };

      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "OTP sent to your email" });
    } catch (error: any) {
      console.error("Registration Request Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // 2. Verify OTP & Finalize Registration
  app.post("/api/auth/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (user.isVerified) {
        return res.status(400).json({ error: "User is already verified" });
      }
      if (user.otp !== otp) {
        return res.status(400).json({ error: "Invalid OTP" });
      }
      if (!user.otpExpires || user.otpExpires < new Date()) {
        return res.status(400).json({ error: "OTP has expired. Please request a new one." });
      }

      // Mark as verified and clear OTP data
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      // Log them in immediately
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({
        message: "Registration successful",
        user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture },
        token,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Login (REAL + MOCK)
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email) {
        return res.status(400).json({ error: "Email required" });
      }

      let user = await User.findOne({ email });

      /* --------------------
         MOCK LOGIN (email only)
         Used for testing / demos
         -------------------- */
      if (!password) {
        if (!user) {
          user = await User.create({
            email,
            name: email.split("@")[0],
          });
        }

        const token = jwt.sign(
          { id: user._id, email: user.email },
          JWT_SECRET,
          { expiresIn: "7d" },
        );

        return res.json({
          user: { id: user._id, email: user.email, name: user.name },
          token,
          mock: true,
        });
      }

      /* --------------------
         REAL LOGIN
         -------------------- */
      if (!user || !user.password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.json({
        user: { id: user._id, 
          email: user.email, 
          name: user.name, 
          profilePicture: user.profilePicture},
        token,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  /* ======================================================
     OAUTH 2.0 ROUTES (GOOGLE & GITHUB)
     ====================================================== */



  app.get("/api/auth/google/url", (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
    res.json({ url });
  });

  app.get("/api/auth/google/callback", async (req, res) => {
    const { code } = req.query;

    try {
      // 1. Exchange code for token
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          code: code as string,
          client_id: GOOGLE_CLIENT_ID as string,
          client_secret: GOOGLE_CLIENT_SECRET as string,
          redirect_uri: GOOGLE_REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await tokenResponse.json();
      if (tokenData.error) throw new Error(tokenData.error_description);

      // 2. Get user profile
      const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const userData = await userResponse.json();

      // 3. Database Sync
      let user = await User.findOne({ email: userData.email });
      
      if (!user) {
        user = await User.create({
          email: userData.email,
          name: userData.name,
          googleId: userData.id,
          profilePicture: userData.picture,
          isVerified: true, 
        });
      } else if (!user.googleId) {
        user.googleId = userData.id;
        user.isVerified = true;
        if (!user.profilePicture) user.profilePicture = userData.picture;
        await user.save();
      }

      // 4. Issue JWT and close popup
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

      res.send(`
              <script>
                window.opener.postMessage({ 
                  type: "OAUTH_SUCCESS", 
                  token: "${token}",
                  user: ${JSON.stringify({ id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture })}
                }, "*");
                window.close();
              </script>
            `);
    } catch (err: any) {
      console.error("Google OAuth Error:", err.message);
      res.status(500).send("Authentication failed. Please close this window and try again.");
    }
  });

  // --- GITHUB OAUTH ---


  app.get("/api/auth/github/url", (req, res) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;
    res.json({ url });
  });

  app.get("/api/auth/github/callback", async (req, res) => {
    const { code } = req.query;

    try {
      // 1. Exchange code for token
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", 
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: GITHUB_REDIRECT_URI,
        }),
      });

      const tokenData = await tokenResponse.json();
      if (tokenData.error) throw new Error(tokenData.error_description);
      const accessToken = tokenData.access_token;

      // 2. Get user profile
      const userResponse = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userData = await userResponse.json();

      // 3. Get user emails (Crucial for private GitHub emails)
      let email = userData.email;
      if (!email) {
        const emailResponse = await fetch("https://api.github.com/user/emails", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const emails = await emailResponse.json();
        const primaryEmail = emails.find((e: any) => e.primary && e.verified);
        email = primaryEmail ? primaryEmail.email : emails[0].email;
      }

      if (!email) throw new Error("Could not retrieve a valid email from GitHub");

      // 4. Database Sync
      let user = await User.findOne({ email });
      
      if (!user) {
        user = await User.create({
          email: email,
          name: userData.name || userData.login, 
          githubId: userData.id.toString(),
          profilePicture: userData.avatar_url,
          isVerified: true, 
        });
      } else if (!user.githubId) {
        user.githubId = userData.id.toString();
        user.isVerified = true;
        if (!user.profilePicture) user.profilePicture = userData.avatar_url;
        await user.save();
      }

      // 5. Issue JWT and close popup
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

    res.send(`
            <script>
              window.opener.postMessage({ 
                type: "OAUTH_SUCCESS", 
                token: "${token}",
                user: ${JSON.stringify({ id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture })}
              }, "*");
              window.close();
            </script>
          `);
    } catch (err: any) {
      console.error("GitHub OAuth Error:", err.message);
      res.status(500).send("Authentication failed. Please close this window and try again.");
    }
  });

  /* ======================================================
     PORTFOLIO ROUTES (AUTH REQUIRED)
     ====================================================== */

  // Get portfolios for logged-in user
  app.get("/api/portfolios", authenticateToken, async (req: any, res) => {
    try {
      const portfolios = await Portfolio.find({
        userId: req.user.id,
      }).sort({ updatedAt: -1 });

      res.json(portfolios);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // CREATE portfolio (always draft)
  app.post("/api/portfolios", authenticateToken, async (req: any, res) => {
    const { name, data, template } = req.body;

    try {
      if (!name || !data) {
        return res.status(400).json({ error: "Invalid portfolio data" });
      }

      const slug = await generateUniqueSlug(name);

      const portfolio = await Portfolio.create({
        userId: req.user.id,
        name,
        data,
        template: template || "Modern",
        status: "draft", // 👈 IMPORTANT: start as draft
        slug,
      });

      res.json({ success: true, portfolio });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // UPDATE portfolio (autosave OR publish)
  app.put("/api/portfolios/:id", authenticateToken, async (req: any, res) => {
    const { id } = req.params;
    const { name, data, template, status, slug } = req.body;

    try {
      // Only update fields that are provided
      const update: any = {};

      if (name) update.name = name;
      if (data) update.data = data;
      if (template) update.template = template;
      //if (status) update.status = status;

      if (status) {
        update.status = status;

        if (status === "active") {
          // update.slug = crypto.randomBytes(6).toString("hex");
          update.status = status;
        }
      }

      //Slug

      if (slug) {
        const cleanSlug = slugify(slug, { lower: true, strict: true });

        const existing = await Portfolio.findOne({ slug: cleanSlug });

        if (existing && existing._id.toString() !== id) {
          return res.status(409).json({ error: "Slug already taken" });
        }

        update.slug = cleanSlug;
      }

      const portfolio = await Portfolio.findOneAndUpdate(
        { _id: id, userId: req.user.id }, // ownership check
        update,
        { new: true },
      );

      if (!portfolio) {
        return res.status(404).json({ error: "Portfolio not found" });
      }

      res.json({ success: true, portfolio });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE portfolio
  app.delete(
    "/api/portfolios/:id",
    authenticateToken,
    async (req: any, res) => {
      try {
        const deleted = await Portfolio.findOneAndDelete({
          _id: req.params.id,
          userId: req.user.id,
        });

        if (!deleted) {
          return res.status(404).json({ error: "Portfolio not found" });
        }

        res.json({ success: true });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    },
  );

  /* ======================================================
     PUBLIC ROUTE (NO AUTH) - UPDATED TO USE SLUG
     ====================================================== */

  // Public portfolio (shareable link)
  // app.get("/api/public/portfolio/:slug", async (req, res) => {
  //   try {
  //     const portfolio = await Portfolio.findOne({
  //       slug: req.params.slug,
  //       status: "active",
  //     }).select("name data template createdAt"); // 👈 expose only safe fields

  //     if (!portfolio || portfolio.status !== "active") {
  //       return res.status(404).json({ error: "Portfolio not found" });
  //     }

  //     res.json(portfolio);
  //   } catch (err: any) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });

  // Public portfolio (shareable link)
  app.get("/api/public/portfolio/:slug", async (req, res) => {
    try {
      const requestedSlug = req.params.slug.trim();
      console.log(
        `[API] 🔍 Searching for portfolio with slug: "${requestedSlug}"`,
      );

      const portfolio = await Portfolio.findOne({
        slug: requestedSlug,
        status: "active",
      }).select("name data template createdAt");

      if (!portfolio) {
        console.log(
          `[API] ❌ No ACTIVE portfolio found for: "${requestedSlug}"`,
        );

        // Diagnostic check: Does it exist but as a draft?
        const draftCheck = await Portfolio.findOne({ slug: requestedSlug });
        if (draftCheck) {
          console.log(
            `[API] ⚠️ Found it, but status is "${draftCheck.status}"!`,
          );
        } else {
          console.log(
            `[API] 👻 Document does not exist in this database at all.`,
          );
        }

        return res
          .status(404)
          .json({ error: "Portfolio not found or is currently a draft" });
      }

      console.log(`[API] ✅ Success! Sending: ${portfolio.name}`);
      res.json(portfolio);
    } catch (err: any) {
      console.error(`[API] 🔥 Server Error:`, err.message);
      res.status(500).json({ error: err.message });
    }
  });

  //Checking slug availbilty

  app.get("/api/slug/check/:slug", async (req, res) => {
    const slug = slugify(req.params.slug, { lower: true, strict: true });

    const exists = await Portfolio.findOne({ slug });

    res.json({
      available: !exists,
      slug,
    });
  });

  /* ======================================================
     VITE / STATIC SERVING
     ====================================================== */
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
