import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

const Cart = () => {
  const { cart, updateQty, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const data = await apiRequest("/api/wallet", null, "GET");
      setWallet(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (cart.length === 0)
    return <p className="p-6">Your cart is empty 🛒</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center mb-4 p-3 rounded bg-white shadow-sm"
        >
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm opacity-70">
              ₹ {item.price} × {item.qty} kg
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <button
              onClick={() => updateQty(item._id, item.qty - 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              −
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => updateQty(item._id, item.qty + 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item._id)}
              className="text-red-500"
            >
              ❌
            </button>
          </div>
        </div>
      ))}

      {/* TOTAL */}
      <div className="mt-6 p-4 rounded-xl bg-[var(--color-soft)]">
        <h2 className="font-bold text-lg">
          Total Amount: ₹ {totalAmount}
        </h2>

        {/* WALLET BALANCE */}
        {wallet && (
          <p
            className={`mt-2 font-medium ${
              wallet.balance < totalAmount
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            Available Balance: ₹ {wallet.balance}
          </p>
        )}
      </div>

      {/* PROCEED */}
      <button
        disabled={wallet && wallet.balance < totalAmount}
        onClick={() => navigate("/payment")}
        className="
          mt-6 px-6 py-3 rounded-full font-medium
          bg-[var(--color-primary)]
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Proceed to Payment
      </button>

      {/* INSUFFICIENT MESSAGE */}
      {wallet && wallet.balance < totalAmount && (
        <p className="text-red-500 text-sm mt-2">
          Insufficient wallet balance. Please add money.
        </p>
      )}
    </div>
  );
};

export default Cart;
