import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    function handleLogout() {
        logout();
        navigate("/login");
    }
    return (
        <nav className="bg-indigo-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold text-white">
                    <h1 onClick={() => navigate("/")} className="cursor-pointer">Movie Watchlist</h1>
                </div>
                <ul className="flex justify-between space-x-4 text-white items-center">
                    <li>
                        <Link to="/dashboard" className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/addmovie" className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded">Add Movie</Link>
                    </li>
                    <li>
                        {isAuthenticated ? <button onClick={() => handleLogout()} className=" bg-indigo-500 hover:bg-indigo-400 px-4 py-2 rounded cursor-pointer ">Logout</button> : pathname !== "/login" && <Link to="/login" className="bg-indigo-500 hover:bg-indigo-400 px-4 py-2 cursor-pointer rounded">Login</Link>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
