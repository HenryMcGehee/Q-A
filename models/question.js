const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        require: true,
    },
}, {timestamps: true});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;