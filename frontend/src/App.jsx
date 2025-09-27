import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AddMovie from "./pages/AddMovie"
import Dashboard from "./pages/Dashboard"
import Navbar from "./components/Navbar";
import { createContext, useEffect, useState } from "react";

export const MoviesContext = createContext();


function App() {
  const [movies, setMovies] = useState([]);

  function handleMovieAdded(newMovie) {
    setMovies(prev => [...prev, newMovie]);
  }

  async function fetchMovies() {
    try {
      const resp = await fetch(`api/v1/movies`);
      if (!resp.ok) throw new Error("Http error");
      const { data } = await resp.json();
      setMovies(data.movies);
    } catch (e) {
      console.error(e.message);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MoviesContext.Provider value={{ movies, handleMovieAdded }}>
        <Routes>
          <Route path="/" element={<h1>Welcome to App</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </MoviesContext.Provider>
    </div>
  )
}

export default App
