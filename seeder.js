const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// load env variables
dotenv.config({ path: './configures/config.env'});

// load models 
const Ideal = require('./models/Ideas');

// connect to db 
const db = require('./config/connectDB');

// read JSON files 
const ideals = JSON.parse(fs.readFileSync(`${__dirname}/_data/ideals.json`, 'utf-8'));

// import into DB
const importData = async () => {
    try{
        await Ideal.create(ideals);
        console.log('Data Imported...'.green.inverse);
        process.exit(1);
    }catch(err) {
        console.error(err.message);
    }
}

const deleteData = async () => {
    try{
        await Ideal.deleteMany();
        console.log('Data Destroyed...'.red.inverse);
        process.exit(1);
    }catch(err) {
        console.error(err.message);
    }
}

if(process.argv[2] === '-i'){
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
