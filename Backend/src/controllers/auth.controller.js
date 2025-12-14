const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const register = async (req, res) => {
  try {
    const { name, email, password, adminKey } = req.body;

    let role = "user";

    if (adminKey && adminKey === process.env.ADMIN_SECRET) {
      role = "admin";
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    await Wallet.create({
  user: user._id,
  balance: 0
});

    res.status(201).json({
      id: user._id,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
