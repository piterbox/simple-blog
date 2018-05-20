const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');

//load models
require('./models/User');
require('./models/Story');

//pasport
require('./config/passport')(passport);

//routes
const index = require('./routes/index');
const auth = require('./routes/auth');
const stories = require('./routes/stories');

//get keys 
const keys = require('./config/keys');

//handlebars helpers
const {
	truncate,
	stripTags,
	formatDate,
	select,
	editIcon
} = require('./helpers/hbs');

//global Promise
mongoose.Promise = global.Promise;

//mongoose connect
mongoose.connect(keys.mongoURI)
.then(() => console.log('MongoDB start'))
.catch((err) => console.log(err));

const app = express();

//handlebars middleware
app.engine('handlebars', exphbs({
	helpers: {
		truncate: truncate,
		stripTags: stripTags,
		formatDate: formatDate,
		select: select,
		editIcon: editIcon
	},
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body-parser middleware
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

//method override middleware
app.use(methodOverride('_method'));


//cookie middleware
app.use(cookieParser());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: false
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars 
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Start application on port: ${port}`);
});
