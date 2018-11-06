const request = require('request');
const config = require("../server/config/config");
const Theater = require ("../server/models/theaterModel");
const mongoose = require('mongoose');

var db = mongoose.connect(config.db.uri, { useMongoClient: true })

const options = {
    uri: 'https://api.internationalshowtimes.com/v4/cinemas/',
    method: 'GET',
    json: true,
    headers: {
        "X-API-Key": config.internationalshowtimes.key
    },
    qs: {
        city_ids:22777
    }
};

function callback(error, response, body) {
    if(error){
        console.log(error);
    }
    var i = 0;
    body.cinemas.forEach(element => {
        i++;
        console.log(element);
        var theater = new Theater();
        theater = Object.assign(theater, element);
        theater.crowdy = i;
        theater.company = 'regmovies'
        theater.save(function(err){
            if(err){
                console.log(err);
            }
        });
    });

}

request(options, callback);