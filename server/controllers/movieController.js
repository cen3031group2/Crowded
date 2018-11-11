// crowdy's server controller js file
// manipulates database using queries
// 10/11/18
const request = require('request');
var rp = require('request-promise');
const config = require('../config/config');
const crowdy = require('./crowdyController');

const MovieFormat = {
    id: 0,
    title: '',
    genres: ['',],
    ratings: {
        imdb: 0,
        tmdb: 0
    },
    poster_image_thumbnail: '',
    showtimes: [{hour: 0, minute:0}],
    crowdy:{
        id: '',
        value: 0
    }
};

var movieOptions ={
    uri: 'https://api.internationalshowtimes.com/v4/movies/',
    method: 'GET',
    json: true,
    headers: {
        "X-API-Key": config.internationalshowtimes.key
    },
    qs: {
        cinema_id:0,
        fields: "id,title,poster_image_thumbnail,genres,ratings",
    }
};

var showtimeOptions = {
    uri: 'https://api.internationalshowtimes.com/v4/showtimes/',
    method: 'GET',
    json: true,
    headers: {
        "X-API-Key": config.internationalshowtimes.key
    },
    qs: {
        movie_id:0,
        cinema_id:0,
        fields: "start_at",
        limit:5
    }
};

exports.getAllMoviesFromTheater = async function(req,res){
    var theater_id = req.body.id;
    movieOptions.qs.cinema_id = theater_id;
    request(movieOptions, function(error, response, body){
        if(error){
            console.log(error);
        }
        var newMovies = [];
        movies = body.movies;
        movies.forEach(movie => {
            
            var newMovie = {};
            newMovie.title = movie.title;
            newMovie.id = movie.id;
            if(movie.poster_image_thumbnail){
                newMovie.poster_image_thumbnail = movie.poster_image_thumbnail;
            }
            
            newMovie.genres = [];
            movie.genres.forEach(genre =>{
                newMovie.genres.push(genre.name);
            });
            newMovies.push(newMovie);
        });
        
        addShowtimes(newMovies, theater_id, res);
    });
};

async function addShowtimes(movies, theater_id, res){
    showtimeOptions.qs.cinema_id = theater_id;
    movies.forEach(movie =>{
        
        movie.showtimes = [];
        showtimeOptions.qs.movie_id = movie.id;
        var done = false;
        let response = rp(showtimeOptions);
        response.then(response => {
            var body = response.body;
            response.body.showtimes.forEach(showtime =>{
                var time = new Date(showtime.start_at);
                var newTime = {
                    hour: time.getHours(),
                    minute: time.getMinutes(),
                }
                
                movie.showtimes.push(newTime)
            });
        });
    });
    addCrowdy(movies, theater_id, res)
}

async function addCrowdy(movies, theater_id, res){
    movies.forEach(movie =>{
        movie.crowdy.id = 't' + theater_id + 'm' + movie.id;
        movie.crowdy.value = crowdy.getPublicReport(movie.crowdy.id).avg;
    });
    res.json(movies);
}