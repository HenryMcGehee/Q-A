const mongoose = require('mongoose');
const Answer = require('./answer');

const QuestionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        require: true,
    },
    answer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }]
}, {timestamps: true});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;