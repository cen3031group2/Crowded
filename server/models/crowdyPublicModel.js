var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var publicSchema = new Schema({
    id:  Number,
    num_reports: Number,
    sum: Number,
    last_update: Date
});

var Public = mongoose.model("CrowdyPublic", publicSchema);
module.exports = Public;