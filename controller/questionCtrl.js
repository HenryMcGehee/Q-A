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
        
        
// Show page
router.get('/:id', (req, res) => {
    db.Question.findById(req.params.id, (err, foundQuestion) => {
        if (err) console.log(err)

         res.render('questions/show', {
            questions: foundQuestion
         });
    });
});

router.get('/:id/edit', (req, res) => {
    db.Question.findById(req.params.id, (err, foundQuestion) => {
        if (err) return console.log(err);

        res.render('questions/edit', {
            questions: foundQuestion,
        });
    });
});

router.put('/:id', (req, res) => {
    db.Question.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, updatedQuestion) => {
            if(err) return console.log(err);

            res.redirect('/questions');
        }
        )
});


// Delete
router.delete('/:id', (req, res) => {
    db.Question.findByIdAndDelete(
        req.params.id, (err, deletedQuestion) => {
            if (err) return console.log(err)

            console.log(deletedQuestion)
            res.redirect('/questions')    
        })
})









module.exports = router;