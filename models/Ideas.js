const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const ideaSchema = new Schema({
    title: {
        type: String,
        require: [true, "plz add a name"]
    },
    slug: String,
    details: { 
        type: String,
        require: [true, "plz add some details"],
    },
    date: {
        type: Date,
        require: Date.now,
    },
    number: {
        type: Number,
        require: [true, 'Plz add a number']
    },
    category:{
        type:String,
        require: [true, 'Plz add some category']
    },
    createdAt: {
        type: String,
        default: Date.now
    }
});

// cascade delete courses when a bootcamp is deleted
ideaSchema.pre('remove', async function (next) {
    console.log(`course being delete from ideas ${this._id}`);
    await this.model('Course').deleteMany({bootcamp: this._id});
    next();
});




ideaSchema.pre('save', function(next) {
    this.slug = slugify(this.title, {lower: true});
    // console.log('slugify ran', this.title);
    next();
});


module.exports = mongoose.model('ideal', ideaSchema);
