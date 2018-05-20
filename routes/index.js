const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Story = mongoose.model('stories');

const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res)=>{
	res.render('index/wellcome');
});

router.get('/dashboard', ensureAuthenticated, (req, res)=>{
	Story.find({
		user: req.user.id
	})
	.then((stories) =>{
		res.render('index/dashboard', {
			stories: stories
		});
	})
	
});

router.get('/about', (req, res)=>{
	res.render('index/about');
});


module.exports = router;