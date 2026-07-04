import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import clipComparisonChart from "./components/ClipComparisonChart";
import History from "./pages/History";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/History" element={<History />} />
        <Route path="/clipComparisonChart" element={<clipComparisonChart />} />
      </Routes>
    </BrowserRouter>
  );
}

 export default App;
 
// export default function App() {
//   return (
//     <h1 className="text-5xl text-red-500">
//       App Working ✅
//       {/* <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter> */}
//     </h1>
//   )
// }