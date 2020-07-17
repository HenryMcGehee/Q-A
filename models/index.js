const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/question-answer';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log('connected'))
    .catch((err) => console.log(`connection error ${err}`));


module.exports = {
    Question: require('./question'),
    Answer: require('./answer'),
    User: require('./user'),
}