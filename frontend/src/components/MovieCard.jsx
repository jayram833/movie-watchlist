import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

function MovieCard({ movie, onDelete }) {

    return (
        <div
            className="bg-white shadow-md rounded-lg p-5 flex flex-col justify-between"
        >
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

            <div className="mt-4 flex space-x-3">
                <button
                    onClick={() => onEdit(movie)}
                    className="p-2 text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-700 hover:text-white"
                >
                    <PencilIcon className="h-5 w-5" />
                </button>
                <button
                    onClick={() => onDelete(movie.id)}
                    className="text-red-500 bg-red-100 hover:text-white hover:bg-red-600 p-2 rounded-md"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

export default MovieCard
