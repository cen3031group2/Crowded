// theater model js file
// for schema or necessary modelling
// 10/11/18

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var movieSchema = new Schema({
  id : {
    type: Number,
    required: true
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true,
    unique: true
  },
  company: {
    type: String,
    required: true
  },
  crowdy_lvl_public: {
    type: Number
  },
  crowdy_lvl_employee: {
    type: Number,
    required: true
  },
  movies: {
    type: Array
  }
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
var Theaters = mongoose.model('Theaters', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Theaters;
