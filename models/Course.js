const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseModel = new Schema({
    title: {
        type: String,
        trim: true,
        require: [true, "plz add Title"]
    },
    description: {
        type: String,
        require: [ true, 'plz add a description']
    },
    weeks: {
        type: String,
        require: [true, 'plz add number of weeks']
    },
    tuition: {
        type: String,
        require: [true, "plz add a cost"]
    },
    minimunSkill: {
        type: String,
        require: [true, "plz add a cost"],
        enum: ['beginner', 'intermediate', 'advanced']
    },
    scholarshipAvailable: { 
        type: Boolean,
        default: false
    },
    creatAt: {
        type: Date,
        dafault: Date.now
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Ideals',
        require: true
    }
})

module.exports = mongoose.model('course', CourseModel);