const sweetService = require("../services/sweet.service");

const addSweet = async (req, res) => {
  try {
    const sweet = await sweetService.createSweet(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSweets = async (req, res) => {
  const sweets = await sweetService.getAllSweets();
  res.json(sweets);
};

const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const query = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sweets = await sweetService.searchSweets(query);
  res.json(sweets);
};

const updateSweet = async (req, res) => {
  const sweet = await sweetService.updateSweet(req.params.id, req.body);
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });
  res.json(sweet);
};

const deleteSweet = async (req, res) => {
  const sweet = await sweetService.deleteSweet(req.params.id);
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });
  res.json({ message: "Sweet deleted successfully" });
};

const purchaseSweet = async (req, res) => {
  try {
    const sweet = await sweetService.purchaseSweet(req.params.id);
    if (!sweet) return res.status(404).json({ message: "Sweet not found" });
    res.json(sweet);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const restockSweet = async (req, res) => {
  const sweet = await sweetService.restockSweet(
    req.params.id,
    Number(req.body.quantity)
  );
  if (!sweet) return res.status(404).json({ message: "Sweet not found" });
  res.json(sweet);
};

module.exports = {
  addSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};
