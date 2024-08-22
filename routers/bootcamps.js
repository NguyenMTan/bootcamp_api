const express = require("express");
const {
    getBootCamps,
    getBootCamp,
    createBootCamp,
    updateBootCamps,
    deleteBootCamps,
} = require("../controller/bootcamps");
const router = express.Router();

router.route("/").get(getBootCamps).post(createBootCamp);
router
    .route("/:id")
    .get(getBootCamp)
    .put(updateBootCamps)
    .delete(deleteBootCamps);

module.exports = router;
