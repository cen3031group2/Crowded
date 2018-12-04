var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    genre: [],
    history: [{
          title: String,
          theater: String,
          poster_image_thumbnail: String,
          rating: {
            imbd: Number
          },
          genre: [String],
        }
      ],
    employee_company: String
}, {
  usePushEach: true
});

var User = mongoose.model("User", userSchema);
module.exports = User;
