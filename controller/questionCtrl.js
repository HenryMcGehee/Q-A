const express = require('express');
const db = require('../models');
const router = express.Router();


router.get('/', (req, res) =>{
    db.Question.find({}, (err, allQuestions) => {
        if (err) return console.log(err);
        
        res.render('questions/index', {
            questions: allQuestions,
        });
    });
});

module.exports = router;

// Create new Question
router.get('questions/new', (req, res) => {
	res.render('questions/new')
});


// router.post('/new', (req, res) => {
// 	db.Question.create(req.body, (err, neqQuestion) => {
// 		if (err) return console.log(err)

// 		console.log(neqQuestion);
		

// 	})
// })

