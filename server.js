const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 4000;


const answerCtrl = require('./controller/answerCtrl');
const questionCtrl = require('./controller/questionCtrl');

// Set Engine
app.set('view engine', 'ejs');


app.use (methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`));


//------------Routers-------------//

app.get('/', (req, res) => {
	res.render('index');
})

app.use('/questions', questionCtrl);

app.use('/answers', answerCtrl);

//-------------Server Listener------//

app.listen(PORT, () => console.log(`Server running of port ${PORT}`));