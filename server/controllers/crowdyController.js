var Crowdy = require("../models/crowdyModel");
var User = require("./userController");
const Public = Crowdy.Public,
    Employee = Crowdy.Employee;

const expectedPackage = {
    movie: '',
    theater: '',
    value: 0,
}
exports.addReport = async function(req, res){
    user = req.user;
    if(user){
        exports.addPublicReport(req, res);
    } else{
        //res.send("User is not logged in.");
        res.end();
        return;
    }
}

exports.addPublicReport = async function(req,res){
    const movie_id = req.body.movie;
    const theater_id = req.body.theater;
    User.addHistory(user, req.body.movie, req.body.theater);
    const value = req.body.value;
    const id = 't' + theater_id + 'm' + movie_id;

    addTheaterReport(theater_id, value);

    var query = {id: id};
    Public.findOne(query)
        .exec()
        .then(function(crowdy){
            if(crowdy){
                crowdy.num_reports += 1;
                crowdy.sum += value;
                crowdy.save();
            } else{
                crowdy = new Public();
                crowdy.id = id;
                crowdy.num_reports = 1;
                crowdy.sum = value;
                crowdy.save();
            }
        }).catch(function(err){
            console.log(err);
        });
    res.end();
};

exports.setEmployeeReport = function(req,res){
    const theater_id = req.body.theater;
    const value = req.body.value;
    var query = {id: theater_id};

    Employee.findOne(query).exec()
        .then(function(crowdy){
            if(crowdy){
                crowdy.value = value;
                crowdy.save();
            } else{
                crowdy = new Employee();
                crowdy.id = theater_id;
                crowdy.value = value;
                crowdy.save();
            }
        }).catch(function(err){
            console.log(err);
        });
    res.end();
};

exports.getMovieReport = async function(movie){
    const id = 't' + movie.theater + 'm' + movie.id;
    var query = {
        id: id
    }
    const result = await Public.findOne(query).exec();
    if(result){
        return result;
    } else{
        return createPublicReport(id)
    }
}

exports.getTheatherReport = async function(crowdy_id){
    var query = {
        id: crowdy_id
    }
    var result = {
        id: crowdy_id
    };

    const public  = await Public.findOne(query).exec();
    if(public){
        result.public = public.avg;
    } else{
        result.public = createPublicReport(crowdy_id).avg;
    }

    const employee  = await Employee.findOne(query).exec();
    if(employee){
        result.employee = employee.value;
    } else{
        result.employee = createEmployeeReport(crowdy_id).value;
    }

    return result;

}


createEmployeeReport = function(id){
    var report = new Employee();
    report.id = id;
    report.value = 0;
    const result = report.save();
    return report;
};

createPublicReport = async function(id){
    var report = new Public();
    report.id = id;
    report.num_reports = 0;
    report.sum = 0;
    return await report.save();
};


async function addTheaterReport(theater_id, report){
    const query = {
        id: 't' + theater_id
    }
    var crowdy = await Public.findOne(query).exec();
    if(crowdy){
        crowdy.sum += report;
        crowdy.num_reports += 1;
        crowdy.save();
    } else {
        crowdy = new Public();
        crowdy.id = 't' + theater_id;
        crowdy.num_reports = 1;
        crowdy.sum = report;
        crowdy.save();
    }
}

exports.toId = function(req, res, next, id){
    req.id = id;
    next();
};
