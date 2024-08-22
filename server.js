const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const colors = require("colors");
const errorHandle = require("./middleware/error");

//Load env vars
dotenv.config({ path: "./config/config.env" });

// ConnectDB
connectDB();

//Route files
const bootcamps = require("./routers/bootcamps");

const app = express();

//Body parser
app.use(express.json());

//Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

app.use(errorHandle);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
