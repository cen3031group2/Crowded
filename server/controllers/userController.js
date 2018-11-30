var User = require('../models/userModel'),
    config = require('../config/config');


exports.getUser = async function(req, res){
    res.json(req.user);
    // const query = {username: req.user.username};
    // var user = await User.findOne(query).exec();
    // if(user){
    //     user.password = '';
    // }
    // res.json(user);
};

exports.getUserByName = async function(req, res){
    const query = {username: req.username};
    
    console.log(req.username);
    var user = await User.findOne(query).exec();
    if(user){
        user.password = '';
    }
    res.json(user);
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
    User.findOneAndUpdate(query, req.body).exec();
    res.end();
}

exports.addHistory = function(user, movie, theater){
    console.log("adding history");
}

exports.toUsername = function(req, res, next, username){
    req.username = username;
    next();
};
