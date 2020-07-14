const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/:id', (req, res) => {
    db.Answer.create(req.body, (err, newAnswer) => {
        if (err) return console.log(err)

        res.redirect('/questions/', req.params.id);
    });
});

module.exports = router;