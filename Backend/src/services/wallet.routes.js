const express = require("express");
const Wallet = require("../models/Wallet");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// GET wallet balance
router.get("/", authMiddleware, async (req, res) => {
  const wallet = await Wallet.findOne({ user: req.user.id });
  res.json(wallet);
});

// ADD money to wallet
router.post("/add", authMiddleware, async (req, res) => {
  const { amount } = req.body;

  if (amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  const wallet = await Wallet.findOne({ user: req.user.id });
  wallet.balance += amount;
  await wallet.save();

  res.json(wallet);
});

module.exports = router;
