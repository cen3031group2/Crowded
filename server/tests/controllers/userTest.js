var assert = require('assert');
var user = require('../../controllers/userController');
var mongoose = require('mongoose'), 
 config = require('../../config/config');

mongoose.Promise = require('bluebird');
var db = mongoose.connect(config.db.uri, { useMongoClient: true });

describe('Users', function(){
    describe('create', function(){
        it('should create a user', function(){
            var username = 'Isaiah@gmail.com';
            var password = 'password';
            var req = {};
            req.body = {
                username: username,
                password: password
            };
            var res = {};
            res.json = function(user){
                console.log(user);
            };
            user.create(req,res);
            res.json = function(user){
                assert.equal(user.username, username);
            };
            user.getUser(req,res);
        })
    })
});