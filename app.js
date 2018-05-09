const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get('', (req, res)=>{
	res.send('It works!');
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Start application on port: ${port}`);
});
