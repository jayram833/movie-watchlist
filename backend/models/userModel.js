const pool = require("../config/db");


exports.getAllUsers = async function () {
    return await pool.query(`SELECT * FROM active_users;`)
}

exports.addMovie = async function (newMovie) {
    const { title, genre, release_year, status, user_id } = newMovie;
    const result = await pool.query("INSERT INTO movies (title, genre, release_year, status, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *", [title, genre, release_year, status, user_id]);
    return result.rows[0];
}

exports.findByResetToken = async function (hashedToken) {
    return await pool.query(`SELECT * FROM users WHERE passwordResetToken = $1 AND passwordResetExpires > NOW();`, [hashedToken]);
}

exports.resetPasswordById = async function (hashedPassword, id) {
    return pool.query("UPDATE users SET password = $1, passwordResetToken = NULL, passwordResetExpires = NULL WHERE id = $2;", [hashedPassword, id]);
}


exports.checkUserById = async function (id) {
    return await pool.query(`SELECT id FROM users WHERE id=$1`, [id])
}
exports.insertUser = async function (name, email, hashedPassword) {
    console.log(name)
    return await pool.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *`, [name, email, hashedPassword])
}

exports.getUserByEmail = async function (email) {
    return await pool.query(`SELECT id,email,name,password FROM users WHERE email=$1`, [email]);
}

exports.setExpireTokenAndTime = async function (encToken, expiresInSeconds, email) {
    return await pool.query(
        `UPDATE users
   SET passwordResetToken = $1,
       passwordResetExpires = to_timestamp($2)
   WHERE email = $3`,
        [encToken, expiresInSeconds, email]
    );
}


exports.deleteUser = async function (id) {
    return await pool.query(`UPDATE users SET active=FALSE WHERE id=$1`, [id]);
}