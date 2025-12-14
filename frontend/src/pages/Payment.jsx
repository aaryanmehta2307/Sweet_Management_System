import { useCart } from "../Context/CartContext";
import { apiRequest } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Payment = () => {
  const { cart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH WALLET ================= */
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

  /* ================= PAY ================= */
  const pay = async () => {
    if (!wallet || wallet.balance < totalAmount) return;

    try {
      setLoading(true);

      // Purchase each sweet with quantity
      for (const item of cart) {
        await apiRequest(`/api/sweets/${item._id}/purchase`, {
          quantity: item.qty,
        });
      }

      clearCart();
      alert("Payment successful 🎉");
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!wallet) return <p className="p-6">Loading payment details...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Summary</h1>

      {/* CART ITEMS */}
      <div className="space-y-2">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between bg-white p-3 rounded shadow-sm"
          >
            <span>
              {item.name} ({item.qty} kg)
            </span>
            <span>₹ {item.price * item.qty}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-4 p-4 rounded-xl bg-[var(--color-soft)]">
        <p className="font-semibold">
          Total Payable: ₹ {totalAmount}
        </p>

        <p
          className={`mt-1 font-medium ${
            wallet.balance < totalAmount
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          Wallet Balance: ₹ {wallet.balance}
        </p>
      </div>

      {/* PAY BUTTON */}
      <button
        onClick={pay}
        disabled={wallet.balance < totalAmount || loading}
        className="
          mt-6 px-6 py-3 rounded-full font-medium
          bg-green-600 text-white
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading ? "Processing..." : "Pay from Wallet"}
      </button>

      {/* ERROR MESSAGE */}
      {wallet.balance < totalAmount && (
        <p className="text-red-500 text-sm mt-2">
          Insufficient wallet balance. Please add money.
        </p>
      )}
    </div>
  );
};

export default Payment;
