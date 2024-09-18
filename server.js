const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const errorHandle = require("./middleware/error");

//Load env vars
dotenv.config({ path: "./config/config.env" });

// ConnectDB
connectDB();

//Route files
const bootcamps = require("./routers/bootcamps");
const courses = require("./routers/courses");
const auth = require("./routers/auth");

const app = express();

//Body parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

//Middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

app.use(errorHandle);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
            .bold
    )
);
