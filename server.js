const express = require('express');

const app = express();


//------------Routers-------------//

app.get('/', (req, res) => {
	res.send('Q&A Project');
})

//-------------Server Listener------//

app.listen(4000, () => console.log('Server runnin on port 4000'));