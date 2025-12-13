const express = require("express");
const Sweet = require("../models/Sweet");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// ADD SWEET
router.post("/", authMiddleware, async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET ALL SWEETS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
