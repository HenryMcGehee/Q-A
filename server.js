const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Set Engine
app.set('view engine', 'ejs');
//------------Routers-------------//

app.get('/', (req, res) => {
	res.render('index');
})

//-------------Server Listener------//

app.listen(PORT, () => console.log(`Server running of port ${PORT}`));