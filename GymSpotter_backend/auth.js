const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const User = require("./models/User"); // Assuming you have a User model
const router = express.Router();

// Middleware for parsing JSON requests
router.use(bodyParser.json());

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find user by username (you can use email or any other field)
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid username or password." });
  }

  // Create a JWT token
  const token = jwt.sign(
    { userId: user._id, role: user.role }, // Attach user role for authorization
    "your_jwt_secret", // Use an environment variable in production
    { expiresIn: "1h" }
  );

  // Send the token as a response
  res.json({
    token,
    redirect: user.role === "admin" ? "/admin" : user.role === "provider" ? "/serviceprovider" : "/userpage"
  });
});

module.exports = router;
