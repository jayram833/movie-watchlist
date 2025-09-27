const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util")
const AppError = require("../utils/appError");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

function signToken(id) {
    return jwt.sign({ id }, jwtSecret, { expiresIn });
}

exports.addUser = async function (req, res, next) {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
        const result = await pool.query(`INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *`, [req.body.name, req.body.email, hashedPassword]);
        const { id, name, email, created_at } = result.rows[0];
        const token = signToken(id);
        res.status(201).json({
            status: "success",
            token,
            data: {
                user: { id, name, email, created_at }
            }
        })
    } catch (err) {
        console.log(err);
        return next(new AppError(`${err.message}`, 400));
    }
}

exports.login = async function (req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }
    try {
        const result = await pool.query(`SELECT id,email,name,password FROM users WHERE email=$1`, [email]);
        const user = result.rows[0];
        if (!user || !await bcrypt.compare(password, user.password)) {
            return next(new AppError("Incorrect email or password", 401));
        }
        const token = await signToken(user.id);
        res.status(200).json({
            status: "success",
            token,
            data: {
                user: { id: user.id, name: user.name, email: user.email }
            }
        })
    } catch (e) {
        next(new AppError("Something went wrong, please try again later", 500));
    }
}


exports.protect = async function (req, res, next) {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) next(new AppError("You are not logged in! Please log in to get access.", 401))
    // 2) Verification jwt
    const decoded = await jwt.verify(token, jwtSecret);
    // 3) Check if user still exists
    const freshUser = await pool.query(`SELECT id FROM users WHERE id=$1`, [decoded.id]);
    if (!freshUser.rows[0]) {
        return next(new AppError("The user belonging to this token does not exists!", 401));
    }
    // 4) Check if user changed password after jwt was received
    next();
}