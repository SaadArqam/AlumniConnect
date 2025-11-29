const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const passport = require("./google_auth");
const authRouter = require("./src/features/auth/auth.controller");
const threadRoutes = require("./src/features/threads/threads.routes");
const chatSocket = require("./src/features/chat/chat.socket");
const chatRoutes = require("./src/features/chat/chat.routes");
const userRoutes = require("./src/features/user/user.routes");
const verifyJWT = require("./src/features/auth/auth.service");

const app = express();
// Configure CORS: in development reflect the request origin so multiple localhost ports work.
// In production, only allow the configured CLIENT_URL.
const clientUrl = process.env.CLIENT_URL;
console.log("CORS client URL:", clientUrl || "(not set - development mode will reflect origin)");

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    // allow requests with no origin (e.g., mobile apps, curl)
    if (!origin) return callback(null, true);

    // during development, be permissive and reflect the origin
    if (process.env.NODE_ENV !== "production") return callback(null, true);

    // in production, only allow the configured client URL
    if (clientUrl && origin === clientUrl) return callback(null, true);

    // otherwise block
    return callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/auth", authRouter);
app.use("/users", userRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/chat", chatRoutes);

// one shared HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  },
});


chatSocket(io);

// GOOGLE AUTH ROUTES 

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user.id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  }
);

// PROTECTED API
app.get("/api/profile", verifyJWT, async (req, res) => {
  res.json({ message: "Access granted", userId: req.user.userId });
});

// START SERVER 
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server + Socket.IO running on port ${PORT}`);
});
