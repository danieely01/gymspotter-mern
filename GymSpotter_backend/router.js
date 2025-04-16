const express = require("express");
const verifyToken = require("./verifyToken");
const router = express.Router();

router.get("/admin", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json({ message: "Welcome Admin!" });
});

router.get("/serviceprovider", verifyToken, (req, res) => {
  if (req.user.role !== "provider") {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.json({ message: "Welcome Service Provider!" });
});

router.get("/userpage", verifyToken, (req, res) => {
  res.json({ message: "Welcome User!" });
});

module.exports = router;
