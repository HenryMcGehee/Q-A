const express = require('express');
const db = require('../models');
const { Question } = require('../models');
const router = express.Router();


router.get('/', (req, res) =>{
    db.Question.find({}, (err, allQuestions) => {
        if (err) return console.log(err);
        
        res.render('questions/index', {
            questions: allQuestions,
        });
    });
});


// Create new Question
router.get('/new', (req, res) => {
    res.render('questions/new')
});


router.post('/', (req, res) => {
    db.Question.create(req.body, (err, newQuestion) => {
        if (err) return console.log(err)

        res.redirect('/questions');
    });
});
        
        















module.exports = router;