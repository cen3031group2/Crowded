var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    id:  String,
    value: Number
});

var Employee = mongoose.model("CrowdyEmployee", employeeSchema);
module.exports.Employee = Employee;

var publicSchema = new Schema({
    id:  String,
    num_reports: Number,
    sum: Number,
    last_update: Date
});

var Public = mongoose.model("CrowdyPublic", publicSchema);
module.exports.Public = Public;