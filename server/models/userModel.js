// theater model js file
// for schema or necessary modelling
// 10/11/18

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var userSchema = new Schema({
  id : {
    type: Number,
    required: true
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  genres: {
    type: String
  },
  history: [
    movie: {type: Schema.Types.Mixed},
    theater: {type: Schema.Types.Mixed}
  ],
  preferredMovies: [
    movie: {type: Schema.Types.Mixed},
    theater: {type: Schema.Types.Mixed}
  ],
  password: {
    type: Number,
    required: true
  },
  isEmployee: {
    type: Boolean
  },
  email: {
    type: String
    required: true
  }
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
userSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Users = mongoose.model('Users', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Users;
