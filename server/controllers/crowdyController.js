var crowdy = require("../models/crowdyModel");
const Public = crowdy.Public,
    Employee = crowdy.Employee;

exports.addPublicReport = function(req,res){
    var id = req.body.id;
    var report = req.body.value;
    var query = {id: id};
    Public.findOne(query, function (err, crowdy){
        if(err){
            console.log(err);
        }
        if(crowdy){
            crowdy.num_reports += 1;
            crowdy.sum += report;
            crowdy.save(err => {
                if(err){
                    console.log(err);
                }
            });
        } else{
            var product = createPublicReport(id);
            product.num_reports += 1;
            product.sum += report;
            product.save(err => {
                if(err){
                    console.log(err);
                }
            });
        }
    });
};

exports.getMovieReport = function(movie_id, theater_id){
    var id = 't' + theater_id + 'm' + movie_id;
    var query = {
        id: id
    }
    Public.findOne(query, function(err, report){
        if(err){
            console.log(err);
        } else{
            if(report){
                return report;
            } else{
                return createPublicReport(id);
            }
        }
    });
}

exports.getTheatherReport = function(crowdy_id){
    var query = {
        id: crowdy_id
    }
    Public.findOne(query, function(err, report){
        var result = {};
        result.id = crowdy_id;
        if(err){
            console.log(err);
        } else{
            if(report){
                result.public = report.avg;  
            }else{
                result.public = createPublicReport(crowdy_id).avg;
            }
            Employee.findOne(query, function(error, res){
                if(error){
                    console.log(error);
                } else{
                    if(res){
                        result.employee = res.value;
                    } else{
                        result.employee = createEmployeeReport(crowdy_id).value;
                    }
                }
                return result;
            })
        }
    })
}

exports.getPublicReport = function(req,res){
    var id = req.body.id;
    var query = {id: id};
    Public.findOne(query, function (err, crowdy){
        if(err){
            console.log(err);
        }
        if(crowdy){
            res.json(crowdy);
        } else{
            res.json(createPublicReport(id));
        }
    });
};

exports.setEmployeeReport = function(req,res){
    var id = req.body.id;
    var value = req.body.value;
    var query = {id: id};
    Employee.findOne(query, function (err, crowdy){
        if(err){
            console.log(err);
        }
        if(crowdy){
            crowdy.value = value;
        } else{
            var product = createPublicReport(id);
            product.num_reports += 1;
            product.sum += report;
            product.last_update = new Date();
            product.save(err => {
                if(err){
                    console.log(err);
                }
            });
        }
    });
};

createEmployeeReport = function(){
    var report = new Employee();
    report.id = id;
    report.value = 0;
    var newProduct;
    report.save(function(err, product){
        if(err){
            console.log(err);
        }
        newProduct =  product;
    });
    return newProduct;
};

createPublicReport = function(id){
    var report = new Public();
    report.id = id;
    report.num_reports = 0;
    report.sum = 0;
    report.last_update = new Date();
    var newProduct;
    report.save(function(err, product){
        if(err){
            console.log(err);
        }
        newProduct =  product;
    });
    return newProduct;
};

exports.getEmployeeReport = function(req,res){
    var id = req.body.id;
    var query = {id: id};
    Employee.findOne(query, function (err, crowdy){
        if(err){
            console.log(err);
        }
        if(crowdy){
            res.json(crowdy);
        } else {
            createEmployeeReport(id);
        }
    });
};

exports.toId = function(req, res, next, id){
    req.id = id;
    next();
};

