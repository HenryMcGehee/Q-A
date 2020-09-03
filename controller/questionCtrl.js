const express = require('express');
const db = require('../models');
const { User } = require('../models');

// const { Question } = require('../models');
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

    if (!req.session.currentUser) return res.redirect('/user/login');

    res.render('questions/new')
});


router.post('/', (req, res) => {
    if (!req.session.currentUser) return res.redirect('/login');

    db.Question.create(req.body, (err, newQuestion) => {
        if (err) return console.log(err)

        db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if (err) return console.log(err);
            
            foundUser.question.push(newQuestion);
            foundUser.save((err, savedUser) => {
                

                newQuestion.username = (foundUser);
                newQuestion.save((err, savedQuestion) => {

                    res.redirect('/questions');
                })
            })
        })

    });
});
        
        
// Show page
router.get('/:id', (req, res) => {
    if (!req.session.currentUser) return res.redirect('/user/login');
    db.User.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) return console.log(err);

        db.Question.findById(req.params.id)
        .populate({path: 'username'})
        .populate({path: 'answer', populate: {path: 'username'}})
        
        .exec((err, foundQuestion) => {
            if (err) return console.log(err);
    
            res.render('questions/show', {
                questions: foundQuestion,
                answer: foundQuestion.answer,
                user: foundUser,
            }); 
        });
    })
 });

router.post('/:id/answer/new', (req, res) => {
    db.Answer.create(req.body, (err, createdAnswer) => {
        if(err) return console.log(err);

        
        db.User.findById(req.session.currentUser._id, (err, foundUser) => {
            if (err) return console.log(err);
            
            foundUser.answer.push(createdAnswer);
            foundUser.save((err, savedUser) => {
                if (err) return console.log(err);
                
                db.Question.findById(req.params.id, (err, foundQuestion) => {
                        
                    
                    foundQuestion.answer.push(createdAnswer);
                    
                    foundQuestion.save((err, savedQuestion) => {
                        
                            createdAnswer.question = (foundQuestion);
                            createdAnswer.username = (foundUser);
                            createdAnswer.save((err, savedAnswer) => {
                                console.log(savedAnswer);
                                
                                res.redirect(`/questions/${req.params.id}`);
                            
                            })
                        })
                    })

                })

        })
    })
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

            res.redirect('/questions')    
        })
})









module.exports = router;