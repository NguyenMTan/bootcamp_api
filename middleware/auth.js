const jwt = require("jsonwebtoken");
const asyncHandle = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

// Process router
exports.protect = asyncHandle(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // else if(req.cookies.token) {
    //     token = req.cookies.token
    // }

    // Make sure token exits
    if (!token) {
        return next(
            new ErrorResponse("Not authorize to access this route", 401)
        );
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        return next(
            new ErrorResponse("Not authorize to access this route", 401)
        );
    }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorResponse(
                    `User role ${req.user.role} is not authorize to access this route`,
                    403
                )
            );
        }
        next();
    };
};
