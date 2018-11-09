var assert = require('assert');
var movie = require('../../controllers/movieController');
var mongoose = require('mongoose'), 
 config = require('../../config/config');


describe('Movies', function(){
    describe('getAllMoviesFromTheater', function(){
        it('should return movies', function(){
            var req = {};
            req.body = {
                id: 42490
            };
            var res = {};
            res.json = function(movies){
                console.log(movies[0].showtimes);
            };
            movie.getAllMoviesFromTheater(req,res);
        })
    })
});