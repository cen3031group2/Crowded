var mongoose = require('mongoose'),
    Theater = require('../models/theaterModel.js'),
    crowdy = require('./crowdyController');

exports.getAllTheaters = function(req, res){
    Theater.find({}, function(err, theaters){
        theaters.forEach(theater => {
            const crowdy_id = theater.crowdy;
            theater.crowdy = {};
            theater.crowdy.id = crowdy_id;
            theater.crowdy.public = crowdy.getPublicReport(crowdy_id);
            theater.crowdy.employee = crowdy.getEmployeeReport(crowdy_id);
        });
        res.json(theaters);
    })
}

exports.getTheater = function(req, res){
    var id = req.body.id;
    var query = {
        id: id
    }
    Theater.findOne(query, function(err, theater){
        const crowdy_id = theater.crowdy;
        theater.crowdy = {};
        theater.crowdy.id = crowdy_id;
        theater.crowdy.public = crowdy.getPublicReport(crowdy_id);
        theater.crowdy.employee = crowdy.getEmployeeReport(crowdy_id);
        res.json(theater);
    })
}