import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "active",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchItems = async () => {
    const res = await API.get("/items");
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
    fetchStats();
  }, []);

  const handleSubmit = async () => {
    if (!form.title) return alert("Title required");

    if (editingId) {
      await API.put(`/items/${editingId}`, form);
      setEditingId(null);
    } else {
      await API.post("/items", form);
    }

    setForm({ title: "", description: "", status: "active" });
    fetchItems();
    fetchStats();
  };

  const editItem = (item) => {
    setEditingId(item.id);
    setForm(item);
    fetchStats();
  };

  const deleteItem = async (id) => {
    await API.delete(`/items/${id}`);
    fetchItems();
    fetchStats();
  };

  const [stats, setStats] = useState({});

  const fetchStats = async () => {
  const res = await API.get("/items/stats");
  setStats(res.data);
  };

  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-4">
  <div>Total: {stats.total}</div>
  <div>Active: {stats.active}</div>
  <div>Pending: {stats.pending}</div>
  <div>Completed: {stats.completed}</div>
</div>

      {/* FORM */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />

        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* LIST */}
      {items.map((item) => (
        <div key={item.id} className="bg-gray-800 p-4 mb-2 rounded flex justify-between">

          <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <span className="text-sm text-gray-400">
              {item.status}
            </span>
          </div>

          <div className="space-x-2">
            <button onClick={() => editItem(item)}>Edit</button>
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </div>

        </div>
      ))}
    </div>
  );
}