const express=require('express')

const passport = require("./google_auth");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app=express()
app.use(express.json())

app.use(cookieParser());
app.use(passport.initialize());

// Google Auth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

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

// Protected API route example
app.get("/api/profile", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.json({ message: "Access granted", userId: decoded.userId });
    } catch (err) {
      res.status(403).json({ error: "Invalid token" });
    }
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server running on port",PORT )
})