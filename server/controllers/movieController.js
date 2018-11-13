// crowdy's server controller js file
// manipulates database using queries
// 10/11/18
const request = require('request');
var Promise = require('bluebird');
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
    crowdy: 0,
    theater: ''
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
    var theater_id = req.id;
    movieOptions.qs.cinema_id = theater_id;
    

    const result = await rp(movieOptions);
    
    const movies = result.movies;
    var promisesToFill = []
    var newMovies = [];
    movies.forEach(async function(movie){
        var newMovie = {};
        newMovie.title = movie.title;
        newMovie.id = movie.id;
        newMovie.theater = theater_id;
        if(movie.poster_image_thumbnail){
            newMovie.poster_image_thumbnail = movie.poster_image_thumbnail;
        }
        if(movie.rating){
            newMovie.rating = movie.rating;
        }
        promisesToFill.push(addShowtime(newMovie));
        //promisesToFill.push(addCrowdy(newMovie));
        newMovie.genres = [];
        movie.genres.forEach(genre =>{
            newMovie.genres.push(genre.name);
        });   
        newMovies.push(newMovie);
    });
    //addShowtimes(newMovies, theater_id, res);
    res.json(newMovies);
};

function addShowtime(movie){
    var showtimeOptions = {
        uri: 'https://api.internationalshowtimes.com/v4/showtimes/',
        method: 'GET',
        json: true,
        headers: {
            "X-API-Key": config.internationalshowtimes.key
        },
        qs: {
            movie_id: movie.id,
            cinema_id: movie.theater,
            fields: "start_at",
            limit:5
        }
    };
    
     rp(showtimeOptions).then(response => {
        const showtimes = response.showtimes;
        movie.showtimes = [];
        for(var i = 0; i < showtimes; i++){
            var time = new Date(showtimes[j].start_at);
            const hour = time.getHours();
            const minute = time.getMinutes();
            var newTime = {
                hour: (hour < 10 ? "0" + hour : "" + hour),
                minute: (minute < 10 ? "0" + minute : "" + minute)
            }  
            movie.showtimes.push(newTime)
        }
    });
}
// async function addShowtimes(movies, theater_id, res){
//     showtimeOptions.qs.cinema_id = theater_id;
//     for(var i = 0; i < movies.length; i++){
//         movies[i].showtimes = [];
//         showtimeOptions.qs.movie_id = movies[i].id;
//         const result = await rp(showtimeOptions)
//         const showtimes = result.showtimes;
//         for(var j = 0; j < showtimes.length; j++){
//             var time = new Date(showtimes[j].start_at);
//             const hour = time.getHours();
//             const minute = time.getMinutes();
//             var newTime = {
//                 hour: (hour < 10 ? "0" + hour : "" + hour),
//                 minute: (minute < 10 ? "0" + minute : "" + minute)
//             }  
//             movies[i].showtimes.push(newTime)
//         }
//     }
//     addCrowdy(movies, res);
// }

// async function addCrowdy(movies, res){
//     for (var i = 0; i < movies.length; i++){
//         var result = await crowdy.getMovieReport(movies[i]);
//         movies[i].crowdy = result.avg;
//     }
//     res.json(movies);
// }

exports.toId = function(req, res, next, id){
    req.id = id;
    next();
};