const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs"); // Add bcryptjs for password hashing
require("dotenv").config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection using environment variable
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User schema and model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    emailOrMobile: String,
    name: { type: String, default: "" },
    mobile: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    address: { type: String, default: "" },
    cart: [
      {
        name: String,
        price: Number,
        imageUrl: String,
      },
    ],
    password: { type: String }, // Store password here
  })
);

// Routes

// Signup route
app.post("/api/auth/signup", async (req, res) => {
  const { emailOrMobile, password } = req.body;

  // Validation
  if (!emailOrMobile || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^\d{10}$/;

  if (!emailRegex.test(emailOrMobile) && !mobileRegex.test(emailOrMobile)) {
    return res.status(400).json({ error: "Invalid email or mobile number" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters long" });
  }

  try {
    const existingUser = await User.findOne({ emailOrMobile });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ emailOrMobile, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Contact schema and model
const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema({
    fullName: String,
    email: String,
    subject: String,
    message: String,
  })
);

// Routes

// Fetch user details
app.get("/api/user/:emailOrMobile", async (req, res) => {
  const { emailOrMobile } = req.params;
  try {
    const user = await User.findOne({ emailOrMobile });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user); // Address is now part of the user object
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Update user details
app.put("/api/user/:emailOrMobile", async (req, res) => {
  const { emailOrMobile } = req.params;
  const { name, mobile, profileImage, address } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { emailOrMobile },
      { name, mobile, profileImage, address }, // Include address here
      { new: true, upsert: false }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Failed to update user details" });
  }
});

// Add product to cart
app.post("/api/cart/:emailOrMobile", async (req, res) => {
  const { emailOrMobile } = req.params;
  const { name, price, imageUrl } = req.body;
  try {
    const user = await User.findOne({ emailOrMobile });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.cart.push({ name, price, imageUrl });
    await user.save();
    res.status(201).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

// Get cart items
app.get("/api/cart/:emailOrMobile", async (req, res) => {
  const { emailOrMobile } = req.params;
  try {
    const user = await User.findOne({ emailOrMobile });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { emailOrMobile, password } = req.body;

  if (!emailOrMobile || !password) {
    return res.status(400).json({ error: "Email or Mobile and Password are required" });
  }

  try {
    const user = await User.findOne({ emailOrMobile });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Contact form route
app.post("/api/contact", async (req, res) => {
  const { fullName, email, subject, message } = req.body;
  try {
    const newContact = new Contact({ fullName, email, subject, message });
    await newContact.save();
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
