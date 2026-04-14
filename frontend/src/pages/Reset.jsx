import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";


export default function Reset() {
  const navigate = useNavigate();
  
  const [params] = useSearchParams();
  const token = params.get("token");
  
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    console.log("RESET CLICKED");
    console.log("TOKEN:", token);

    if (!password) return toast.error("Enter password");

    try {
      setLoading(true);

      const res = await API.post("/auth/reset-password", { token, password });

      console.log("RESET SUCCESS:", res.data);

      toast.success("Password updated");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.log("RESET ERROR:", err.response?.data || err.message);
      toast.error("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded w-80">

        <h2 className="mb-4 text-xl text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2 bg-gray-700"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-500 p-2"
        >
          {loading ? "Updating..." : "Reset Password"}
        </button>

      </div>
    </div>
  );
}