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
const verifyJWT = require("./src/features/auth/auth.service");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/auth", authRouter);
app.use("/api/threads", threadRoutes);

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
