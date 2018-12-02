var mongoose = require('mongoose'),
    Theater = require('../models/theaterModel.js'),
    crowdy = require('./crowdyController');

exports.getAllTheaters = async function(req, res){
    const theaters = await Theater.find({}).exec();
    var newTheaters = [];

    for(var i = 0; i < theaters.length; i++){
        const values = await crowdy.getTheatherReport(theaters[i].crowdy);
        const result ={
            id: theaters[i].id,
            crowdy:values,
            name: theaters[i].name,
            website: theaters[i].website,
            telephone: theaters[i].telephone,
            location: theaters[i].location
        }
        newTheaters.push(result);
    }
    res.json(newTheaters);
}

exports.getTheaterById = async function(id){
    return Theater.findOne({id: id}).exec();
}

exports.getTheater = async function(req, res){
    var id = req.id;
    var query = {
        id: id
    }
    
    const theater = await Theater.findOne(query).exec();
    const values = await crowdy.getTheatherReport(theater.crowdy);
    
    const result ={
        id: theater.id,
        crowdy: values,
        name: theater.name,
        website: theater.website,
        telephone: theater.telephone,
        location: theater.location
    }
    res.json(result);
}

exports.toId = function(req, res, next, id){
    req.id = id;
    next();
};