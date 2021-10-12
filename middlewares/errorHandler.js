const errorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
    let error = { ...err }

    console.log({...err} );
    console.log(err.name.value + " err.name");
    console.log(err +" main error");


    error.message = err.message

    console.log(err.stack.red);

    // console.log(error );

    // this castError is for checking if id standard string nb is not above is correct
    if(err.name === 'CastError'){
        const message = `CastError NO vidjot  with such an id ${err.value}`;
        error = new errorResponse(message, 404);
    }

    // mongoose duplicate key
    if(err.code === 11000 ) {cle
        const message = `Duplicate field value entered`;
        error  = new errorResponse(message, 400);
    } 
    
    // mongoose errorValidator
    if(err.name  === "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message);
        error = new errorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server error'
    });
}

module.exports = errorHandler;