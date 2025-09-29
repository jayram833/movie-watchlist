const pool = require("../config/db");


exports.getAllMovies = async function () {
    const result = await pool.query("SELECT * FROM movies");
    return result.rows;
}

exports.addMovie = async function (newMovie) {
    const { title, genre, release_year, status, user_id } = newMovie;
    const result = await pool.query("INSERT INTO movies (title, genre, release_year, status, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *", [title, genre, release_year, status, user_id]);
    return result.rows[0];
}

exports.deleteMovie = async function (id) {
    return await pool.query(`DELETE FROM movies WHERE id=$1`, [id]);

}