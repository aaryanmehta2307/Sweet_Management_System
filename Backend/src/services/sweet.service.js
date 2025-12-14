const Sweet = require("../models/Sweet");
const Wallet = require("../models/Wallet");

const createSweet = async (data) => {
  return await Sweet.create(data);
};

const getAllSweets = () => Sweet.find();

const searchSweets = (query) => Sweet.find(query);


const updateSweet = async (id, data, file) => {
  const updateData = {
    name: data.name,
    category: data.category,
    price: data.price,
    quantity: data.quantity,
  };

  if (file) {
    updateData.image = `/uploads/${file.filename}`;
  }

  return await Sweet.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};


const deleteSweet = (id) => Sweet.findByIdAndDelete(id);


const purchaseSweet = async (sweetId, userId, quantityKg) => {
  // 1. Validate quantity
  if (!quantityKg || quantityKg <= 0) {
    throw new Error("Invalid quantity");
  }

  // 2. Find sweet
  const sweet = await Sweet.findById(sweetId);
  if (!sweet) {
    throw new Error("Sweet not found");
  }

  // 3. Check stock (kg)
  if (sweet.quantity < quantityKg) {
    throw new Error("Insufficient stock");
  }

  // 4. Find wallet
  const wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    throw new Error("Wallet not found");
  }

  // 5. Calculate total price
  const totalPrice = sweet.price * quantityKg;

  // 6. Check wallet balance
  if (wallet.balance < totalPrice) {
    throw new Error("Insufficient wallet balance");
  }

  // 7. Deduct wallet & inventory
  wallet.balance -= totalPrice;
  sweet.quantity -= quantityKg;

  await wallet.save();
  await sweet.save();

  // 8. Return detailed response
  return {
    message: "Purchase successful",
    sweet: {
      id: sweet._id,
      name: sweet.name,
      pricePerKg: sweet.price
    },
    purchasedQuantityKg: quantityKg,
    totalPrice,
    remainingBalance: wallet.balance,
    remainingStockKg: sweet.quantity
  };
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
