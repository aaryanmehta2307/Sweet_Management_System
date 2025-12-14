const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));

app.get("/", (req, res) => {
  res.send("Sweet Shop API is running 🚀");
});

app.use("/api/sweets", require("./routes/sweet.routes"));

const walletRoutes = require("./routes/wallet.routes");

app.use("/api/wallet", walletRoutes);
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));


module.exports = app;
