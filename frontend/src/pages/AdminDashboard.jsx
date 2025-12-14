import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const [image, setImage] = useState(null);

  const [restockQty, setRestockQty] = useState({});
  const [editingSweet, setEditingSweet] = useState(null);
  const [editImage, setEditImage] = useState(null);

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/auth");

    const decoded = jwtDecode(token);
    if (decoded.role !== "admin") return navigate("/dashboard");

    fetchSweets();
  }, []);

  /* ================= FETCH ================= */
  const fetchSweets = async () => {
    setLoading(true);
    const data = await apiRequest("/api/sweets/search", null, "GET");
    setSweets(data);
    setLoading(false);
  };

  /* ================= ADD ================= */
  const addSweet = async () => {
    if (!form.name || !form.category || !form.price || !form.quantity) return;

    const formData = new FormData();
    Object.entries(form).forEach(([k, v]) => formData.append(k, v));
    if (image) formData.append("image", image);

    await apiRequest("/api/sweets", formData, "POST", true);

    setForm({ name: "", category: "", price: "", quantity: "" });
    setImage(null);
    fetchSweets();
  };

  /* ================= UPDATE ================= */
  const updateSweet = async () => {
    const formData = new FormData();
    ["name", "category", "price", "quantity"].forEach((f) =>
      formData.append(f, editingSweet[f])
    );
    if (editImage) formData.append("image", editImage);

    await apiRequest(`/api/sweets/${editingSweet._id}`, formData, "PUT", true);
    setEditingSweet(null);
    setEditImage(null);
    fetchSweets();
  };

  /* ================= DELETE ================= */
  const deleteSweet = async (id) => {
    await apiRequest(`/api/sweets/${id}`, null, "DELETE");
    fetchSweets();
  };

  /* ================= RESTOCK ================= */
  const restockSweet = async (id) => {
    const qty = restockQty[id];
    if (!qty || qty <= 0) return;

    await apiRequest(`/api/sweets/${id}/restock`, { quantity: Number(qty) });
    setRestockQty((p) => ({ ...p, [id]: "" }));
    fetchSweets();
  };

  if (loading) return <p className="p-6">Loading admin dashboard...</p>;

  return (
    <div className="min-h-screen px-4 md:px-6 py-6 bg-[var(--color-base)]">
      <h1 className="text-2xl font-bold mb-6">🛠 Admin Dashboard</h1>

      {/* ADD SWEET */}
      <div className="bg-[var(--color-soft)] p-5 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Sweet</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["name", "category", "price", "quantity"].map((f) => (
            <input
              key={f}
              type={f === "price" || f === "quantity" ? "number" : "text"}
              placeholder={f}
              value={form[f]}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
              className="px-3 py-2 rounded bg-white outline-none"
            />
          ))}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="px-3 py-2 rounded bg-white"
          />
        </div>

        <button
          onClick={addSweet}
          className="mt-4 w-full md:w-auto px-6 py-2 rounded-full bg-[var(--color-primary)] font-medium"
        >
          Add Sweet
        </button>
      </div>

      {/* SWEET CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sweets.map((sweet) => (
          <div
            key={sweet._id}
            className="bg-[var(--color-soft)] p-5 rounded-xl shadow flex flex-col"
          >
            {sweet.image && (
              <img
                src={sweet.image}
                alt={sweet.name}
                className="w-full h-72 object-cover rounded-lg mb-3"
              />
            )}

            <h3 className="font-semibold text-lg">{sweet.name}</h3>
            <p className="opacity-80">Category: {sweet.category}</p>
            <p className="opacity-80">₹ {sweet.price} / kg</p>
            <p className="opacity-80 mb-3">Stock: {sweet.quantity} kg</p>

            {/* RESTOCK */}
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                placeholder="Add kg"
                value={restockQty[sweet._id] || ""}
                onChange={(e) =>
                  setRestockQty({ ...restockQty, [sweet._id]: e.target.value })
                }
                className="flex-1 px-2 py-1 rounded bg-white"
              />
              <button
                onClick={() => restockSweet(sweet._id)}
                className="px-3 py-1 rounded bg-green-500 text-white text-sm"
              >
                Restock
              </button>
            </div>

            <button
              onClick={() => setEditingSweet(sweet)}
              className="mb-2 py-2 rounded bg-blue-500 text-white text-sm"
            >
              Edit Sweet
            </button>

            <button
              onClick={() => deleteSweet(sweet._id)}
              className="py-2 rounded bg-red-500 text-white text-sm"
            >
              Delete Sweet
            </button>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editingSweet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Sweet</h2>

            {["name", "category", "price", "quantity"].map((f) => (
              <input
                key={f}
                type={f === "price" || f === "quantity" ? "number" : "text"}
                value={editingSweet[f]}
                onChange={(e) =>
                  setEditingSweet({ ...editingSweet, [f]: e.target.value })
                }
                className="w-full mb-2 px-3 py-2 border rounded"
              />
            ))}

            <input
              type="file"
              onChange={(e) => setEditImage(e.target.files[0])}
              className="mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={updateSweet}
                className="flex-1 py-2 bg-green-500 text-white rounded"
              >
                Update
              </button>
              <button
                onClick={() => setEditingSweet(null)}
                className="flex-1 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
