const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User"); // Make sure this exists and is correct

const port = 4000;

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose.connect("mongodb+srv://Nonadevelops:nona%40nona1@cluster0.brysl6j.mongodb.net/e-commerce")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Serve Uploaded Images
app.use('/images', express.static(path.join(__dirname, 'upload/images')));

// ✅ Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'upload/images'),
  filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("🟢 Express App is Running");
});

// ✅ Upload Image
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });

  res.json({
    success: true,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// ✅ Product Schema
const Product = mongoose.model("Product", {
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
});

// ✅ Add Product
app.post("/addproduct", async (req, res) => {
  try {
    const products = await Product.find({});
    const id = products.length ? products[products.length - 1].id + 1 : 1;

    const newProduct = new Product({ ...req.body, id });
    await newProduct.save();
    res.json({ success: true, name: newProduct.name });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Get All Products
app.get("/allproduct", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

// ✅ Remove Product
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true });
});

// ✅ Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ success: false, errors: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new User({
      username,
      email,
      password: hashedPassword,
      cartData: cart,
    });

    await user.save();

    const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

// ✅ Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email & Password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, errors: "Wrong Email Id" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ success: false, errors: "Wrong Password" });

    const token = jwt.sign({ user: { id: user.id } }, "secret_ecom");
    res.json({ success: true, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

// ✅ Start Server

app.listen(port, () => {
  console.log(` Server Running on http://localhost:${port}`);
});
