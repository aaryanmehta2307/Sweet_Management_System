import { useEffect, useState } from "react";
import DashboardNavbar from "../Components/DashboardNavbar";
import SweetCard from "../Components/SweetCard";
import { apiRequest } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [filters, setFilters] = useState({});
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const navigate = useNavigate();
let debounceTimer;
useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/auth");
    return;
  }

  const decoded = jwtDecode(token);
  setUser({ id: decoded.id, name: "User" });

  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    fetchAll();
  }, 400); // 400ms debounce
}, [filters]);


  const fetchAll = async () => {
    try {
      const query = new URLSearchParams(filters).toString();

      const [sweetsData, walletData] = await Promise.all([
        apiRequest(`/api/sweets/search?${query}`, null, "GET"),
        apiRequest("/api/wallet", null, "GET"),
      ]);

      setSweets(sweetsData);
      setWallet(walletData);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || !wallet) return null;

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--color-base)" }}
    >
      <DashboardNavbar
        user={user}
        wallet={wallet}
        onWalletUpdate={fetchAll}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="px-6 py-8 grid md:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <SweetCard
            key={sweet._id}
            sweet={sweet}
            onPurchase={fetchAll}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
