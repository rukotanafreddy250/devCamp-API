const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/mongoDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then( () => console.log('DB Connected...'.cyan.underline.bold))
    .catch( err => console.log(`Error Connected To DB '+' ${err.stack}`.red.bold));

module.exports = mongoose;    