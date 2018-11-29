// this is Crowdy's app.js file
// 10/11/18
const website = 'http://localhost:8080';
var app = angular.module('directoryApp', ['ngCookies']);

app.run(function ($rootScope) {
    $rootScope.$on('scope.stored', function (event, data) {
        console.log("scope.stored", data);
    });
});

app.controller('MovieController', ['$scope', '$http', function ($scope, $http) {

    $scope.movies = undefined;
    $scope.codec = undefined;
    $scope.verify = "hello"
    $scope.theaterId = 42490;
    //$scope.loading = undefined;

    // const movieFormat = {
    //   id: 0,
    //   title: '',
    //   theater: 0,
    //   poster_image_thumbnail: '',
    //   rating: {
    //     imbd: 0,
    //     tmbd: 0
    //   },
    //   genres = [''],
    //   showtimes = [{
    //     hour: 0,
    //     minute: 0
    //   }],
    //   crowdy: 0,
    // };

    $scope.setTheaterID = function (id) {
      $scope.theaterID = id;
    }

    //Change the movies depending on the theater selected
    $scope.changeListingsView = function (index) {
      $scope.theaterId = index;
    };

    $scope.addCrowdyMovieReport = function(value, movie_id, theater_id){
      const data = {
        value: value,
        movie: movie_id,
        theater: theater_id
      }
      $http.post('/api/crowdy/public/', data);
    }

    $scope.getMoviesFromTheater = async function (theater_id){
        if (theater_id == null || !theater_id) {
          theater_id = $scope.theaterId;
        }
        $http.get('/api/movie/getAllMoviesFromTheater/' + theater_id).then(function(response){
          $scope.movies = response.data;
          console.log($scope.movies);
        });
    };

    //Used to show only the movie names or genres corresponding to the search bar information
    $scope.valid = function (json) {
      if ($scope.codec == undefined) return true;
      if ($scope.codec == json) return true;
      else return false;
    };
}]);

app.controller('TheaterController', ['$scope', '$http', function ($scope, $http) {
  $scope.theaters = undefined;
  $scope.userIsValid = undefined;
  // const theaterFormat = {
  //   id: 0,
  //   crowdy: {
  //     id: '',
  //     public: 0,
  //     employee: 0
  //   },
  //   name: '',
  //   website: '',
  //   telephone: '',
  //   location: {}
  // }

  // Gets all the theaters in Gaineville and then adds it to scope.theaters, this function can be altered.
  $scope.getAllTheaters = function() {
    $http.get('/api/theater/getAllTheaters').then(function(response) {
        $scope.theaters = response.data;
    });
  }

  $scope.getTheater = function(theater_id){
    $scope.currentTheater = $http.get('/api/theater/getTheaters/' + theater_id);
  }
}]);


app.controller('UserController', ['$scope', '$http','$cookies', function($scope, $http, $cookies){
  $scope.getUser = function(){
    console.log("starting user request");
    $http.get('/api/user/').then(response => {
      $scope.user = response.data;
    });
  }
  // Either pass in user to the function to check or alter this function
  // expected format for user to check {username: '', password: ''};
  $scope.checkPassword = function(userToCheck){
    
    $http.post('/login', userToCheck).then(response => {
      window.location.replace(response.data);
    });
  }

  $scope.createUser = function(userToCreate){
    $http.post('/api/user/create', userToCreate).then(response => {
      $scope.msg = response.data;
    }); // returns msg object, which will have a msg if failed
    // msg = {created: boolean, msg: ''}
  }

  $scope.saveUser = function(userToSave){
    // expect user to have {username: '', password: ''}
    $http.post('/api/user/save', userToSave); // saves updates to user.
  }
}]);
