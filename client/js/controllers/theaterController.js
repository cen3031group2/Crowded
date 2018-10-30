angular.module('crowdy').controller('TheaterController', ['$scope', 'Theaters',
  function($scope, Theaters) {

    $scope.theaterListings = Theaters;
    $scope.movieName = undefined;

    /* Get all the listings, then bind it to the scope */
    /*Movies.getAll().then(function(response) {
      $scope.movies = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = function (index) {
      var movie = $scope.listings[index];
      //TODO
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
    };*/
  }
]);
