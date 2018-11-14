var User = require('../models/userModel'),
    config = require('../config/config');

exports.getGenres = async function(req, res){
    const query = {username: req.username};
    const user = await User.findOne(query).exec();
    if(user){
        const result = {
            genres: user.genres
        }
        res.json(result);
    } else{
        res.send(undefined);
    }
};

exports.getUser = async function(req, res){
    const query = {username: req.username};
    console.log("hello");
    console.log(req.username);
    var user = await User.findOne(query).exec();
    if(user){
        user.password = '';
    }
    res.json(user);
};

var expectedPackage = {
    username: '',
    pasword: ''
}
exports.checkPassword = async function(req, res){
    const query = {username: req.body.username};
    const password = req.body.password;
    var user = await User.findOne(query).exec();
    if(password === user.password){
        res.send(true);
    } else{
        res.send(false);
    }
};

exports.getCompany = async function(req, res){
    const query = {username: req.body.username};
    const user = await User.findOne(query).exec();
    if(user.employee_company){
        res.send(user.employee_company);
    } else {
        res.send(undefined);
    }
};

exports.createUser = async function(req, res){
    const query = {username: req.body.username};
    const result = await User.findOne(query);
    if(result){
        res.json({
            created: false,
            msg: 'Username already taken.'
        });
    } else {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        const website = user.username.split("@")[1];
        const website_name = website.split(".")[0];
        if (website_name in config.companies) {
            user.employee_company = website_name;
        } else {
            user.employee_company = undefined;
        }
        user.save();
        res.json({
            created: true
        });
    }
};

exports.saveUser = function(req, res){
    const query = {
        username: req.body.username
    }
    User.findOneAndUpdate(query, req.body,).exec();
    res.end();
}





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



exports.toUsername = function(req, res, next, username){
    req.username = username;
    next();
};
