var path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    userRouter = require('../routes/userRouter'),
    crowdyRouter = require('../routes/crowdyRouter'),
    theaterRouter = require('../routes/theaterRouter'),
    movieRouter = require('../routes/movieRouter'),
    cors = require('cors');

module.exports.init = function() {
//connect to database
var db = mongoose.connect(config.db.uri, { useMongoClient: true })
mongoose.Promise = require('bluebird');

//initialize app
var app = express();

//enable request logging for development debugging
app.use(morgan('dev'));
app.use(cors());

//body parsing middleware
app.use(bodyParser.json());

app.use("/", express.static('client'));

//TODO
app.use('/api/user', userRouter);
app.use('/api/theater', theaterRouter);
app.use('/api/movie', movieRouter);
app.use('/api/crowdy', crowdyRouter);

app.get('/', function (req, res, next) {
  res.redirect('~/crowdy.html');
});

return app;

};
