import { useState } from "react";
import API from "../services/api";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const handleForgot = async () => {
    if (!email || !email.includes("@")) {
      return alert("Enter valid email");
    }
  
    try {
      const res = await API.post("/auth/forgot-password", { email });
      alert(res.data.msg);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error sending reset link");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded w-80">

        <h2 className="mb-4 text-xl text-center">Forgot Password</h2>

        <input
          placeholder="Enter email"
          className="w-full mb-3 p-2 bg-gray-700"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleForgot}
          className="w-full bg-blue-500 p-2"
        >
          Send Reset Link
        </button>

      </div>
    </div>
  );
}