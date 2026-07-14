import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({}); // 🔥 errors state
const API_URL = import.meta.env.VITE_API_URL;
  // 🔥 VALIDATION FUNCTION
  const validate = () => {
    let newErrors = {};

    if (!username) newErrors.username = "Username is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

    if (!email.includes("@")) {
  newErrors.email = "Invalid email";
}
  };

  // 🔥 REGISTER FUNCTION
 const handleRegister = async () => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      username,
      email,
      password,
    });

    alert("Registration Successful ✅");
    window.location.href = "/login";

  } catch (err) {
    const msg = err.response?.data?.message || "Error";

    let newErrors = {};

    // 🔥 Match backend messages → fields
    if (msg.includes("Username")) newErrors.username = msg;
    if (msg.includes("Email")) newErrors.email = msg;
    if (msg.includes("Password")) newErrors.password = msg;

    // general error
    if (msg === "All fields are required") {
      newErrors = {
        username: "Required",
        email: "Required",
        password: "Required",
      };
    }

    setErrors(newErrors);
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400">
      
      <div className="bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-[360px]">
        
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create Account 🚀
        </h2>

        {/* USERNAME */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-1 rounded-lg bg-white/80"
          onChange={(e) => setUsername(e.target.value)}
        />
       {errors.username && (
  <p className="text-red-500 text-sm mb-2">{errors.username}</p>
)}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-1 rounded-lg bg-white/80"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-1 rounded-lg bg-white/80"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-lg mt-3 hover:scale-105 transition"
        >
          Register
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 h-[1px] bg-gray-300"></div>
          <p className="px-2 text-gray-600 text-sm">OR</p>
          <div className="flex-1 h-[1px] bg-gray-300"></div>
        </div>

        <p className="text-center text-gray-700 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold underline hover:text-purple-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}