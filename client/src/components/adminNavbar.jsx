import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {

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
        <div className="container mx-auto flex justify-between items-center py-4">
            <h2 className="text-2xl font-bold text-white">Vision AI</h2>
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
            <div className="flex items-center gap-4">
                <span className="text-white">
                    Welcome, {user.username}
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
        </div>
    </nav>
  );
}

export default AdminNavbar;
