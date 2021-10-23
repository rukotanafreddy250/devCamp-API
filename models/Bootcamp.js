const mongoose = require('mongoose');
const slugify = require('slugify');
const Course = require('../models/Course');


const bootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can ']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'description can not be more than 500 characters']
    },
    website: {
        type: String,
        // match: [],
    },
    phone: {
        type: String,
        maxlength: [20, 'phone number can not be more than 20 characters']
    },
    email: {
        type: String,
        // match: [],
    },
    address: {
        type: String,
        required: [true, 'please add an address']
    },
    // careers: {
    //     // array of String
    //     type: [String],
    //     required: true,
    //     enum: [
    //         'Web development',
    //         'Mobile Development',
    //         'UI/UX',
    //         'Data Science',
    //         'Bussiness',
    //         'Other'
    //     ]
    // },
    // averageRating: {
    //     type: Number,
    //     min: [1, 'Rating must be at least 1'],
    //     max: [10, 'Rating must can not be more than 10 characters']
    // },
    // averageCost: Number,
    // photo: {
    //     type: String,
    //     default: 'no-photo.jpg',
    // },
    // housing: {
    //     type: Boolean,
    //     default: false
    // },
    // jobAssistance: {
    //     type: Boolean,
    //     default: false
    // },
    // jobGuarantee: {
    //     type: Boolean,
    //     default: false
    // },
    // acceptGi: {
    //     type: Boolean,
    //     default: false
    // },
    // location: {
    //     // gea json point 
    //     type: {
    //         type: String,
    //         enum: ['point'],
    //         require: true,
    //         index: '2dsphere',
    //     },
    //     formattedAddress: String,
    //     street: String,
    //     city: String,
    //     state: String,
    //     zipcode: String,
    //     country: String
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

bootcampSchema.pre('remove', async function (next) {
    console.log(`course being delete from ideas ${this._id}`);
    try{
        await this.model(Course).deleteMany({bootcamp: this._id});
        next();
    }catch (err) {
        console.error(err);
    }
}); 


module.exports = mongoose.model('bootcamp', bootcampSchema);