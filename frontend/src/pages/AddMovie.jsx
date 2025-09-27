import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../App";
function AddMovie() {
    const [form, setForm] = useState({
        user_id: 1,
        title: "",
        genre: "",
        release_year: "",
        status: "",
    });
    const { handleMovieAdded } = useContext(MoviesContext);
    const navigate = useNavigate();
    function goToDashboard() {
        navigate("/dashboard");
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/v1/movies', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            if (!response.ok) throw new Error(`Http error! status: ${response.status}`);
            const result = await response.json();
            if (result.status === "success" && result.data.movie) {
                handleMovieAdded(result.data.movie)
                goToDashboard();
            }
        } catch (error) {
            console.error('Error submitting movie:', error);
        }
        setForm({ title: "", genre: "", release_year: "", status: "" });
    };

    return (
        <div className="w-full max-w-md md:max-w-2xl lg:max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold text-indigo-600 mb-4">Add Movie</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-none sm:text-sm focus:outline-none"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Genre</label>
                    <input
                        type="text"
                        name="genre"
                        value={form.genre}
                        onChange={handleChange}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-none sm:text-sm focus:outline-none"
                    />
                </div>

                {/* Release Year */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Release Year</label>
                    <input
                        type="number"
                        name="release_year"
                        value={form.release_year}
                        onChange={handleChange}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-none sm:text-sm focus:outline-none"
                    />
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-none sm:text-sm focus:outline-none"
                    >
                        <option value="">Select status</option>
                        <option value="completed">Completed</option>
                        <option value="planned">Planned</option>
                        <option value="watching">Watching</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Add Movie
                </button>
            </form>
        </div>
    );
}

export default AddMovie
