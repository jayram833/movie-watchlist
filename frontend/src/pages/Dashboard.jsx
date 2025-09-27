import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
// import { MoviesContext } from "../App";

// const BASE_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
    // const { movies } = useContext(MoviesContext);
    const [movies, setMovies] = useState([]);
    const { token } = useAuth();

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
                    {movies.map((movie, idx) => (
                        <div
                            key={idx}
                            className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between"
                        >
                            {/* Movie Info */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {movie.title}
                                </h3>
                                <p className="text-sm text-gray-600">Genre: {movie.genre}</p>
                                <p className="text-sm text-gray-600">
                                    Release Year: {movie.release_year}
                                </p>
                                <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600">
                                    {movie.status}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="mt-4 flex space-x-3">
                                <button
                                    onClick={() => onEdit(movie)}
                                    className="p-2 text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-700 hover:text-white"
                                >
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onDelete(movie)}
                                    className="text-red-500 bg-red-100 hover:text-white hover:bg-red-600 p-2 rounded-md"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


export default Dashboard;