const ErrorResponse = require("../utils/errorResponse");
const asyncHandle = require("../middleware/async");
const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

// @desc          GET courses
// @route         GET /api/v1/courses
// @route         GET /api/v1/bootcamps/:bootcampId/courses
// @access        Public
exports.getCourses = asyncHandle(async (req, res, next) => {
    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId });

        return res.status(200).json({
            success: true,
            count: courses.length,
            data: courses,
        });
    } else {
        res.status(200).json(res.advancedResults);
    }

    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses,
    });
});

// @desc          GET single courses
// @route         GET /api/v1/courses/:id
// @access        Public
exports.getCourse = asyncHandle(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate({
        path: "bootcamp",
        select: "name description",
    });

    if (!course) {
        return next(
            new ErrorResponse(`No course with id of ${req.params.id}`),
            404
        );
    }

    res.status(200).json({
        success: true,
        count: course.length,
        data: course,
    });
});

// @desc          Add course
// @route         POST /api/v1/bootcamps/:bootcampId/course
// @access        Private
exports.addCourse = asyncHandle(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId;

    const bootcamp = await Bootcamp.findById(req.params.bootcampId);

    if (!bootcamp) {
        return next(
            new ErrorResponse(
                `No bootcamp with id of ${req.params.bootcampId}`
            ),
            404
        );
    }

    const course = await Course.create(req.body);

    res.status(200).json({
        success: true,
        data: course,
    });
});

// @desc          Update course
// @route         PUT /api/v1/courses/:id
// @access        Private
exports.updateCourse = asyncHandle(async (req, res, next) => {
    let course = await Course.findById(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`No course with id of ${req.params.id}`),
            404
        );
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: course,
    });
});

// @desc          Delete course
// @route         DELETE /api/v1/courses/:id
// @access        Private
exports.deleteCourse = asyncHandle(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
        return next(
            new ErrorResponse(`No course with id of ${req.params.id}`),
            404
        );
    }

    res.status(200).json({
        success: true,
    });
});
