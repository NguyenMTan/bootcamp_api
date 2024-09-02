const express = require("express");
const {
    getBootCamps,
    getBootCamp,
    createBootCamp,
    updateBootCamps,
    deleteBootCamps,
} = require("../controller/bootcamps");

// Include other recourse routers
const courseRouter = require("./courses");

const router = express.Router();

// Re-router into other recourse router
router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootCamps).post(createBootCamp);
router
    .route("/:id")
    .get(getBootCamp)
    .put(updateBootCamps)
    .delete(deleteBootCamps);

module.exports = router;
