import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate("/login");
    }
    console.log(isAuthenticated)

    return (
        <nav className="bg-indigo-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl font-bold text-white">
                    <h1>Movie Watchlist</h1>
                </div>
                <ul className="flex justify-between space-x-4 text-white">
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/addmovie">Add Movie</Link>
                    </li>
                    <li>
                        {isAuthenticated ? <button onClick={() => handleLogout()}>Logout</button> : <Link to="/login">Login</Link>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
