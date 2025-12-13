const Sweet = require("../models/Sweet");

const createSweet = (data) => Sweet.create(data);

const getAllSweets = () => Sweet.find();

const searchSweets = (query) => Sweet.find(query);

const updateSweet = (id, data) =>
  Sweet.findByIdAndUpdate(id, data, { new: true });

const deleteSweet = (id) => Sweet.findByIdAndDelete(id);

const purchaseSweet = async (id) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) return null;
  if (sweet.quantity <= 0) throw new Error("Out of stock");

  sweet.quantity -= 1;
  return sweet.save();
};

const restockSweet = async (id, qty) => {
  const sweet = await Sweet.findById(id);
  if (!sweet) return null;

  sweet.quantity += qty;
  return sweet.save();
};

module.exports = {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
};
