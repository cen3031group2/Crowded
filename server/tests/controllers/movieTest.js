var assert = require('assert');
var movie = require('../../controllers/movieController');
var mongoose = require('mongoose'), 
 config = require('../../config/config');

 var db = mongoose.connect(config.db.uri, { useMongoClient: true });
 mongoose.Promise = require('bluebird');
describe('Movies', function(){
    describe('getAllMoviesFromTheater', function(){
        it('should return movies', function(){
            var req = {};
            req.id = 42490;
            var res = {};
            res.json = function(movies){
                console.log(movies);
            };
            movie.getAllMoviesFromTheater(req,res);
        })
    })
});