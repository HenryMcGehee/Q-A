const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 4000;

require('dotenv').config();


const answerCtrl = require('./controller/answerCtrl');
const questionCtrl = require('./controller/questionCtrl');
const userCtrl = require('./controller/userCtrl');
	
// Set Engine
app.set('view engine', 'ejs');

// log in session
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24 * 7 * 2
	}
}));

app.use (methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(`${__dirname}/public`));



// ** Fix Trial 1 ** //

//------------Routers-------------//

app.get('/', (req, res) => {
	res.render('index');
})

app.use('/questions', questionCtrl);

app.use('/answers', answerCtrl);

app.use('/user', userCtrl);

//-------------Server Listener------//

app.listen(PORT, () => console.log(`Server running of port ${PORT}`));