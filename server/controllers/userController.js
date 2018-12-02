var User = require('../models/userModel'),
    config = require('../config/config');
const Movie = require('./movieController'),
    Theater = require('./theaterController');
var Promise = require('bluebird');


exports.getUser = async function(req, res){
    res.json(req.user);
    // const query = {username: req.user.username};
    // var user = await User.findOne(query).exec();
    // if(user){
    //     user.password = '';
    // }
    // res.json(user);
};

exports.getUserByName = async function(req, res){
    const query = {username: req.username};

    console.log(req.username);
    var user = await User.findOne(query).exec();
    if(user){
        user.password = '';
    }
    res.json(user);
};

exports.setGenre = async function(req, res){
  var user = req.user;
  const genre = req.body.genre;
  console.log(req.body);
  console.log("Adding genre: " + genre + " to user: " + user.username);
    const query = {username: user.username};

    var newUser = await User.findById(user._id).exec();
    console.log(newUser);
    if(newUser){
      if(!newUser.genre){
        newUser.genre = [];
      }
      console.log(genre);
        newUser.genre.push(genre);
        newUser.save(function(err){
          console.log("Mongoose save err:" + err);
        });
        req.login(newUser, function(err){
          console.log("Passport login err:" + err);
        })
    }
    res.json(newUser);
};

exports.createUser = async function(req, res){
    const query = {username: req.body.username};
    const result = await User.findOne(query);
    if(result){
        res.json({
            created: false,
            msg: 'Username already taken.'
        });
    } else {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        const website = user.username.split("@")[1];
        const website_name = website.split(".")[0];
        console.log(website_name);
        if (website_name in config.companies) {
            user.employee_company = website_name;
        } else {
            user.employee_company = undefined;
        }
        user.save();
        res.json({
            created: true
        });
    }
};

exports.saveUser = function(req, res){
    const query = {
        username: req.body.username
    }
    User.findOneAndUpdate(query, req.body).exec();
    res.end();
}

exports.addHistory = async function(user, movie_id, theater_id){
    var newUser = User.findById(user._id);
    var theater = Theater.getTheaterById(theater_id);
    var movies = Movie.getMovieFromId(movie_id);
    var result = await Promise.all([theater, movies, newUser]);
    console.log(result);
    var newUser = result[2];
    var movie = result[1].movies[0];;
    var theater = result[0];
    const payload = {
        title: movie.title,
        theater: theater.name,
        poster_image_thumbnail: movie.poster_image_thumbnail,
        rating: movie.rating,
        genre: movie.genre,
    };
    if(newUser.history){
        newUser.history.push(payload);
    } else{
        newUser.history = []
        newUser.history.push(payload);
    }
    console.log(newUser);
    newUser.save();

}

exports.toUsername = function(req, res, next, username){
    req.username = username;
    next();
};
