var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    userId:  Number,
    username: String,
    password: String,
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}],
    email: String,
    isEmployee: Boolean,
    employee_company: [{type: Schema.Types.ObjectId, ref: 'Company'}]
});

var User = mongoose.model("User", userSchema);
module.exports = User;

