const express = require("express");
const app = express();
const path = require("path");
const collection = require("./mongodb.js");
const cors = require("cors");

app.use(
  cors({
    origin: "https://login-proyect-delta.vercel.app",
    methods: ["GET", "POST"],
  })
);

// Fixed CSP header to allow your own styles and scripts
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' https://login-proyect-delta.vercel.app; " +
    "style-src 'self' 'unsafe-inline' https://login-proyect-delta.vercel.app; " +
    "font-src 'self'; " +
    "img-src 'self' data:; " +
    "connect-src 'self' https://login-proyect-delta.vercel.app;"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

// Routes to serve HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "signup.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  try {
    await collection.insertOne(data);
    res.redirect("/home");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Error creating account");
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("Looking for user:", req.body.name);
    const check = await collection.findOne({ name: req.body.name });
    console.log("Found user:", check);

    if (check && check.password === req.body.password) {
      res.redirect("/home");
    } else {
      res.status(401).send("Wrong password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Wrong details");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});