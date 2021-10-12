const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');


const errorHandler = require('./middlewares/errorHandler');

// load env vars
dotenv.config({ path: './configures/config.env'});


const app = express();


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const errorhandle = require("./middlewares/errorHandler");


const Dbconnection = require('./config/connectDB');
const router = require('./routes/vidjotRoutes');
const idealModel = require('./models/Ideas');



app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));



app.use(router);
app.use(errorHandler);

app.use("", (req, res) => {
    res.send("Page Not Found");
    console.log('Page Not Found');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`.yellow.bold);
});