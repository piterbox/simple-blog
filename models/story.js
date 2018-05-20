const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
	
	title: {
		type: String,
	},
	body: {
		type: String,
	},
	status: {
		type: String,
		default: 'public'
	},
	allowComments: {
		type: Boolean,
		default: false
	},
	comments:[{
		commentBody:{
			type: String,
			required: true
		},
		commentDate:{
			type: Date,
			default: Date.now
		},
		commentUser:{
			type: Schema.Types.ObjectId,
			ref: 'users'
		}
	}],
	user:{
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	date:{
		type: Date,
		default: Date.now
	}
});

mongoose.model('stories', StorySchema, 'stories');