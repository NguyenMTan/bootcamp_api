const ErrorResponse = require("../utils/errorResponse");
const Bootcamp = require("../models/Bootcamp");

exports.getBootCamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();

        res.status(200).json({
            success: true,
            count: bootcamps.length,
            data: bootcamps,
        });
    } catch (error) {
        next(error);
    }
};

exports.getBootCamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if (!bootcamp) {
            return next(
                new ErrorResponse(
                    `Bootcamps not found with id of ${req.params.id}`,
                    404
                )
            );
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        next(error);
    }
};

exports.createBootCamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({ success: true, data: bootcamp });
    } catch (err) {
        next(err);
    }
};

exports.updateBootCamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!bootcamp) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: bootcamp });
    } catch (error) {
        next(error);
    }
};

exports.deleteBootCamps = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

        if (!bootcamp) {
            return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
};
