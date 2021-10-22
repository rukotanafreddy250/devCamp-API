const errorHandler = require('../middlewares/errorHandler');
const Idea = require('../models/Ideas');
const Course = require('../models/Course');
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { QueryCursor } = require('mongoose');

exports.getCourses = asyncHandler( async (req, res, next) => {
    let query;

    if(req.params.bootcampId) {
        query = Course.find( { bootcamp: req.params.bootcampId } );
    }else {
        query = Course.find().populate({
            path: 'courses',
            select: 'title description'
        });
    }

    const courses = await query;
    console.log(courses.length);
    console.log(courses);

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    })
});