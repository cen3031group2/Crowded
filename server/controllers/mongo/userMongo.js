var User = require('../../models/listings.server.model.js');

exports.getGenres = function(req, res){

};

exports.getHistory = function(req, res){

};

exports.checkPassword = function(req, res){

};

exports.setPassword = function(req, res){

};

exports.setEmail = function(req, res){

};

exports.setGenres = function(req, res){

};

exports.getCompany = function(req, res){

};

exports.setCompany = function(req, res){

};

exports.clearHistory = function(req, res){
    var username;


};

exports.create = function(req, res){
    var user = new User(req.body);

    user.save(function(err){
        if(err){
            console.log(err);
            res.status(404).send(err);
        } else {
            res.json(user);
        }
    });
};
