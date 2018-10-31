angular.module('movies').factory('Movies', function() {
  var moviesEntries = {
    entries : [
      {
        "id" : 0,
        "name" : "Jaws",
        "genre" : "Horror",
        "ratings" : 1,
        "showtimes" : {
          "0" : 1500,
          "1" : 1700
        }
      },
      {
        "id" : 1,
        "name" : "Crazy Rich Asians",
        "genre" : "Comedy",
        "ratings" : 5,
        "showtimes" : {
          "0" : 1500,
          "1" : 1700
        }
      }
    ]
  };
  return moviesEntries.entries;
});
