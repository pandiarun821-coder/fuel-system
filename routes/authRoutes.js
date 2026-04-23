const express = require("express");
const router = express.Router();
const User = require("../models/User");

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid login" });
    }

    return res.json({
      message: "Login success",
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;