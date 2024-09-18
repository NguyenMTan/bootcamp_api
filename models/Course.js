const mongoose = require("mongoose");
const colors = require("colors");

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please add a course title"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    weeks: {
        type: Number,
        required: [true, "Please add number a weeks"],
    },
    tuition: {
        type: Number,
        required: [true, "Please add a tuition cost"],
    },
    minimumSkill: {
        type: String,
        required: [true, "Please add a minimum skill"],
        enum: ["beginner", "intermediate", "advanced"],
    },
    scholarshipAvailabel: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: "Bootcamp",
        required: true,
    },
});

// Static method to get  avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    const ojb = await this.aggregate([
        {
            $match: { bootcamp: bootcampId },
        },
        {
            $group: {
                _id: "$bootcamp",
                averageCost: { $avg: "$tuition" },
            },
        },
    ]);

    try {
        await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
            averageCost: Math.ceil(ojb[0].averageCost / 10) * 10,
        });
    } catch (error) {
        console.log(error);
    }
};

// Call getAverageCost after save
CourseSchema.post("save", function () {
    this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost before remove
// CourseSchema.pre("findOneAndDelete", function () {
//     this.constructor.getAverageCost(this.bootcamp);
// });
CourseSchema.pre("findOneAndDelete", async function (next) {
    const doc = await this.model.findOne(this.getQuery());
    if (doc) {
        await doc.constructor.getAverageCost(doc.bootcamp);
    }
    next();
});

module.exports = mongoose.model("Course", CourseSchema);
