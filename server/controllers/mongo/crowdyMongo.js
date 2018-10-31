var Public = require("../../models/crowdyPublicModel"),
    Employee = require("../../models/crowdEmployeeModel");

exports.addPublicReport = function(req,res){
    var id = req.body.id;
    var report = req.body.value;
    var query = {id: username};
    Public.findOne(query, function (err, crowdy){
        if(err){
            console.log(err);
        }
        crowdy.num_reports += 1;
        crowdy.sum += report;
        crowdy.last_update = new Date();
    });
};

exports.getPublicReport = function(req,res){
    var id = req.body.id;
    var query = {id: id};
    Public.findOne(query, function (err, crowdy){
        if(err){
            console.log(err);
        }
        if(crowdy){
            const avg = crowdy.sum / crowdy.num_reports;
            res.json({value: avg});
        }
    });
};

exports.setEmployeeReport = function(req,res){
    var id = req.body.id;
    var value = req.body.value;
    var query = {id: id};
    Employee.findOneAndUpdate(query, {value: value}, function (err){
        if(err){
            console.log(err);
        }
    });
};

exports.getEmployeeReport = function(req,res){
    var id = req.body.id;
    var query = {id: id};
    Employee.findOne(query, function (err, crowdy){
        if(err){
            console.log(err);
        }
        if(crowdy){
            res.json({value: crowdy.value});
        }
    });
};

