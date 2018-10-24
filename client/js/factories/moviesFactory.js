angular.module('movies').factory('Movies', function() {
  var moviesEntries = {
    entries : [
      {
        "id" : 0,
        "name" : "Jaws",
        "genre" : "Horror",
        "ratings" : 1
      },
      {
        "id" : 1,
        "name" : "Crazy Rich Asians",
        "genre" : "Comedy",
        "ratings" : 5
      }
    ]
  };
  return moviesEntries.entries;
});
