const express = require("express");
const {
    getBootCamps,
    getBootCamp,
    createBootCamp,
    updateBootCamps,
    deleteBootCamps,
    bootcampPhotoUpload,
} = require("../controller/bootcamps");

const Bootcamp = require("../models/Bootcamp");

const advancedResults = require("../middleware/advancedResults");

// Include other recourse routers
const courseRouter = require("./courses");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Re-router into other recourse router
router.use("/:bootcampId/courses", courseRouter);

router
    .route("/:id/photo")
    .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router
    .route("/")
    .get(advancedResults(Bootcamp, "courses"), getBootCamps)
    .post(protect, authorize("publisher", "admin"), createBootCamp);
router
    .route("/:id")
    .get(getBootCamp)
    .put(protect, authorize("publisher", "admin"), updateBootCamps)
    .delete(protect, authorize("publisher", "admin"), deleteBootCamps);

module.exports = router;
