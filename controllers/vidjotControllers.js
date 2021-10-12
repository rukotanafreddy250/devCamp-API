const idea = require('../models/Ideas');


exports.getIndexHome = (req, res) => {
    res.send("hello Controllers...");
}


exports.PostIdea = (req, res) => {
    const newUser = {
        title: req.body.title,
        details: req.body.details,
    }
    new idea(newUser)
        .save()
        .then( idea => {
            res.send('idea saved '+ `${newUser.title}`);
        })
        .catch(err => {
            console.log('ideal not saved... ' + err.stack)
        });
}

exports.getAllIdeas = (req, res) => {
    idea.find()
        .sort({date:'desc'})
        .then(ideas => {
            res.status(200).send(ideas);
        })
}

exports.putEditIdeas = (req, res) => {
    const editIdeas = {
        title: req.params.title,
        details: req.params.details,
    }
    idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        idea.title = req.body.title;
        idea.details = req.body.details;

        idea.save()
        .then(idea => {
            res.send('Idea Updated');
            console.log('Idea Updated');
            console.log(idea);
        }).catch( (err) => console.err('Id not found'));
    });
}


exports.deleteIdea = (req, res) => {
    idea.findByIdAndDelete(req.params.id)
        .then(ideas => {
            res.status(200).send('Ideas removed');
        });
}