require('dotenv').config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ emailOrMobile, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Other routes (fetch user details, update user, cart operations, etc.) remain the same
app.get("/api/user/:emailOrMobile", async (req, res) => {
  const { emailOrMobile } = req.params;
  try {
    const user = await User.findOne({ emailOrMobile });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
