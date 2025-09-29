function Home() {
    return (
        <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4">🎬 Movie Watchlist</h1>
            <p className="text-lg text-gray-700 mb-6 text-center max-w-md">
                Keep track of your favorite movies, discover new ones, and build your personal watchlist.
                <br />
                <span className="font-semibold text-indigo-600">Login to get started!</span>
            </p>
        </div>
    )
}

export default Home
