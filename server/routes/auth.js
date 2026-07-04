const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

// 🔷 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 🔥 VALIDATION
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email format check
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // 🔥 CHECK USER EXISTS
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔥 HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 SAVE USER
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User registered successfully ✅" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});


// 🔷 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 VALIDATION
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id , role: user.role}, SECRET, { expiresIn: "1d" });

    res.json({ token ,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
      
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;