var User = require('../models/userModel'),
    config = require('../config/config');

exports.getGenres = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    User.findOne(query, function (err, user){
        if(err){
            console.log(err);
        }
        if(user){
            res.json(user.genre);
        }
    });
};

exports.getHistory = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    User.findOne(query, function (err, user){
        if(err){
            console.log(err);
        }
        if(user){
            res.json(user.history);
        }
    });
};

exports.checkPassword = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    var password = req.body.password;
    User.findOne(query, function (err, user){
        if(err){
            console.log(err);
        }
        if(user){
            if(user.password === password){
                res.json({valid:'true'});
            } else
                res.json({valid:'false'});

        }
    });
};

exports.setPassword = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    var password = req.body.password;
    User.findOneAndUpdate(query, {password: password}, function (err){
        if(err){
            console.log(err);
        }
    });
};

exports.setEmail = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    var email = req.body.email;
    User.findOneAndUpdate(query, {email: email}, function (err){
        if(err){
            console.log(err);
        }
    });
};

exports.setGenres = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    var genres = req.body.genre;
    User.findOneAndUpdate(query, {genre: genres}, function (err){
        if(err){
            console.log(err);
        }
    });
};

exports.getCompany = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    User.findOne(query, function (err, user){
        if(err){
            console.log(err);
        }
        if(user){
            res.json({company: user.employee_company});
        }
    });
};

exports.getUser = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    User.findOne(query, function (err, user){
        if(err){
            console.log(err);
        }
        if(user){
            user.password = "";
            res.json(user);
        }
    });
};

exports.setCompany = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    var company = req.body.company;
    User.findOneAndUpdate(query, {employee_company: company}, function (err){
        if(err){
            console.log(err);
        }
    });
};

exports.addHistory = function(req,res){
    var newItem = req.body.newItem;
    var username = req.body.username;
    var query = {username: username};
    User.findOneAndUpdate(query, function (err,user){
        if(err){
            console.log(err);
        }
        if(user){
            user.history.push(newItem);
            user.save();
        }
    });
};

exports.clearHistory = function(req, res){
    var username = req.body.username;
    var query = {username: username};
    User.findOneAndUpdate(query, {history: []}, function (err){
        if(err){
            console.log(err);
        }
    });
};

exports.create = function(req, res){
    console.log(req.body);
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    const website = user.username.split("@")[1];
    const website_name = website.split(".")[0];
    if (website_name in config.companies) {
        user.isEmployee = true;
        user.employee_company = website_name;
    } else {
        user.isEmployee = false;
    }
    user.save(function(err){
        if(err){
            console.log(err);
            res.status(404).send(err);
        } else {
            res.json(user);
        }
    });
};
