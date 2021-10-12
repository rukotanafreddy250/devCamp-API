const express = require('express');
const router = express.Router();

// const {getIndexHome, PostIdea, getAllIdeas, putEditIdeas ,deleteIdea} = require('../controllers/vidjotControllers');

const {getIndexHome, PostIdea, getAllIdeas, getSingleIdea,putEditIdeas ,deleteIdea} = require('../controllers/vidjotMongoController');

router.get('/', getIndexHome);
router.get('/idea/:id', getSingleIdea);
router.post('/idea', PostIdea);
router.get('/ideas', getAllIdeas);
router.put('/ideas/:id', putEditIdeas);
router.delete('/ideas/:id', deleteIdea);


module.exports = router;