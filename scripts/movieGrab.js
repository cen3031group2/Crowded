const request = require('request');
const config = require("../server/config/config");

const movies = {
    uri: 'https://api.internationalshowtimes.com/v4/movies/',
    method: 'GET',
    json: true,
    headers: {
        "X-API-Key": config.internationalshowtimes.key
    },
    qs: {
        cinema_id:42490,
        fields: "id,title,poster_image_thumbnail,genres,ratings",
    }
};

const showtimes = {
    uri: 'https://api.internationalshowtimes.com/v4/showtimes/',
    method: 'GET',
    json: true,
    headers: {
        "X-API-Key": config.internationalshowtimes.key
    },
    qs: {
        movie_id:40013,
        cinema_id:42490,
        fields: "id,cinema_id,start_at,cinema_movie_title,booking_link",
        limit: 10
    }
};

function callback(error, response, body) {
    if(error){
        console.log(error);
    }
    var i = 0;
    body.movies.forEach(movie => {
        console.log(movie);
    });

};

function scallback(error, response, body) {
    if(error){
        console.log(error);
    }
    var i = 0;
    var show = body.showtimes[1]
    console.log(show);
    var time = new Date(show.start_at);
    console.log(time.getHours());

};

//request(movies, callback);
request(showtimes, scallback);