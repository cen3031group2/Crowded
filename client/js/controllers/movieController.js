angular.module('crowdy').controller('MovieController', ['$scope', 'Movies',
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Movies.getAll().then(function(response) {
      $scope.movies = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.getMoviesFromTheater = function (theater_id){
        $scope.movies = Movies.getAllMoviesFromTheater(theater_id)
    };

    $scope.detailedInfo = function (index) {
      var movie = $scope.listings[index];
      //TODO
    };

    $scope.movieListings = Movies;
    $scope.codec = undefined;
    $scope.verify = "hello";

    //Check if the input and code or name of the building matches
    $scope.valid = function (json) {
           if ($scope.codec == undefined) return true;
           return (json.name.toLowerCase().startsWith($scope.codec.toLowerCase()) ||
                   json.genre.toLowerCase().startsWith($scope.codec.toLowerCase()));
    };
   
    $scope.addMovies = function() {
      try {
        var newMovie =
          {
          "id" : $scope.newMovie.id,
          "name" : $scope.newMovie.name,
          "genre" : $scope.newMovie.genre,
          "ratings" : $scope.newMovie.ratings
          };
        $scope.movies.push(newMovie);
        Listings.create(newMovie);
      }
      catch (err) {
        console.log (err);
      }
    };

    $scope.deleteMovie = function(index) {
       try {
           var id = $scope.listings[index]._id;
           $scope.listings.splice(index, 1);
           Listings.delete(id);
           $route.reload();
       }
       catch (err) {
         console.log(err);
       }
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
