// this is Crowdy's app.js file
// 10/11/18
var app = angular.module('directoryApp', []);

app.run(function ($rootScope) {
    $rootScope.$on('scope.stored', function (event, data) {
        console.log("scope.stored", data);
    });
});

app.controller('MovieController', function ($scope, Scopes) {

    $scope.movies = undefined;
    $scope.codec = undefined;
    $scope.verify = "hello";

    Scopes.store('MovieController', $scope);
    /* Get all the listings, then bind it to the scope */
    Movies.getAll().then(function(response) {
      $scope.movies = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.getMoviesFromTheater = function (theater_id){
        if (theater_id == null) {
          theater_id = Scopes.get('TheaterController').currentTheaterId;
        }
        $scope.movies = Movies.getAllMoviesFromTheater(theater_id)
    };

    $scope.detailedInfo = function (index) {
      var movie = $scope.listings[index];
      //TODO
    };

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
});

app.controller('TheaterController', function ($scope, Scopes) {

    Scopes.store('TheaterController', $scope);
    $scope.currentTheaterId = 42490;

});

app.controller('UserController', function ($scope, Scopes) {

    Scopes.store('UserController', $scope);
    /* Get all the listings, then bind it to the scope */
    $scope.verify = "hello";
    $scope.inputEmail = "";
    $scope.inputPassword = "";

    //Check if the input and code or name of the building matches
    $scope.valid = function () {
      if($scope.inputEmail == "user@test.com") {
        location.replace("./crowdy.hmtl");
      }
    };

});

app.factory('Scopes', function ($rootScope) {
    var mem = {};

    return {
        store: function (key, value) {
            $rootScope.$emit('scope.stored', key);
            mem[key] = value;
        },
        get: function (key) {
            return mem[key];
        }
    };
});


$scope.redirect = function(){
  window.location = "crowdy2.html";
}
