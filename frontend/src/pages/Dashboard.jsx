import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import MovieCard from "../components/MovieCard";
import Toast from "../components/Toast";
// import { MoviesContext } from "../App";

// const BASE_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
    // const { movies } = useContext(MoviesContext);
    const [movies, setMovies] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toast, setToast] = useState({
        type: "error",
        message: ""
    });
    const { token } = useAuth();

    async function handleDeleteMovie(id) {
        try {
            const resp = await fetch(`/api/v1/movies/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (!resp.ok) {
                const errorMsg = await resp.json();
                setShowToast(true);
                throw new Error(errorMsg.message);
            }
            const result = await resp.json();
            if (result.status === "success") {
                setShowToast(true);
                setToast({ type: "success", message: result.status });
                fetchMovies();
            }
        } catch (err) {
            setToast({ type: "error", message: err.message });
            // console.log(err.message)
        }
    }

    async function fetchMovies() {
        try {
            const resp = await fetch(`api/v1/movies`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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
        <div className="max-w-6xl mx-auto mt-10 p-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">Movie Dashboard</h2>

            {movies.length === 0 ? (
                <p className="text-gray-500 text-center">No movies added yet.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-5">
                    {movies.map((movie) => (
                        <MovieCard movie={movie} key={movie.id} onDelete={handleDeleteMovie} />
                    ))}
                </div>
            )}
            {showToast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    duration={3000}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    );
}


export default Dashboard;