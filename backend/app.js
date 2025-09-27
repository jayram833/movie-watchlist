const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/globalErrorHandler");

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

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