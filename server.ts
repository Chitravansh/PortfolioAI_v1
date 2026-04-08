// // import express from "express";
// // import { createServer as createViteServer } from "vite";
// // import path from "path";
// // import mongoose from "mongoose";
// // import jwt from "jsonwebtoken";
// // import bcrypt from "bcryptjs";
// // import dotenv from "dotenv";
// // // Add this inside server.ts near the top, if not already there
// // import crypto from "crypto";
// // import slugify from "slugify";
// // import nodemailer from "nodemailer"; // 👈 Add this with your other imports

// // dotenv.config();

// // const MONGODB_URI =
// //   process.env.MONGODB_URI || "mongodb://localhost:27017/portfoliai";
// // const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// // const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// // const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
// // const GITHUB_REDIRECT_URI = "http://localhost:3000/api/auth/github/callback";

// //   // --- GOOGLE OAUTH ---
// // const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// // const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// // const GOOGLE_REDIRECT_URI = "http://localhost:3000/api/auth/google/callback";

// // /* ======================================================
// //    MongoDB Connection
// //    ====================================================== */
// // mongoose
// //   .connect(MONGODB_URI)
// //   .then(() => console.log("✅ Connected to MongoDB"))
// //   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // /*================================================================
// //    * Node Mailer 
// //    =================================================================*/

// //   const transporter = nodemailer.createTransport({
// //     service: "gmail",
// //     auth: {
// //       user: process.env.EMAIL_USER,
// //       pass: process.env.EMAIL_PASS,
// //     },
// //   });

// // /**======================================================
// //                       Helper Function 
// //      ======================================================*/

// // const generateUniqueSlug = async (name: string) => {
// //   const baseSlug = slugify(name, { lower: true, strict: true });

// //   let slug = baseSlug;
// //   let counter = 1;

// //   while (await Portfolio.findOne({ slug })) {
// //     slug = `${baseSlug}-${counter}`;
// //     counter++;
// //   }

// //   return slug;
// // };

// // /* ======================================================
// //    Schemas & Models
// //    ====================================================== */

// // // Users collection
// // const userSchema = new mongoose.Schema(
// //   {
// //     email: { type: String, required: true, unique: true },
// //     password: { type: String }, // optional for mock / OAuth users
// //     name: { type: String, required: true },
// //     profilePicture: { type: String }, // 👈 Store Base64 image
// //     isVerified: { type: Boolean, default: false }, // 👈 OTP Verification flag
// //     otp: { type: String }, // 👈 Stores the hashed or plain 6-digit code
// //     otpExpires: { type: Date },
// //     googleId: { type: String },
// //     githubId: { type: String },
// //   },
// //   { timestamps: true },
// // );

// // // Portfolios collection
// // const portfolioSchema = new mongoose.Schema(
// //   {
// //     userId: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true, // ownership enforced
// //     },
// //     name: { type: String, required: true },
// //     data: { type: Object, required: true }, // full portfolio JSON
// //     template: { type: String, default: "Modern" },
// //     status: {
// //       type: String,
// //       enum: ["draft", "active"], // 👈 explicit states
// //       default: "draft", // 👈 IMPORTANT: new portfolios start as draft
// //     },
// //     slug: {
// //       // <--- ADD THIS
// //       type: String,
// //       unique: true,
// //       sparse: true, // allows multiple nulls for drafts
// //     },
// //   },
// //   { timestamps: true },
// // );

// // const User = mongoose.model("User", userSchema);
// // const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// // /* ======================================================
// //    JWT Middleware (protects private routes)
// //    ====================================================== */
// // const authenticateToken = (req: any, res: any, next: any) => {
// //   const authHeader = req.headers["authorization"];
// //   const token = authHeader && authHeader.split(" ")[1];

// //   if (!token) {
// //     return res.status(401).json({ error: "Missing token" });
// //   }

// //   jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
// //     if (err) {
// //       return res.status(403).json({ error: "Invalid token" });
// //     }
// //     req.user = user; // { id, email }
// //     next();
// //   });
// // };

// // /* ======================================================
// //    Server Bootstrap
// //    ====================================================== */
// // async function startServer() {
// //   const app = express();
// //   const PORT = 3000;

// //   // app.use(express.json());
// //   app.use(express.json({ limit: "50mb" }));
// //   app.use(express.urlencoded({ limit: "50mb", extended: true }));

// //   /* --------------------
// //      Health Check
// //      -------------------- */
// //   app.get("/api/health", (_req, res) => {
// //     res.json({ status: "ok" });
// //   });

// //   /* ======================================================
// //      AUTH ROUTES
// //      ====================================================== */

// //   // Register (real users)
// //   // app.post("/api/auth/register", async (req, res) => {
// //   //   const { email, password, name } = req.body;

// //   //   try {
// //   //     if (!email || !password || !name) {
// //   //       return res.status(400).json({ error: "Missing fields" });
// //   //     }

// //   //     const existing = await User.findOne({ email });
// //   //     if (existing) {
// //   //       return res.status(409).json({ error: "User already exists" });
// //   //     }

// //   //     const hashedPassword = await bcrypt.hash(password, 10);
// //   //     const user = await User.create({
// //   //       email,
// //   //       password: hashedPassword,
// //   //       name,
// //   //     });

// //   //     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
// //   //       expiresIn: "7d",
// //   //     });

// //   //     res.status(201).json({
// //   //       user: { id: user._id, email: user.email, name: user.name },
// //   //       token,
// //   //     });
// //   //   } catch (error: any) {
// //   //     res.status(500).json({ error: error.message });
// //   //   }
// //   // });

// //   /**===============================================================
// //    * Register and Verify Otp
// //    =================================================================*/
// //    // 1. Request Registration & Send OTP
// //   app.post("/api/auth/register-request", async (req, res) => {
// //     const { email, password, confirmPassword, name, profilePicture } = req.body;

// //     try {
// //       if (!email || !password || !confirmPassword || !name) {
// //         return res.status(400).json({ error: "Missing required fields" });
// //       }

// //       if (password !== confirmPassword) {
// //         return res.status(400).json({ error: "Passwords do not match" });
// //       }

// //       const existingUser = await User.findOne({ email });
// //       if (existingUser && existingUser.isVerified) {
// //         return res.status(409).json({ error: "User already exists and is verified" });
// //       }

// //       // Generate a 6-digit OTP
// //       const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
// //       const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // Valid for 5 mins
// //       const hashedPassword = await bcrypt.hash(password, 10);

// //       // Upsert user (Create new, or overwrite unverified existing)
// //       if (existingUser) {
// //         existingUser.password = hashedPassword;
// //         existingUser.name = name;
// //         existingUser.profilePicture = profilePicture;
// //         existingUser.otp = otpCode;
// //         existingUser.otpExpires = otpExpires;
// //         await existingUser.save();
// //       } else {
// //         await User.create({
// //           email,
// //           password: hashedPassword,
// //           name,
// //           profilePicture,
// //           otp: otpCode,
// //           otpExpires,
// //           isVerified: false,
// //         });
// //       }

// //       // Send the email
// //       const mailOptions = {
// //         from: process.env.EMAIL_USER,
// //         to: email,
// //         subject: "Verify your PortfoliAI Account",
// //         text: `Hi ${name},\n\nYour verification code is: ${otpCode}\n\nThis code will expire in 5 minutes.`,
// //       };

// //       await transporter.sendMail(mailOptions);

// //       res.status(200).json({ message: "OTP sent to your email" });
// //     } catch (error: any) {
// //       console.error("Registration Request Error:", error);
// //       res.status(500).json({ error: error.message });
// //     }
// //   });

// //   // 2. Verify OTP & Finalize Registration
// //   app.post("/api/auth/verify-otp", async (req, res) => {
// //     const { email, otp } = req.body;

// //     try {
// //       const user = await User.findOne({ email });

// //       if (!user) {
// //         return res.status(404).json({ error: "User not found" });
// //       }
// //       if (user.isVerified) {
// //         return res.status(400).json({ error: "User is already verified" });
// //       }
// //       if (user.otp !== otp) {
// //         return res.status(400).json({ error: "Invalid OTP" });
// //       }
// //       if (!user.otpExpires || user.otpExpires < new Date()) {
// //         return res.status(400).json({ error: "OTP has expired. Please request a new one." });
// //       }

// //       // Mark as verified and clear OTP data
// //       user.isVerified = true;
// //       user.otp = undefined;
// //       user.otpExpires = undefined;
// //       await user.save();

// //       // Log them in immediately
// //       const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
// //         expiresIn: "7d",
// //       });

// //       res.status(201).json({
// //         message: "Registration successful",
// //         user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture },
// //         token,
// //       });
// //     } catch (error: any) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   });


// //   // Login (REAL + MOCK)
// //   app.post("/api/auth/login", async (req, res) => {
// //     const { email, password } = req.body;

// //     try {
// //       if (!email) {
// //         return res.status(400).json({ error: "Email required" });
// //       }

// //       let user = await User.findOne({ email });

// //       /* --------------------
// //          MOCK LOGIN (email only)
// //          Used for testing / demos
// //          -------------------- */
// //       if (!password) {
// //         if (!user) {
// //           user = await User.create({
// //             email,
// //             name: email.split("@")[0],
// //           });
// //         }

// //         const token = jwt.sign(
// //           { id: user._id, email: user.email },
// //           JWT_SECRET,
// //           { expiresIn: "7d" },
// //         );

// //         return res.json({
// //           user: { id: user._id, email: user.email, name: user.name },
// //           token,
// //           mock: true,
// //         });
// //       }

// //       /* --------------------
// //          REAL LOGIN
// //          -------------------- */
// //       if (!user || !user.password) {
// //         return res.status(401).json({ error: "Invalid credentials" });
// //       }

// //       const validPassword = await bcrypt.compare(password, user.password);
// //       if (!validPassword) {
// //         return res.status(401).json({ error: "Invalid credentials" });
// //       }

// //       const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
// //         expiresIn: "7d",
// //       });

// //       res.json({
// //         user: { id: user._id, 
// //           email: user.email, 
// //           name: user.name, 
// //           profilePicture: user.profilePicture},
// //         token,
// //       });
// //     } catch (error: any) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   });

// //   /* ======================================================
// //      OAUTH 2.0 ROUTES (GOOGLE & GITHUB)
// //      ====================================================== */



// //   app.get("/api/auth/google/url", (req, res) => {
// //     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
// //     res.json({ url });
// //   });

// //   app.get("/api/auth/google/callback", async (req, res) => {
// //     const { code } = req.query;

// //     try {
// //       // 1. Exchange code for token
// //       const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
// //         body: new URLSearchParams({
// //           code: code as string,
// //           client_id: GOOGLE_CLIENT_ID as string,
// //           client_secret: GOOGLE_CLIENT_SECRET as string,
// //           redirect_uri: GOOGLE_REDIRECT_URI,
// //           grant_type: "authorization_code",
// //         }),
// //       });

// //       const tokenData = await tokenResponse.json();
// //       if (tokenData.error) throw new Error(tokenData.error_description);

// //       // 2. Get user profile
// //       const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
// //         headers: { Authorization: `Bearer ${tokenData.access_token}` },
// //       });
// //       const userData = await userResponse.json();

// //       // 3. Database Sync
// //       let user = await User.findOne({ email: userData.email });
      
// //       if (!user) {
// //         user = await User.create({
// //           email: userData.email,
// //           name: userData.name,
// //           googleId: userData.id,
// //           profilePicture: userData.picture,
// //           isVerified: true, 
// //         });
// //       } else if (!user.googleId) {
// //         user.googleId = userData.id;
// //         user.isVerified = true;
// //         if (!user.profilePicture) user.profilePicture = userData.picture;
// //         await user.save();
// //       }

// //       // 4. Issue JWT and close popup
// //       const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

// //       res.send(`
// //               <script>
// //                 window.opener.postMessage({ 
// //                   type: "OAUTH_SUCCESS", 
// //                   token: "${token}",
// //                   user: ${JSON.stringify({ id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture })}
// //                 }, "*");
// //                 window.close();
// //               </script>
// //             `);
// //     } catch (err: any) {
// //       console.error("Google OAuth Error:", err.message);
// //       res.status(500).send("Authentication failed. Please close this window and try again.");
// //     }
// //   });

// //   // --- GITHUB OAUTH ---


// //   app.get("/api/auth/github/url", (req, res) => {
// //     const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;
// //     res.json({ url });
// //   });

// //   app.get("/api/auth/github/callback", async (req, res) => {
// //     const { code } = req.query;

// //     try {
// //       // 1. Exchange code for token
// //       const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Accept: "application/json", 
// //         },
// //         body: JSON.stringify({
// //           client_id: GITHUB_CLIENT_ID,
// //           client_secret: GITHUB_CLIENT_SECRET,
// //           code,
// //           redirect_uri: GITHUB_REDIRECT_URI,
// //         }),
// //       });

// //       const tokenData = await tokenResponse.json();
// //       if (tokenData.error) throw new Error(tokenData.error_description);
// //       const accessToken = tokenData.access_token;

// //       // 2. Get user profile
// //       const userResponse = await fetch("https://api.github.com/user", {
// //         headers: { Authorization: `Bearer ${accessToken}` },
// //       });
// //       const userData = await userResponse.json();

// //       // 3. Get user emails (Crucial for private GitHub emails)
// //       let email = userData.email;
// //       if (!email) {
// //         const emailResponse = await fetch("https://api.github.com/user/emails", {
// //           headers: { Authorization: `Bearer ${accessToken}` },
// //         });
// //         const emails = await emailResponse.json();
// //         const primaryEmail = emails.find((e: any) => e.primary && e.verified);
// //         email = primaryEmail ? primaryEmail.email : emails[0].email;
// //       }

// //       if (!email) throw new Error("Could not retrieve a valid email from GitHub");

// //       // 4. Database Sync
// //       let user = await User.findOne({ email });
      
// //       if (!user) {
// //         user = await User.create({
// //           email: email,
// //           name: userData.name || userData.login, 
// //           githubId: userData.id.toString(),
// //           profilePicture: userData.avatar_url,
// //           isVerified: true, 
// //         });
// //       } else if (!user.githubId) {
// //         user.githubId = userData.id.toString();
// //         user.isVerified = true;
// //         if (!user.profilePicture) user.profilePicture = userData.avatar_url;
// //         await user.save();
// //       }

// //       // 5. Issue JWT and close popup
// //       const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });

// //     res.send(`
// //             <script>
// //               window.opener.postMessage({ 
// //                 type: "OAUTH_SUCCESS", 
// //                 token: "${token}",
// //                 user: ${JSON.stringify({ id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture })}
// //               }, "*");
// //               window.close();
// //             </script>
// //           `);
// //     } catch (err: any) {
// //       console.error("GitHub OAuth Error:", err.message);
// //       res.status(500).send("Authentication failed. Please close this window and try again.");
// //     }
// //   });

// //     /* ======================================================
// //      UPDATION OF PROFILE DETAILS  (AUTH REQUIRED)
// //      ====================================================== */
// //      /* ======================================================
// //      USER PROFILE ROUTES (AUTH REQUIRED)
// //      ========================================================= */
// //   app.put("/api/user/profile", authenticateToken, async (req: any, res) => {
// //     const { name, email, profilePicture, currentPassword, newPassword } = req.body;
// //     const userId = req.user.id;

// //     try {
// //       const user = await User.findById(userId);
// //       if (!user) return res.status(404).json({ error: "User not found" });

// //       // 1. Check if they are trying to change their email to one that is taken
// //       if (email && email !== user.email) {
// //         const existingEmail = await User.findOne({ email });
// //         if (existingEmail) {
// //           return res.status(400).json({ error: "That email is already in use by another account." });
// //         }
// //         user.email = email;
// //       }

// //       // 2. Update standard profile fields
// //       if (name) user.name = name;
// //       if (profilePicture) user.profilePicture = profilePicture;

// //       // 3. Handle Password Updates securely
// //       if (newPassword) {
// //         if (!user.password) {
// //           // They signed in with Google/GitHub originally and never had a password
// //           user.password = await bcrypt.hash(newPassword, 10);
// //         } else {
// //           // They have a password, so they must provide the correct current password
// //           if (!currentPassword) {
// //             return res.status(400).json({ error: "Current password is required to set a new one." });
// //           }
// //           const isMatch = await bcrypt.compare(currentPassword, user.password);
// //           if (!isMatch) {
// //             return res.status(400).json({ error: "Incorrect current password." });
// //           }
// //           user.password = await bcrypt.hash(newPassword, 10);
// //         }
// //       }

// //       await user.save();

// //       // 4. Issue a fresh JWT in case their email changed
// //       const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
// //         expiresIn: "7d",
// //       });

// //       res.json({
// //         message: "Profile updated successfully",
// //         user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture },
// //         token,
// //       });
// //     } catch (error: any) {
// //       console.error("Profile Update Error:", error);
// //       res.status(500).json({ error: error.message });
// //     }
// //   });

// //   /**================================================================
// //    *                     EMAIL AVALIBILTY CHECK
// //    ==================================================================*/

// //   // Check Email Availability (Real-time settings check)
// //   app.get("/api/user/check-email/:email", authenticateToken, async (req: any, res) => {
// //     const emailToCheck = req.params.email.toLowerCase().trim();
// //     const currentUserId = req.user.id;

// //     try {
// //       const existingUser = await User.findOne({ email: emailToCheck });

// //       if (existingUser) {
// //         // If it belongs to the current user, it's technically "available" to them
// //         if (existingUser._id.toString() === currentUserId) {
// //           return res.json({ available: true });
// //         }
// //         // It belongs to someone else!
// //         return res.json({ available: false });
// //       }

// //       // No one has it
// //       res.json({ available: true });
// //     } catch (err: any) {
// //       res.status(500).json({ error: err.message });
// //     }
// //   });


// //   /* ======================================================
// //      PORTFOLIO ROUTES (AUTH REQUIRED)
// //      ====================================================== */

// //   // Get portfolios for logged-in user
// //   app.get("/api/portfolios", authenticateToken, async (req: any, res) => {
// //     try {
// //       const portfolios = await Portfolio.find({
// //         userId: req.user.id,
// //       }).sort({ updatedAt: -1 });

// //       res.json(portfolios);
// //     } catch (error: any) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   });

// //   // // CREATE portfolio (always draft)
// //   // app.post("/api/portfolios", authenticateToken, async (req: any, res) => {
// //   //   const { name, data, template } = req.body;

// //   //   try {
// //   //     if (!name || !data) {
// //   //       return res.status(400).json({ error: "Invalid portfolio data" });
// //   //     }

// //   //     const slug = await generateUniqueSlug(name);

// //   //     const portfolio = await Portfolio.create({
// //   //       userId: req.user.id,
// //   //       name,
// //   //       data,
// //   //       template: template || "Modern",
// //   //       status: status  || "draft", // 👈 IMPORTANT: start as draft
// //   //       slug,
// //   //     });

// //   //     res.json({ success: true, portfolio });
// //   //   } catch (error: any) {
// //   //     res.status(500).json({ error: error.message });
// //   //   }
// //   // });

// //   // CREATE portfolio 
// //   app.post("/api/portfolios", authenticateToken, async (req: any, res) => {
// //     const { name, data, template, status } = req.body; // ✅ Extract status

// //     try {
// //       if (!name || !data) {
// //         return res.status(400).json({ error: "Invalid portfolio data" });
// //       }

// //       const slug = await generateUniqueSlug(name);

// //       const portfolio = await Portfolio.create({
// //         userId: req.user.id,
// //         name,
// //         data,
// //         template: template || "Modern",
// //         status: status || "draft", // ✅ Use provided status, or default to draft
// //         slug,
// //       });

// //             res.json({ success: true, portfolio });
// //     } catch (error: any) {
// //       res.status(500).json({ error: error.message });
// //     }
// //   });

// //   // UPDATE portfolio (autosave OR publish)
// //   app.put("/api/portfolios/:id", authenticateToken, async (req: any, res) => {
// //     const { id } = req.params;
// //     const { name, data, template, status, slug } = req.body;

// //     try {
// //       // Only update fields that are provided
// //       const update: any = {};

// //       if (name) update.name = name;
// //       if (data) update.data = data;
// //       if (template) update.template = template;
// //       //if (status) update.status = status;

// //       if (status) {
// //         update.status = status;

// //         if (status === "active") {
// //           // update.slug = crypto.randomBytes(6).toString("hex");
// //           update.status = status;
// //         }
// //       }

// //       //Slug

// //       if (slug) {
// //         const cleanSlug = slugify(slug, { lower: true, strict: true });

// //         const existing = await Portfolio.findOne({ slug: cleanSlug });

// //         if (existing && existing._id.toString() !== id) {
// //           return res.status(409).json({ error: "Slug already taken" });
// //         }

// //         update.slug = cleanSlug;
// //       }

// //       const portfolio = await Portfolio.findOneAndUpdate(
// //         { _id: id, userId: req.user.id }, // ownership check
// //         update,
// //         { new: true },
// //       );

// //       if (!portfolio) {
// //         return res.status(404).json({ error: "Portfolio not found" });
// //       }

// //       res.json({ success: true, portfolio });
// //     } catch (err: any) {
// //       res.status(500).json({ error: err.message });
// //     }
// //   });

// //   // DELETE portfolio
// //   app.delete(
// //     "/api/portfolios/:id",
// //     authenticateToken,
// //     async (req: any, res) => {
// //       try {
// //         const deleted = await Portfolio.findOneAndDelete({
// //           _id: req.params.id,
// //           userId: req.user.id,
// //         });

// //         if (!deleted) {
// //           return res.status(404).json({ error: "Portfolio not found" });
// //         }

// //         res.json({ success: true });
// //       } catch (err: any) {
// //         res.status(500).json({ error: err.message });
// //       }
// //     },
// //   );

// //   /* ======================================================
// //      PUBLIC ROUTE (NO AUTH) - UPDATED TO USE SLUG
// //      ====================================================== */

// //   // Public portfolio (shareable link)
// //   // app.get("/api/public/portfolio/:slug", async (req, res) => {
// //   //   try {
// //   //     const portfolio = await Portfolio.findOne({
// //   //       slug: req.params.slug,
// //   //       status: "active",
// //   //     }).select("name data template createdAt"); // 👈 expose only safe fields

// //   //     if (!portfolio || portfolio.status !== "active") {
// //   //       return res.status(404).json({ error: "Portfolio not found" });
// //   //     }

// //   //     res.json(portfolio);
// //   //   } catch (err: any) {
// //   //     res.status(500).json({ error: err.message });
// //   //   }
// //   // });

// //   // Public portfolio (shareable link)
// //   app.get("/api/public/portfolio/:slug", async (req, res) => {
// //     try {
// //       const requestedSlug = req.params.slug.trim();
// //       console.log(
// //         `[API] 🔍 Searching for portfolio with slug: "${requestedSlug}"`,
// //       );

// //       const portfolio = await Portfolio.findOne({
// //         slug: requestedSlug,
// //         status: "active",
// //       }).select("name data template createdAt");

// //       if (!portfolio) {
// //         console.log(
// //           `[API] ❌ No ACTIVE portfolio found for: "${requestedSlug}"`,
// //         );

// //         // Diagnostic check: Does it exist but as a draft?
// //         const draftCheck = await Portfolio.findOne({ slug: requestedSlug });
// //         if (draftCheck) {
// //           console.log(
// //             `[API] ⚠️ Found it, but status is "${draftCheck.status}"!`,
// //           );
// //         } else {
// //           console.log(
// //             `[API] 👻 Document does not exist in this database at all.`,
// //           );
// //         }

// //         return res
// //           .status(404)
// //           .json({ error: "Portfolio not found or is currently a draft" });
// //       }

// //       console.log(`[API] ✅ Success! Sending: ${portfolio.name}`);
// //       res.json(portfolio);
// //     } catch (err: any) {
// //       console.error(`[API] 🔥 Server Error:`, err.message);
// //       res.status(500).json({ error: err.message });
// //     }
// //   });

// //   //Checking slug availbilty

// //   app.get("/api/slug/check/:slug", async (req, res) => {
// //     const slug = slugify(req.params.slug, { lower: true, strict: true });

// //     const exists = await Portfolio.findOne({ slug });

// //     res.json({
// //       available: !exists,
// //       slug,
// //     });
// //   });

// //   /* ======================================================
// //      VITE / STATIC SERVING
// //      ====================================================== */
// //   if (process.env.NODE_ENV !== "production") {
// //     const vite = await createViteServer({
// //       server: { middlewareMode: true },
// //       appType: "spa",
// //     });
// //     app.use(vite.middlewares);
// //   } else {
// //     app.use(express.static(path.join(__dirname, "dist")));
// //     app.get("*", (_req, res) => {
// //       res.sendFile(path.join(__dirname, "dist", "index.html"));
// //     });
// //   }

// //   app.listen(PORT, "0.0.0.0", () => {
// //     console.log(`🚀 Server running on http://localhost:${PORT}`);
// //   });
// // }


// // startServer();

// /**==========================================
//  * Version 2
//  ============================================*/

//  import express from "express";
// // import { createServer as createViteServer } from "vite";
// import path from "path";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import crypto from "crypto";
// import slugify from "slugify";
// import nodemailer from "nodemailer";

// // 👇 ADD THESE THREE LINES EXACTLY HERE
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfoliai";
// const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// // Ensure these match your live Vercel URL in production!
// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
// const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || "http://localhost:3000/api/auth/github/callback";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";

// /* ======================================================
//    MongoDB Connection
//    ====================================================== */
// mongoose
//   .connect(MONGODB_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// /* ================================================================
//    Node Mailer 
//    ================================================================= */
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /* ======================================================
//    Helper Function 
//    ====================================================== */
// const generateUniqueSlug = async (name: string) => {
//   const baseSlug = slugify(name, { lower: true, strict: true });
//   let slug = baseSlug;
//   let counter = 1;
//   while (await Portfolio.findOne({ slug })) {
//     slug = `${baseSlug}-${counter}`;
//     counter++;
//   }
//   return slug;
// };

// /* ======================================================
//    Schemas & Models
//    ====================================================== */
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   name: { type: String, required: true },
//   profilePicture: { type: String },
//   isVerified: { type: Boolean, default: false },
//   otp: { type: String },
//   otpExpires: { type: Date },
//   googleId: { type: String },
//   githubId: { type: String },
// }, { timestamps: true });

// const portfolioSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: { type: String, required: true },
//   data: { type: Object, required: true },
//   template: { type: String, default: "Modern" },
//   status: { type: String, enum: ["draft", "active"], default: "draft" },
//   slug: { type: String, unique: true, sparse: true },
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// /* ======================================================
//    JWT Middleware
//    ====================================================== */
// const authenticateToken = (req: any, res: any, next: any) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.status(401).json({ error: "Missing token" });

//   jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// /* ======================================================
//    INITIALIZE EXPRESS (Top-Level Scope!)
//    ====================================================== */
// const app = express();

// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// /* --------------------
//    Health Check
//    -------------------- */
// app.get("/api/health", (_req, res) => {
//   res.json({ status: "ok" });
// });

// /* ======================================================
//    AUTH ROUTES (Email/Password)
//    ====================================================== */
// app.post("/api/auth/register-request", async (req, res) => {
//   // ... (Your existing register-request code is perfect) ...
//   const { email, password, confirmPassword, name, profilePicture } = req.body;
//   try {
//     if (!email || !password || !confirmPassword || !name) return res.status(400).json({ error: "Missing required fields" });
//     if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser && existingUser.isVerified) return res.status(409).json({ error: "User already exists and is verified" });

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
//     const hashedPassword = await bcrypt.hash(password, 10);

//     if (existingUser) {
//       existingUser.password = hashedPassword;
//       existingUser.name = name;
//       existingUser.profilePicture = profilePicture;
//       existingUser.otp = otpCode;
//       existingUser.otpExpires = otpExpires;
//       await existingUser.save();
//     } else {
//       await User.create({ email, password: hashedPassword, name, profilePicture, otp: otpCode, otpExpires, isVerified: false });
//     }

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Verify your PortfoliAI Account",
//       text: `Hi ${name},\n\nYour verification code is: ${otpCode}\n\nThis code will expire in 5 minutes.`,
//     };
//     await transporter.sendMail(mailOptions);
//     res.status(200).json({ message: "OTP sent to your email" });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/api/auth/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ error: "User not found" });
//     if (user.isVerified) return res.status(400).json({ error: "User is already verified" });
//     if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP" });
//     if (!user.otpExpires || user.otpExpires < new Date()) return res.status(400).json({ error: "OTP has expired." });

//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
//     res.status(201).json({ message: "Registration successful", user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture }, token });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if (!email) return res.status(400).json({ error: "Email required" });
//     let user = await User.findOne({ email });

//     if (!user || !user.password) return res.status(401).json({ error: "Invalid credentials" });

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
//     res.json({ user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture }, token });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// });

// /* ======================================================
//    OAUTH 2.0 ROUTES (GOOGLE & GITHUB)
//    ====================================================== */

// // GOOGLE
// app.get("/api/auth/google/url", (req, res) => {
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
//   res.json({ url });
// });

// app.get("/api/auth/google/callback", async (req, res) => {
//   const { code } = req.query;
//   try {
//     const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({
//         code: code as string,
//         client_id: GOOGLE_CLIENT_ID as string,
//         client_secret: GOOGLE_CLIENT_SECRET as string,
//         redirect_uri: GOOGLE_REDIRECT_URI,
//         grant_type: "authorization_code",
//       }),
//     });

//     const tokenData = await tokenResponse.json();
//     if (tokenData.error) throw new Error(tokenData.error_description);

//     const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
//       headers: { Authorization: `Bearer ${tokenData.access_token}` },
//     });
//     const userData = await userResponse.json();

//     let user = await User.findOne({ email: userData.email });
//     if (!user) {
//       user = await User.create({ email: userData.email, name: userData.name, googleId: userData.id, profilePicture: userData.picture, isVerified: true });
//     } else if (!user.googleId) {
//       user.googleId = userData.id;
//       user.isVerified = true;
//       if (!user.profilePicture) user.profilePicture = userData.picture;
//       await user.save();
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
//     const userString = encodeURIComponent(JSON.stringify({ id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture }));
    
//     // 👇 Magic Popup Fix: Redirect to frontend callback route
//     res.redirect(`/oauth-callback?token=${token}&user=${userString}`);
//   } catch (err: any) {
//     console.error("Google OAuth Error:", err.message);
//     res.status(500).send("Authentication failed. Please close this window and try again.");
//   }
// });

// // GITHUB
// app.get("/api/auth/github/url", (req, res) => {
//   const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;
//   res.json({ url });
// });

// app.get("/api/auth/github/callback", async (req, res) => {
//   const { code } = req.query;
//   try {
//     const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Accept: "application/json" },
//       body: JSON.stringify({
//         client_id: GITHUB_CLIENT_ID,
//         client_secret: GITHUB_CLIENT_SECRET,
//         code,
//         redirect_uri: GITHUB_REDIRECT_URI,
//       }),
//     });

//     const tokenData = await tokenResponse.json();
//     if (tokenData.error) throw new Error(tokenData.error_description);
//     const accessToken = tokenData.access_token;

//     const userResponse = await fetch("https://api.github.com/user", {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });
//     const userData = await userResponse.json();

//     let email = userData.email;
//     if (!email) {
//       const emailResponse = await fetch("https://api.github.com/user/emails", {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const emails = await emailResponse.json();
//       const primaryEmail = emails.find((e: any) => e.primary && e.verified);
//       email = primaryEmail ? primaryEmail.email : emails[0].email;
//     }
//     if (!email) throw new Error("Could not retrieve a valid email from GitHub");

//     let user = await User.findOne({ email });
//     if (!user) {
//       user = await User.create({ email: email, name: userData.name || userData.login, githubId: userData.id.toString(), profilePicture: userData.avatar_url, isVerified: true });
//     } else if (!user.githubId) {
//       user.githubId = userData.id.toString();
//       user.isVerified = true;
//       if (!user.profilePicture) user.profilePicture = userData.avatar_url;
//       await user.save();
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
//     const userString = encodeURIComponent(JSON.stringify({ id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture }));

//     // 👇 Magic Popup Fix: Redirect to frontend callback route
//     res.redirect(`/oauth-callback?token=${token}&user=${userString}`);
//   } catch (err: any) {
//     console.error("GitHub OAuth Error:", err.message);
//     res.status(500).send("Authentication failed. Please close this window and try again.");
//   }
// });

// /* ======================================================
//    PROFILE & PORTFOLIO ROUTES
//    ====================================================== */
// // (I kept your exact existing routes here, omitting for brevity in this block to ensure you copy it easily - but you can just paste your profile and portfolio PUT/GET/POST/DELETE endpoints right here!)

// // /* ======================================================
// //    VITE / STATIC SERVING & LOCAL HOST SETUP
// //    ====================================================== */
// // if (process.env.NODE_ENV !== "production") {
// //   // Wrap local setup in an async function so it doesn't break top-level execution
// //   const startLocalServer = async () => {
// //     const vite = await createViteServer({
// //       server: { middlewareMode: true },
// //       appType: "spa",
// //     });
// //     app.use(vite.middlewares);

// //     const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
// //     app.listen(PORT, "0.0.0.0", () => {
// //       console.log(`🚀 Server running on http://localhost:${PORT}`);
// //     });
// //   };
// //   startLocalServer();
// // } else {
// //   // Production Vercel mode: serve static files if needed
// //   app.use(express.static(path.join(__dirname, "dist")));
// //   app.get("*", (_req, res) => {
// //     res.sendFile(path.join(__dirname, "dist", "index.html"));
// //   });
// // }

// // // 👇 EXPORT FOR VERCEL (Now 'app' is recognized perfectly!)
// // export default app;


// /* ======================================================
//    VITE / STATIC SERVING & LOCAL HOST SETUP
//    ====================================================== */
// if (process.env.NODE_ENV !== "production") {
//   const startLocalServer = async () => {
//     // 👇 1. Import the Vite module directly
//     const vite = await import("vite");
    
//     // 👇 2. Use vite.createServer instead
//     const viteServer = await vite.createServer({
//       server: { middlewareMode: true },
//       appType: "spa",
//     });
    
//     app.use(viteServer.middlewares);

//     const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`🚀 Server running on http://localhost:${PORT}`);
//     });
//   };
//   startLocalServer();
// } else {
//   // Production Vercel mode: serve static files if needed
//   app.use(express.static(path.join(__dirname, "dist")));
//   app.get("*", (_req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"));
//   });
// }

// export default app;

/**
 * Version 2
 */

// import express from "express";
// import path from "path";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import dotenv from "dotenv";
// import crypto from "crypto";
// import slugify from "slugify";
// import nodemailer from "nodemailer";
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfoliai";
// const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
// const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || "http://localhost:3000/api/auth/github/callback";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
// const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";

// /* ======================================================
//    MongoDB Connection
//    ====================================================== */
// mongoose
//   .connect(MONGODB_URI)
//   .then(() => console.log("✅ Connected to MongoDB"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// /* ======================================================
//    Helper Function 
//    ====================================================== */
// const generateUniqueSlug = async (name: string) => {
//   const baseSlug = slugify(name, { lower: true, strict: true });
//   let slug = baseSlug;
//   let counter = 1;
//   while (await Portfolio.findOne({ slug })) {
//     slug = `${baseSlug}-${counter}`;
//     counter++;
//   }
//   return slug;
// };

// /* ======================================================
//    Schemas & Models
//    ====================================================== */
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   name: { type: String, required: true },
//   profilePicture: { type: String },
//   isVerified: { type: Boolean, default: false },
//   otp: { type: String },
//   otpExpires: { type: Date },
//   googleId: { type: String },
//   githubId: { type: String },
// }, { timestamps: true });

// const portfolioSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   name: { type: String, required: true },
//   data: { type: Object, required: true },
//   template: { type: String, default: "Modern" },
//   status: { type: String, enum: ["draft", "active"], default: "draft" },
//   slug: { type: String, unique: true, sparse: true },
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);
// const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// /* ======================================================
//    JWT Middleware
//    ====================================================== */
// const authenticateToken = (req: any, res: any, next: any) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Missing token" });

//   jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
//     if (err) return res.status(403).json({ error: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// /* ======================================================
//    INITIALIZE EXPRESS
//    ====================================================== */
// const app = express();
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// /* ======================================================
//    AUTH ROUTES
//    ====================================================== */
// app.post("/api/auth/register-request", async (req, res) => {
//   const { email, password, confirmPassword, name, profilePicture } = req.body;
//   try {
//     if (!email || !password || !confirmPassword || !name) return res.status(400).json({ error: "Missing required fields" });
//     if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });
//     const existingUser = await User.findOne({ email });
//     if (existingUser && existingUser.isVerified) return res.status(409).json({ error: "User already exists" });
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpires = new Date(Date.now() + 5 * 60 * 1000);
//     const hashedPassword = await bcrypt.hash(password, 10);
//     if (existingUser) {
//       Object.assign(existingUser, { password: hashedPassword, name, profilePicture, otp: otpCode, otpExpires });
//       await existingUser.save();
//     } else {
//       await User.create({ email, password: hashedPassword, name, profilePicture, otp: otpCode, otpExpires, isVerified: false });
//     }
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Verify your PortfoliAI Account",
//       text: `Your verification code is: ${otpCode}`,
//     });
//     res.status(200).json({ message: "OTP sent" });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// app.post("/api/auth/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || user.otp !== otp || (user.otpExpires && user.otpExpires < new Date())) {
//       return res.status(400).json({ error: "Invalid or expired OTP" });
//     }
//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
//     res.status(201).json({ user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture }, token });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// app.post("/api/auth/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
//     res.json({ user: { id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture }, token });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// /* ======================================================
//    OAUTH ROUTES
//    ====================================================== */
// app.get("/api/auth/google/url", (req, res) => {
//   const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;
//   res.json({ url });
// });

// app.get("/api/auth/google/callback", async (req, res) => {
//   const { code } = req.query;
//   try {
//     const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams({ code: code as string, client_id: GOOGLE_CLIENT_ID!, client_secret: GOOGLE_CLIENT_SECRET!, redirect_uri: GOOGLE_REDIRECT_URI, grant_type: "authorization_code" }),
//     });
//     const tokenData = await tokenResponse.json();
//     const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", { headers: { Authorization: `Bearer ${tokenData.access_token}` } });
//     const userData = await userResponse.json();
//     let user = await User.findOne({ email: userData.email });
//     if (!user) user = await User.create({ email: userData.email, name: userData.name, googleId: userData.id, profilePicture: userData.picture, isVerified: true });
//     const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
//     res.redirect(`/oauth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify({ id: user._id, email: user.email, name: user.name, profilePicture: user.profilePicture }))}`);
//   } catch (err: any) { res.status(500).send("Auth failed"); }
// });

// /* ======================================================
//    PORTFOLIO ROUTES (RE-ADDED CORE LOGIC)
//    ====================================================== */
// app.get("/api/portfolios", authenticateToken, async (req: any, res) => {
//   try {
//     const portfolios = await Portfolio.find({ userId: req.user.id }).sort({ updatedAt: -1 });
//     res.json(portfolios);
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// app.post("/api/portfolios", authenticateToken, async (req: any, res) => {
//   const { name, data, template, status } = req.body;
//   try {
//     if (!name || !data) return res.status(400).json({ error: "Invalid data" });
//     const slug = await generateUniqueSlug(name);
//     const portfolio = await Portfolio.create({ userId: req.user.id, name, data, template: template || "Modern", status: status || "draft", slug });
//     res.json({ success: true, portfolio });
//   } catch (error: any) { res.status(500).json({ error: error.message }); }
// });

// app.put("/api/portfolios/:id", authenticateToken, async (req: any, res) => {
//   const { id } = req.params;
//   const { name, data, template, status, slug } = req.body;
//   try {
//     const update: any = { name, data, template, status };
//     if (slug) {
//       const cleanSlug = slugify(slug, { lower: true, strict: true });
//       const existing = await Portfolio.findOne({ slug: cleanSlug });
//       if (existing && existing._id.toString() !== id) return res.status(409).json({ error: "Slug taken" });
//       update.slug = cleanSlug;
//     }
//     const portfolio = await Portfolio.findOneAndUpdate({ _id: id, userId: req.user.id }, update, { new: true });
//     if (!portfolio) return res.status(404).json({ error: "Not found" });
//     res.json({ success: true, portfolio });
//   } catch (err: any) { res.status(500).json({ error: err.message }); }
// });

// app.get("/api/public/portfolio/:slug", async (req, res) => {
//   try {
//     const portfolio = await Portfolio.findOne({ slug: req.params.slug, status: "active" }).select("name data template createdAt");
//     if (!portfolio) return res.status(404).json({ error: "Not found" });
//     res.json(portfolio);
//   } catch (err: any) { res.status(500).json({ error: err.message }); }
// });

// /* ======================================================
//    VITE / STATIC SERVING
//    ====================================================== */
// if (process.env.NODE_ENV !== "production") {
//   const startLocalServer = async () => {
//     const vite = await import("vite");
//     const viteServer = await vite.createServer({ server: { middlewareMode: true }, appType: "spa" });
//     app.use(viteServer.middlewares);
//     const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
//     app.listen(PORT, "0.0.0.0", () => console.log(`🚀 http://localhost:${PORT}`));
//   };
//   startLocalServer();
// } else {
//   app.use(express.static(path.join(__dirname, "dist")));
//   app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));
// }

// export default app;

/**========================================
 * Version 3
 ===========================================*/

 import express from "express";
import path from "path";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import slugify from "slugify";
import nodemailer from "nodemailer";
import { fileURLToPath } from 'url';

// --- ES Module Fix for __dirname ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfoliai";
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

// --- OAuth Config ---
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = process.env.GITHUB_REDIRECT_URI || "http://localhost:3000/api/auth/github/callback";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/google/callback";

/* ======================================================
   Database & Mailer Setup
   ====================================================== */
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String, required: true },
  profilePicture: { type: String },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },
  googleId: { type: String },
  githubId: { type: String },
}, { timestamps: true });

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  data: { type: Object, required: true },
  template: { type: String, default: "Modern" },
  status: { type: String, enum: ["draft", "active"], default: "draft" },
  slug: { type: String, unique: true, sparse: true },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Portfolio = mongoose.model("Portfolio", portfolioSchema);

/* ======================================================
   Middleware
   ====================================================== */
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

/* ======================================================
   Express App Setup
   ====================================================== */
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

/* ======================================================
   AUTH ROUTES
   ====================================================== */
app.post("/api/auth/register-request", async (req, res) => {
  const { email, password, confirmPassword, name, profilePicture } = req.body;
  try {
    if (!email || !password || !confirmPassword || !name) return res.status(400).json({ error: "Missing fields" });
    if (password !== confirmPassword) return res.status(400).json({ error: "Passwords mismatch" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { email },
      { email, password: hashedPassword, name, profilePicture, otp: otpCode, otpExpires: new Date(Date.now() + 300000) },
      { upsert: true }
    );

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "PortfoliAI OTP",
      text: `Your code: ${otpCode}`,
    });
    res.json({ message: "OTP sent" });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
});

app.post("/api/auth/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email, otp, otpExpires: { $gt: new Date() } });
    if (!user) return res.status(400).json({ error: "Invalid/Expired OTP" });

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user, token });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user, token });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
});

/* ======================================================
   OAUTH ROUTES
   ====================================================== */
app.get("/api/auth/google/url", (req, res) => {
  res.json({ url: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile` });
});

app.get("/api/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const tRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ code: code as string, client_id: GOOGLE_CLIENT_ID!, client_secret: GOOGLE_CLIENT_SECRET!, redirect_uri: GOOGLE_REDIRECT_URI, grant_type: "authorization_code" }),
    });
    const tData = await tRes.json();
    const uRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", { headers: { Authorization: `Bearer ${tData.access_token}` } });
    const uData = await uRes.json();

    const user = await User.findOneAndUpdate(
      { email: uData.email },
      { email: uData.email, name: uData.name, googleId: uData.id, profilePicture: uData.picture, isVerified: true },
      { upsert: true, new: true }
    );

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
    res.redirect(`/oauth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
  } catch (err: any) { res.status(500).send("Auth Failed"); }
});

// GitHub Callback (Proper Implementation)
app.get("/api/auth/github/callback", async (req, res) => {
    const { code } = req.query;
    try {
      const tRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ client_id: GITHUB_CLIENT_ID, client_secret: GITHUB_CLIENT_SECRET, code, redirect_uri: GITHUB_REDIRECT_URI }),
      });
      const tData = await tRes.json();
      const uRes = await fetch("https://api.github.com/user", { headers: { Authorization: `Bearer ${tData.access_token}` } });
      const uData = await uRes.json();
  
      let email = uData.email;
      if (!email) {
        const eRes = await fetch("https://api.github.com/user/emails", { headers: { Authorization: `Bearer ${tData.access_token}` } });
        const emails = await eRes.json();
        email = emails.find((e: any) => e.primary)?.email || emails[0].email;
      }
  
      const user = await User.findOneAndUpdate(
        { email },
        { email, name: uData.name || uData.login, githubId: uData.id.toString(), profilePicture: uData.avatar_url, isVerified: true },
        { upsert: true, new: true }
      );
  
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
      res.redirect(`/oauth-callback?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
    } catch (err: any) { res.status(500).send("GitHub Auth Failed"); }
});

/* ======================================================
   PORTFOLIO ROUTES (The Engine)
   ====================================================== */
app.get("/api/portfolios", authenticateToken, async (req: any, res) => {
  const portfolios = await Portfolio.find({ userId: req.user.id }).sort({ updatedAt: -1 });
  res.json(portfolios);
});

app.post("/api/portfolios", authenticateToken, async (req: any, res) => {
  const { name, data, template, status } = req.body;
  try {
    const slug = await generateUniqueSlug(name);
    const portfolio = await Portfolio.create({ userId: req.user.id, name, data, template: template || "Modern", status: status || "draft", slug });
    res.json({ success: true, portfolio });
  } catch (error: any) { res.status(500).json({ error: error.message }); }
});

// app.put("/api/portfolios/:id", authenticateToken, async (req: any, res) => {
//   try {
//     const portfolio = await Portfolio.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, req.body, { new: true });
//     res.json({ success: true, portfolio });
//   } catch (err: any) { res.status(500).json({ error: err.message }); }
// });

app.get("/api/public/portfolio/:slug", async (req, res) => {
  const portfolio = await Portfolio.findOne({ slug: req.params.slug, status: "active" });
  if (!portfolio) return res.status(404).json({ error: "Portfolio not found" });
  res.json(portfolio);
});

app.put("/api/portfolios/:id", authenticateToken, async (req: any, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, data, template, status, slug } = req.body;

    const update: any = {};

    if (name) update.name = name;
    if (data) update.data = data;
    if (template) update.template = template;
    if (status) update.status = status;

    if (slug) {
      const cleanSlug = slugify(slug, { lower: true, strict: true });

      const existing = await Portfolio.findOne({ slug: cleanSlug });

      if (existing && existing._id.toString() !== req.params.id) {
        return res.status(409).json({ error: "Slug already taken" });
      }

      update.slug = cleanSlug;
    }

    const portfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      update,
      { new: true }
    );

    if (!portfolio) {
      return res.status(404).json({ error: "Not found" });
    }

    console.log("UPDATED:", portfolio.status, portfolio.slug);

    res.json({ success: true, portfolio });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE (REPAIRED)
app.delete("/api/portfolios/:id", authenticateToken, async (req: any, res) => {
  try {
    const deleted = await Portfolio.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.id // Ensures users can only delete THEIR OWN
    });

    if (!deleted) {
      return res.status(404).json({ error: "Portfolio not found or unauthorized" });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err: any) { res.status(500).json({ error: err.message }); }
});

/* ======================================================
   Local vs Production Serving
   ====================================================== */
if (process.env.NODE_ENV !== "production") {
  const startLocalServer = async () => {
    const vite = await import("vite");
    const viteServer = await vite.createServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(viteServer.middlewares);
    const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
    app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Dev: http://localhost:${PORT}`));
  };
  startLocalServer();
} else {
  app.use(express.static(path.join(__dirname, "dist")));
  app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));
}

export default app;