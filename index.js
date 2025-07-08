const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb.js");
const cors = require("cors");

// Fixed the typo: templatePath instead of tempelatePath
const templatePath = path.join(__dirname, "templates");

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
app.set("view engine", "hbs");
app.set("views", templatePath); // Fixed variable name
app.use(express.urlencoded({ extended: false }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };

  try {
    await collection.insertOne(data);
    res.render("home");
  } catch (error) {
    console.error("Signup error:", error);
    res.send("Error creating account");
  }
});

app.post("/login", async (req, res) => {
  try {
    console.log("Looking for user:", req.body.name);
    const check = await collection.findOne({ name: req.body.name });
    console.log("Found user:", check);

    if (check && check.password === req.body.password) {
      res.render("home");
    } else {
      res.send("wrong password");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.send("wrong details");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
