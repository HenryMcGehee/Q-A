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


//------------Routers-------------//

app.get('/', (req, res) => {
	res.render('index');
})

app.use('/questions', questionCtrl);

//-------------Server Listener------//

app.listen(PORT, () => console.log(`Server running of port ${PORT}`));