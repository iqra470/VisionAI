import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // 🔥 VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!email && !password) {
      newErrors.email = "All fields are required";
      newErrors.password = "All fields are required";
    } else {
      if (!email) newErrors.email = "Email is required";
      if (!password) newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // 🔥 LOGIN FUNCTION
const handleLogin = async () => {
  if (!validate()) return;

  try {
    const res = await axios.post(
      "http://visionai-production-5752.up.railway.app/api/auth/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    alert("Login Successful");

    // Role Based Redirect
    if (res.data.user.role === "admin") {
      navigate("/AdminDashboard");
    } else {
      navigate("/");
    }

  } catch (err) {
    const msg = err.response?.data?.message || "Error";

    let newErrors = {};

    if (msg.toLowerCase().includes("user"))
      newErrors.email = msg;

    if (msg.toLowerCase().includes("password"))
      newErrors.password = msg;

    setErrors(newErrors);
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-300 via-blue-300 to-indigo-400">

      <div className="bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-[360px] border border-white/40">

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-1 rounded-lg outline-none bg-white/80 focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-1 rounded-lg outline-none bg-white/80 focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        {/* BUTTON (NO DISABLED) */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-lg mt-3 transition duration-300 shadow-lg font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:scale-105"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <p className="px-2 text-gray-600 text-sm">OR</p>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        {/* Register link */}
        <p className="text-center text-gray-700 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="font-semibold underline hover:text-blue-600">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}