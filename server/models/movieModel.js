// movie model js file
// for schema or necessary modelling
// 10/11/18

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var movieSchema = new Schema({
  id : {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
movieSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Movies = mongoose.model('Movies', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Movies;
