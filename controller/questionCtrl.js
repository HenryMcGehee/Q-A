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