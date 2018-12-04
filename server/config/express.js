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
    cors = require('cors'),
    passport = require('passport'),
    User = require('../models/userModel'),
    LocalStrategy = require('passport-local').Strategy,
    session = require("express-session");
var multer  = require('multer')
var upload = multer({ dest: './uploads/' })

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
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", express.static('client'));

app.post('/avatar_image', upload.single('file'), function(req, res, next){
  const user = req.user;
  if(user){
    userRouter.addAvatarImage(req, res, next);
  } else{
    res.send("Not logged in");
  }
});

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(user);
    if (err) { return next(err); }
    if (!user) { return res.send('/loginForm.html'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send('/');
    });
  })(req, res, next);
});
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
app.use('/api/user', userRouter);
app.use('/api/theater', theaterRouter);
app.use('/api/movie', movieRouter);
app.use('/api/crowdy', crowdyRouter);

app.get('/', function (req, res, next) {
  res.redirect('/crowdy.html');
});

return app;

};


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!(user.password === password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done){
  done(null, user.username);
});

passport.deserializeUser(async function(username, done){
  const query = {username: username}
  User.findOne(query, function(err, user){
    done(err, user);
  });
  
})
