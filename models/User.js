const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	googleID:{
		type: String,
		required: true
	},
	firstname: {
		type: String,
	},
	lastname: {
		type: String,
	},
	email:{
		type: String,
		required: true
	},
	image:{
		type: String
	},
	date:{
		type: Date,
		default: Date.now()
	}
});

mongoose.model('users', UserSchema);