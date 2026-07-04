// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {
//   const navigate = useNavigate();

//   const user = JSON.parse(
//     localStorage.getItem("user")
//   );

//   const logout = () => {

//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/login");

//   };
//   return (
//     <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">

//       {/* LOGO */}
//       <h1 className="font-bold text-xl text-purple-600">
//         Vision AI
//       </h1>

//       {/* LINKS */}
//       <div className="space-x-6 text-gray-700 font-medium">
//         <Link to="/" className="hover:text-purple-600 transition">
//           Home
//         </Link>

//         <Link to="/dashboard" className="hover:text-purple-600 transition">
//           Dashboard
//         </Link>

//         <Link
//           to="/login"
//           className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
//         >
//           Login
//         </Link>
//           <button

//                 onClick={logout}

//                 className="
//                 bg-red-500
//                 px-4
//                 py-2
//                 rounded
//                 hover:bg-red-600
//                 "

//               >

//                 Logout

//               </button>
//       </div>

//     </div>
//   );
// }

import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (

    <nav className="bg-slate-900 text-black shadow-md">

      <div className="max-w-9xl mx-auto px-6 py-4 bg-white md:shadow flex justify-between items-center">

        {/* Logo */}

        <h2 className="text-2xl font-bold">

          Vision AI

        </h2>

        {/* Navigation */}

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-400"
          >
            Home
          </Link>

          {user && (

            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-400"
              >
                Dashboard
              </Link>

              <Link
                to="/history"
                className="hover:text-blue-400"
              >
                History
              </Link>

              <Link
                to="/Analytics"
                className="hover:text-blue-400"
              >
                Evaluation
              </Link>
            </>

          )}

          {user?.role === "admin" && (

            <Link
              to="/AdminDashboard"
              className="
              bg-purple-600
              px-3
              py-1
              rounded
              hover:bg-purple-700
              "
            >
              Admin Panel
            </Link>

          )}

          {!user && (

            <>
              <Link
                to="/login"
                className="hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-400"
              >
                Register
              </Link>
            </>

          )}

          {user && (

            <div className="flex items-center gap-4">

              <span className="font-medium">

                Welcome,
                {" "}
                {user.username}

              </span>

              <button

                onClick={logout}

                className="
                bg-red-500
                px-4
                py-2
                rounded
                hover:bg-red-600
                "

              >

                Logout

              </button>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;

// function Navbar() {

  

//   return (

//     <nav className="bg-slate-900 text-white shadow-md">

//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

//         {/* Logo */}

       
//         {/* Navigation */}

//         <div className="flex items-center gap-6">

//           {user && (

//             <>
//               <Link
//                 to="/dashboard"
//                 className="hover:text-blue-400"
//               >
//                 Dashboard
//               </Link>

//               <Link
//                 to="/history"
//                 className="hover:text-blue-400"
//               >
//                 History
//               </Link>

//               <Link
//                 to="/evaluation"
//                 className="hover:text-blue-400"
//               >
//                 Evaluation
//               </Link>
//             </>

//           )}

//           {user?.role === "admin" && (

//             <Link
//               to="/admin"
//               className="
//               bg-purple-600
//               px-3
//               py-1
//               rounded
//               hover:bg-purple-700
//               "
//             >
//               Admin Panel
//             </Link>

//           )}

//           {!user && (

//             <>
//               <Link
//                 to="/login"
//                 className="hover:text-blue-400"
//               >
//                 Login
//               </Link>

//               <Link
//                 to="/register"
//                 className="hover:text-blue-400"
//               >
//                 Register
//               </Link>
//             </>

//           )}

//           {user && (

//             <div className="flex items-center gap-4">

//               <span className="font-medium">

//                 Welcome,
//                 {" "}
//                 {user.name}

//               </span>

//               <button

//                 onClick={logout}

//                 className="
//                 bg-red-500
//                 px-4
//                 py-2
//                 rounded
//                 hover:bg-red-600
//                 "

//               >

//                 Logout

//               </button>

//             </div>

//           )}

//         </div>

//       </div>

//     </nav>

//   );

// }

// export default Navbar;