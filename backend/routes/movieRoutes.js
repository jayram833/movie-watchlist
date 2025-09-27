const express = require("express");
const { getMovies, addSingleMovie } = require("../controllers/movieController");


const router = express.Router();

router.route("/").get(getMovies).post(addSingleMovie);

module.exports = router;