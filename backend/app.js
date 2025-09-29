const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const { xss } = require("express-xss-sanitizer");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/globalErrorHandler");

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body in req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization
// Data sanitization against XSS 
app.use(xss());

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP, please try again in an hour!"
});
app.use("/api", limiter);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Routes
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/users", authRoutes);


app.all(/.*/, (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);



const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})