import { useState } from "react";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

const SweetCard = ({ sweet }) => {
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = sweet.price * qty;

  const handleAddToCart = () => {
    addToCart(sweet, qty);
    setShowModal(true);
  };

  return (
    <>
      <div
        className="p-5 rounded-xl shadow flex flex-col"
        style={{ backgroundColor: "var(--color-soft)" }}
      >
        {sweet.image && (
          <img
            src={sweet.image}
            alt={sweet.name}
            className="w-full h-72 object-cover rounded-lg mb-3"
          />
        )}

        <h3 className="text-lg font-semibold">{sweet.name}</h3>

        <p className="opacity-80">₹ {sweet.price} / kg</p>
        <p className="opacity-80 mb-3">Available: {sweet.quantity} kg</p>

        {/* Quantity */}
        <div className="flex justify-center gap-4 mb-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            −
          </button>

          <span>{qty} kg</span>

          <button
            onClick={() =>
              setQty((q) => Math.min(sweet.quantity, q + 1))
            }
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        <p className="font-semibold text-center mb-3">
          Total: ₹ {totalPrice}
        </p>

        <button
          onClick={handleAddToCart}
          className="w-full py-2 rounded-full bg-[var(--color-primary)] font-medium"
        >
          Add to Cart
        </button>
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-lg font-semibold mb-2">
              ✅ Added to Cart
            </h3>

            <p className="mb-2">{sweet.name}</p>
            <p className="text-sm opacity-70 mb-4">
              {qty} kg • ₹ {totalPrice}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-full bg-gray-200"
              >
                Continue
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="flex-1 py-2 rounded-full bg-[var(--color-primary)]"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SweetCard;
