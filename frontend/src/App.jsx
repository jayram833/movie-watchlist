import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AddMovie from "./pages/AddMovie"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "./hooks/useAuth";
import PrivateRoute from "./components/PrivateRoute";

export const MoviesContext = createContext();


function App() {
  const [movies, setMovies] = useState([]);
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  function handleMovieAdded(newMovie) {
    setMovies(prev => [...prev, newMovie]);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* <MoviesContext.Provider value={{ movies, handleMovieAdded }}> */}
      <Routes>
        <Route path="/" element={<h1 >Welcome to App</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addmovie" element={<AddMovie />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
      {/* </MoviesContext.Provider> */}
    </div>
  )
}

export default App
