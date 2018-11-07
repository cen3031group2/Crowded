// theater model js file
// for schema or necessary modelling
// 10/11/18

/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/* Create your schema */
var theaterSchema = new Schema({
  id : {
    type: Number,
    required: true,
    unique: true
  },
  slug:{
    type: String
  },
  name: {
    type: String,
    required: true
  },
  chain_id:{
    type: String
  },
  telephone:{
    type: String
  },
  website:{
    type: String
  },
  location:{
    lat: Number,
    lon: Number,
    address:{
      display_text: String,
      street: String,
      house: String,
      zipcode: String,
      city: String,
      state: String,
      state_abbr: String,
      country: String,
      country_code: String
    }
  },
  booking_type: String,
  company: {
    type: String,
    required: true
  },
  crowdy: String,
  created_at: Date,
  updated_at: Date
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
theaterSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Theater = mongoose.model('Theaters', theaterSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Theater;
