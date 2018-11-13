// this is Crowdy's app.js file
// 10/11/18
const website = 'http://localhost:8080';
var app = angular.module('directoryApp', []);

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

    //Change the movies depending on the theater selected
    $scope.changeListingsView = function (index) {
      $scope.theaterId = index;
    };

    $scope.getMoviesFromTheater = function (theater_id){
        if (theater_id == null || !theater_id) {
          theater_id = $scope.theaterId;
        }
        $scope.movies = $http.get(website + '/api/movie/getAllMoviesFromTheater/' + theater_id);
    };

    //Used to show only the movie names or genres corresponding to the search bar information
    $scope.valid = function (json) {
           if ($scope.codec == undefined) return true;
           return (json.name.toLowerCase().startsWith($scope.codec.toLowerCase()) ||
                   json.genre.toLowerCase().startsWith($scope.codec.toLowerCase()));
    };
}]);

app.controller('TheaterController', ['$scope', '$http', 'Scopes', function ($scope, $http, Scopes) {
  $scope.theaters = undefined;
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
  $scope.getAllTheaters = function() {
    $scope.theaters = $http.get(website + '/api/theater/getAllTheaters');
  }

  $scope.getTheater = function(theater_id){
    $scope.currentTheater = $http.get(website + '/api/theater/getTheaters/' + theater_id);
  }
}]);

app.controller('UserController', ['$scope', '$http', function($scope, $http){
  // returns an array with user's listed genres
  $scope.getUserGenres = function(username){
    $http.get(website + '/api/user/genre/' + username);
  }

  // returns user by that name or null if none, does not have password attached
  const userFormat = {
    username: '',
    password: '',
    genre: [''],
    email: '',
    employee_company: ''
  }
  $scope.getUser = function(username){
    $http.get(website + '/api/user/' + username); // returns user object, or null if there is no user
  }

  $scope.checkPassword = function(userToCheck){
    // expected format for user to check
    // {username: '', password: ''};

    $http.post(website + '/api/user/password/check', userToCheck);// returns true if valid, false otherwise
  }

  $scope.createUser = function(userToCreate){
    // expect user to have {username: '', password: ''}
    var msg = $http.post(website + '/api/user/create', userToCreate); // returns msg object, which will have a msg if failed
    // msg = {created: boolean, msg: ''}
  }

  $scope.saveUser = function(userToSave){
    // expect user to have {username: '', password: ''}
    $http.post(website + '/api/user/save', userToSave); // saves updates to user.
  }
}]);
