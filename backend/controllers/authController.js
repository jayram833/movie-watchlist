const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const AppError = require("../utils/appError");
const sendMail = require("../utils/email");

const {
    findByResetToken,
    resetPasswordById,
    checkUserById,
    insertUser,
    getUserByEmail,
    setExpireTokenAndTime,
    deleteUser,
    getAllUsers
} = require("../models/userModel");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

function signToken(id) {
    return jwt.sign({ id }, jwtSecret, { expiresIn });
}

function createSendToken(user, statusCode, res) {
    const token = signToken(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("jwt", token, cookieOptions);

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        }
    });
}

exports.getUsers = async function (req, res, next) {
    try {
        const result = await getAllUsers();
        res.status(200).json({
            status: "success",
            results: result.rowCount,
            data: {
                users: result.rows,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.addUser = async function (req, res, next) {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    try {
        const result = await insertUser(req.body.name, req.body.email, hashedPassword);
        const user = result.rows[0];
        createSendToken(user, 201, res);
    } catch (err) {
        console.log(err);
        return next(new AppError(`${err.message}`, 400));
    }
};

exports.login = async function (req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide email and password!", 400));
    }
    try {
        const result = await getUserByEmail(email);
        const user = result.rows[0];
        if (!user || !await bcrypt.compare(password, user.password)) {
            return next(new AppError("Incorrect email or password", 401));
        }
        createSendToken(user, 200, res);
    } catch (e) {
        next(new AppError("Something went wrong, please try again later", 500));
    }
};

exports.protect = async function (req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return next(new AppError("You are not logged in! Please log in to get access.", 401));

    const decoded = await jwt.verify(token, jwtSecret);
    const freshUser = await checkUserById(decoded.id);
    if (!freshUser.rows[0]) {
        return next(new AppError("The user belonging to this token does not exist!", 401));
    }
    next();
};

exports.forgotPassword = async function (req, res, next) {
    try {
        const result = await getUserByEmail(req.body.email);
        const user = result.rows[0];
        if (!user) {
            return next(new AppError("There is no user with that email address!", 404));
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const encToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        const passwordResetExpires = Date.now() + 10 * 60 * 1000;
        const expiresInSeconds = Math.floor(passwordResetExpires / 1000);

        await setExpireTokenAndTime(encToken, expiresInSeconds, req.body.email);

        const resetURL = `${req.protocol}://${req.get("host")}/api/v1/users/resetpassword/${resetToken}`;
        const message = `Forgot your password? Submit a PATCH request with your new password to: ${resetURL}.\nIf you didn't request this, please ignore the email.`;

        await sendMail({
            email: req.body.email,
            subject: "Your password reset token (valid for 10 min)",
            message
        });

        res.status(200).json({
            status: "success",
            message: "Token sent to email!"
        });

    } catch (e) {
        console.log(e);
        return next(new AppError("There was an error sending the email. Try again later!", 500));
    }
};

exports.resetPassword = async function (req, res, next) {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const result = await findByResetToken(hashedToken);
    const user = result.rows[0];
    if (!user) {
        return next(new AppError("Token is invalid or has expired!", 400));
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    await resetPasswordById(hashedPassword, user.id);

    createSendToken(user, 200, res);
};

exports.deleteCurrentUser = async function (req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const { id } = await jwt.verify(token, jwtSecret);
    try {
        await deleteUser(id);
        res.status(204).json({
            status: "success",
            data: null
        });
    } catch (err) {
        console.log(err.message);
    }
};
