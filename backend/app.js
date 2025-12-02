// const express = require("express");
// const app=express()


// // const reqister=require('./jwt/register+login')

// // const authRoutes = require("./jwt/auth");
// const authRoutes = require("./jwt/register+login");
// app.use("/auth", authRoutes);


// app.listen(3000,()=>{
//     console.log("server!!!")
// })

const express = require("express");
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', // frontend URL
    credentials: true, // if you need to send cookies
}));

const postRoutes = require("./src/features/posts/post.routes");
app.use("/posts", postRoutes);

// ROUTES
const authRoutes = require("./jwt/register+login");  // ✔ correct
app.use("/auth", authRoutes);

// JWT Middleware
const authMiddleware = require("./jwt/auth");

// Protected Route Example
app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

app.listen(3000, () => {
  console.log("server!!!");
});
