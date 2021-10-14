const errorHandler = require('../middlewares/errorHandler');
const idea = require('../models/Ideas');
const errorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
const { QueryCursor } = require('mongoose');


exports.getIndexHome = (req, res) => {
    res.status(200).json({
        success: true,
        data: "Hello Controllers..."
    })
}


exports.PostIdea = async (req, res, next) => {
    try {
        const vidjot = await idea.create(req.body);
        res.status(200).json({
            success: true,
            data: req.body
        })
    }catch(err) {
        console.log(err + " server error");
        next(err);
    }
}


exports.getSingleIdea = asyncHandler(async (req, res, next) => {
    // try{
        const vidjot = await idea.findById( req.params.id );

        if(!vidjot) {
            return next(
                new errorResponse(`No vidjot Idea with such id ${req.params.id}`, 404)
            );
        }

        res.status(200).json({
            success: true,
            data: vidjot
        })
    // }catch(err) {
    //     next(err);
    // }     
}); 


exports.getAllIdeas = asyncHandler(async (req, res) => {
    // try{
        let query;
        console.log(req.query);
        // copy req.query
        const reqQuery = { ...req.query }

        // remove fields to exclude
        const removeFields = ['select'];

        // loop over removeFields and delete them from req.query
        removeFields.forEach(param => delete reqQuery[param]);

        // create query string
        let queryStr = JSON.stringify(req.query);

        // create operators($gt, $gt, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

        console.log(queryStr);
        query = idea.find(JSON.parse(queryStr));
        
        // select field 
        if(req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            console.log(fields);
            query = query.select(fields); 
        }

 
        const allIdeas = await query
        if(allIdeas === ""){
            return next(new errorResponse(`No Ideas Yet....`, 200));
        }
        res.status(200).json({
            success: true,
            data: allIdeas
        });
    // }catch(err) {
        // console.log(err+' No Ideas Yet....');
        // next(new errorResponse(`No Ideas Yet....`, 200));
    // }
})

exports.putEditIdeas = asyncHandler(async (req, res) => {
    // try{
        const allIdeas = await idea.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators: true, useFindAndModify: false})
        res.status(200).json({
            success: true,
            data: allIdeas
        });
    // }catch(err) {
    //     next(err);
    // }
});

exports.deleteIdea = asyncHandler(async(req, res, next) => { 
    // try{
        const deletingVidjot = await idea.findByIdAndDelete(req.params.id);
        if(!deletingVidjot) {
            return next(
                new errorResponse(`No such idea for deletion`, 404)
            );
        }
        res.status(200).send('Ideas removed');
    // }catch(err) {
    //     next(err);  
    // }
});