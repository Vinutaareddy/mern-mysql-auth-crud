import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    const { name, email, password } = data;
    
    // 🔥 basic checks
    if (!name || !email || !password) {
      return alert("All fields are required");
    }
  
    // 🔥 email validation (not stupid version)
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      return alert("Enter valid email");
    }
  
    // 🔥 password check
    if (password.length < 6) {
      return alert("Password must be at least 6 characters");
    }
  
    try {
      await API.post("/auth/register", data);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">

      <div className="bg-gray-800 p-8 rounded w-96">

        <h2 className="text-xl mb-4 text-center">Register</h2>

        <input
          placeholder="Name"
          className="w-full mb-2 p-2 bg-gray-700"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full mb-2 p-2 bg-gray-700"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-gray-700"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 p-2 mb-3"
        >
          Register
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}