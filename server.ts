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

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfoliai";
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

/* ======================================================
   MongoDB Connection
   ====================================================== */
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

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
  app.post("/api/auth/register", async (req, res) => {
    const { email, password, name } = req.body;

    try {
      if (!email || !password || !name) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        name,
      });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.status(201).json({
        user: { id: user._id, email: user.email, name: user.name },
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
        user: { id: user._id, email: user.email, name: user.name },
        token,
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
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
    console.log(`[API] 🔍 Searching for portfolio with slug: "${requestedSlug}"`);

    const portfolio = await Portfolio.findOne({
      slug: requestedSlug,
      status: "active",
    }).select("name data template createdAt");

    if (!portfolio) {
      console.log(`[API] ❌ No ACTIVE portfolio found for: "${requestedSlug}"`);
      
      // Diagnostic check: Does it exist but as a draft?
      const draftCheck = await Portfolio.findOne({ slug: requestedSlug });
      if (draftCheck) {
        console.log(`[API] ⚠️ Found it, but status is "${draftCheck.status}"!`);
      } else {
        console.log(`[API] 👻 Document does not exist in this database at all.`);
      }

      return res.status(404).json({ error: "Portfolio not found or is currently a draft" });
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
      slug
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
