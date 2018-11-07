// crowdy's server controller js file
// manipulates database using queries
// 10/11/18
const request = require('request');
const config = require('../config/config');

const MovieFormat = {
    id: 0,
    title: '',
    genres: ['',],
    ratings: {
        imdb: 0,
        tmdb: 0
    },
    poster_image_thumbnail: '',
    showtimes: [{hour: 0, minute:0}]
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
        fields: "id,start_at",
        limit: 5
    }
};

exports.getAllMoviesFromTheater = function(req,res){
    var theater_id = req.body.id;
    movieOptions.qs.cinema_id = theater_id;
    request(movieOptions, function(error, response, body){
        var newMovies;
        movies = body.movies;
        movies.array.forEach(movie => {
            var newMovie;
            newMovie.title = movie.title;
            newMovie.id = movie.id;
            newMovie.poster_image_thumbnail = movie.poster_image_thumbnail;
            newMovie.genres = [];
            movie.genres.forEach(genre =>{
                newMovie.genres.push(genre.name);
            });

            newMovie.showtimes = [];
            showtimeOptions.qs.cinema_id = theater_id;
            showtimeOptions.qs.movie_id = movie.id;
            request(showtimeOptions, function(s_error, s_response, s_body){
                s_body.showtimes.forEach(showtime => {
                    var time = new Date(showtime.start_at);
                    var newTime = {
                        hour: time.getHours(),
                        minute: time.getMinutes(),
                    }

                    newMovie.showtimes.push(newTime);
                });
            });

            newMovies.push(newMovie);
        });
        
        res.json(newMovies);
    });
};