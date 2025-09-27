const { getAllMovies, addMovie } = require("../models/movieModel");
const AppError = require("../utils/appError");


exports.getMovies = async function (req, res, next) {
    try {
        const movies = await getAllMovies();
        res.status(200).json({
            status: "success",
            data: {
                movies
            }
        });
    } catch (err) {
        return next(new AppError("movies not found", 404))
    }
}

exports.addSingleMovie = async function (req, res, next) {
    const newMovie = req.body;
    try {
        const movie = await addMovie(newMovie);
        res.status(201).json({
            status: "success",
            data: {
                movie
            }
        });
    } catch (err) {
        console.log(err)
        return next(new AppError("failed to add movie", 500))
    }
}