const express = require('express');
const Router = express.Router({ mergeParams: true });


const { getCourses } = require('../controllers/CourseController');

Router.route('/')
    .get(getCourses)

    Router.route('/')
    .delete(getCourses)


module.exports = Router;