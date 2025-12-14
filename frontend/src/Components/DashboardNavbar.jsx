import { useState } from "react";
import { apiRequest } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";

const DashboardNavbar = ({
  user,
  wallet,
  onWalletUpdate,
  filters,
  setFilters,
}) => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const [showWallet, setShowWallet] = useState(false);
  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState("");

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 1000,
  });

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const addMoney = async () => {
    if (!amount || amount <= 0) return;
    await apiRequest("/api/wallet/add", { amount: Number(amount) });
    setAmount("");
    setSuccess("Money added successfully ✅");
    onWalletUpdate();
    setTimeout(() => setSuccess(""), 2000);
  };

  return (
    <nav className="bg-[var(--color-soft)] shadow px-4 py-3">
      {/* TOP ROW */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold">🍰 Sweet Shop</h1>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* CART */}
          <Link to="/cart" className="relative text-xl">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* WALLET */}
          <button
            onClick={() => setShowWallet(!showWallet)}
            className="px-3 py-1 rounded-full text-sm font-medium bg-[var(--color-primary)]"
          >
            💰 ₹ {wallet.balance}
          </button>

          {/* USER AVATAR */}
          <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search sweet"
          className="px-3 py-2 rounded bg-white outline-none"
          onChange={(e) =>
            setFilters({ ...filters, name: e.target.value })
          }
        />

        {/* CATEGORY */}
        <select
          className="px-3 py-2 rounded bg-white outline-none"
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All Categories</option>
          <option value="Indian">Indian</option>
          <option value="Bakery">Bakery</option>
          <option value="Milk Products">Milk Products</option>
        </select>

        {/* PRICE RANGE */}
        <div className="col-span-1 md:col-span-2">
          <p className="text-xs font-medium mb-1">
            Price ₹{priceRange.min} – ₹{priceRange.max}
          </p>
          <div className="flex gap-2">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange.min}
              onChange={(e) => {
                const min = Number(e.target.value);
                setPriceRange((p) => ({ ...p, min }));
                setFilters((f) => ({ ...f, minPrice: min }));
              }}
              className="w-full accent-[var(--color-primary)]"
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange.max}
              onChange={(e) => {
                const max = Number(e.target.value);
                setPriceRange((p) => ({ ...p, max }));
                setFilters((f) => ({ ...f, maxPrice: max }));
              }}
              className="w-full accent-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>

      {/* WALLET DROPDOWN */}
      {showWallet && (
        <div className="absolute right-4 top-20 w-64 bg-white p-4 rounded-xl shadow-lg z-50">
          <p className="font-semibold mb-2">Wallet Balance</p>
          <p className="text-xl font-bold mb-3">
            ₹ {wallet.balance}
          </p>

          <input
            type="number"
            placeholder="Enter amount"
            className="w-full px-3 py-2 rounded outline-none mb-3"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button
            onClick={addMoney}
            className="w-full py-2 rounded-full bg-[var(--color-primary)]"
          >
            Add Money
          </button>

          {success && (
            <p className="text-green-600 text-sm mt-2 text-center">
              {success}
            </p>
          )}

          <button
            onClick={logout}
            className="w-full mt-3 py-2 rounded-full text-sm bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
