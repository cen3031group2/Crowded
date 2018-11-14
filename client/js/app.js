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

    //Change the movies depending on the theater selected
    $scope.changeListingsView = function (index) {
      $scope.theaterId = index;
    };

    $scope.getMoviesFromTheater = async function (theater_id){
        if (theater_id == null || !theater_id) {
          theater_id = $scope.theaterId;
        }
        $http.get('/api/movie/getAllMoviesFromTheater/' + theater_id).then(function(response){
          $scope.movies = response.data;
        });
    };

    //Used to show only the movie names or genres corresponding to the search bar information
    $scope.valid = function (json) {
      if ($scope.codec == undefined) return true;
      if ($scope.codec == json) return true;
      else return false;
    };
}]);

app.controller('TheaterController', ['$scope', '$http', 'Scopes', function ($scope, $http, Scopes) {
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
    $scope.theaters = $http.get('/api/theater/getAllTheaters').then(response); //
  }

  $scope.getTheater = function(theater_id){
    $scope.currentTheater = $http.get('/api/theater/getTheaters/' + theater_id);
  }
}]);

app.controller('UserController', ['$scope', '$http','$cookies', function($scope, $http, $cookies){
  // returns an array with user's listed genres
  $scope.getUserGenres = function(username){
    $http.get('/api/user/genre/' + username).then(function(response){
      $scope.genres = response.data;
    });
  }

  // returns user by that name or null if none, does not have password attached
  // const userFormat = {
  //   username: '',
  //   password: '',
  //   genre: [''],
  //   email: '',
  //   employee_company: ''
  // }
  $scope.getUser = function(username){
    console.log("starting user request");
    $http.get('/api/user/get/' + username).then(response => {
      $scope.user = response.data;
      console.log("hell");
    }); // returns user object, or null if there is no user
  }
  $scope.getUserFromCookie = function(){
    $scope.getUser($cookies.get('user_username'));
  }
  // Either pass in user to the function to check or alter this function
  // expected format for user to check {username: '', password: ''};
  $scope.checkPassword = function(userToCheck){
    $http.post('/api/user/password/check', userToCheck).then(
      response =>{
        console.log(response.data);
        if(response.data == true) {
          window.location.href = './index.html';
          console.log("success");
        }
        else {
          console.log("failure");
        }
      }
    )
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
