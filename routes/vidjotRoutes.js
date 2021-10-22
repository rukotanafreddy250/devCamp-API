const express = require('express');
const router = express.Router();

// const {getIndexHome, PostIdea, getAllIdeas, putEditIdeas ,deleteIdea} = require('../controllers/vidjotControllers');

const {getIndexHome, PostIdea, getAllIdeas, getSingleIdea,putEditIdeas ,deleteIdea} = require('../controllers/vidjotMongoController');


// include other resources Router
const courseRouter = require('./courseRouter');

router.use('/:id/courses', courseRouter);


router.get('/', getAllIdeas);
router.get('/:id', getSingleIdea);
router.post('/', PostIdea);
router.put('/:id', putEditIdeas);
router.delete('/:id', deleteIdea);


module.exports = router;