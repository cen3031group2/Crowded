var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema({
    id:  Number,
    value: Number
});

var Employee = mongoose.model("CrowdyEmployee", employeeSchema);
module.exports = Employee;