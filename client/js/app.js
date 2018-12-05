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
    $scope.verify = "hello";
    $scope.isValidUser = false;
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
      $http.post('/api/crowdy/', data);
    }

    $scope.setVisibleIfUser = function(){
      if($scope.isValidUser){
        $(".crowdy").show();
      } else{
        $http.get('/api/user').then(function(response){
          if(response.data){
            $(".crowdy").show();
            $scope.isValidUser = true;
          }
        });
      }
    }

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

app.controller('TheaterController', ['$scope', '$http', function ($scope, $http) {
  $scope.theaters = undefined;
  $scope.isValidUser = undefined;
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
  $scope.setTheaterCrowdy = function(theater_id, value){
    const data = {
      value: value,
      theater: theater_id
    }
    $http.post('/api/crowdy/theater', data);
  }

  $scope.setVisibleIfUser = function(){
    if($scope.isValidUser){
      $(".employeeCrowdy").show();
    } else{
      $http.get('/api/user').then(function(response){
        if(response.data.employee_company){
          $(".employeeCrowdy").show();
        }
      });
    }
  }
}]);

app.controller('UpdateController', ['$scope', '$http', '$window', function($scope, $http, $window){
  $scope.updateUsername = async function(username){
    const payload = {
      username: username
    }
    var result = await $http.post('/api/user/updateUsername', payload);
    const msg = result.data;
    if(msg.updated === true){
      $window.alert(msg.msg)
    } else if (msg){
      $window.alert(msg.msg);
    } else {
      $window.alert("ERROR");
    }
  }

  $scope.updatePassword = async function(passwords){
    var result = await $http.post('/api/user/updateUsername', passwords);
    const msg = result.data;
    if(msg.updated === true){
      $window.alert(msg.msg)
    } else if (msg){
      $window.alert(msg.msg);
    } else {
      $window.alert("ERROR");
    }
  }

  $scope.updateAvatarImage = async function(img){
    console.log(img);
    var result = await $http.post('/avatar_image', img);
    console.log(result);
    if(result ===  true){
      $window.location.href = '/index.html'
    } else if (result){
      $window.alert(result);
    } else{
      $window.alert("Upload Failed!");
    }
  }
}]);

app.controller('UserController', ['$scope', '$http', 'UserMethods', '$window', function($scope, $http, UserMethods, $window){
  $scope.userMethods = UserMethods;
  $scope.recommendedMovies = [];
  $scope.userHistory = undefined;
  $scope.user = undefined;
  $scope.userGenres = undefined;

  //Get user on document load
  angular.element(document).ready(function () {
    $scope.getUser();
  });

  $scope.clearHistory = function(){
    $http.get('/api/user/history/clear').then(response =>{
      $window.location.href = '/user_profile.html'
    });
  }
  $scope.getUser = function(){
    console.log("starting user request");
    $http.get('/api/user/').then(response => {
      $scope.user = response.data;
      $scope.userGenres = $scope.user.genre;
      $scope.userHistory = $scope.user.history;

      // console.log($scope.userHistory);
      // $scope.userHistory =
      $scope.showRecommendedMoviesBasedOnGenre();
    });
  }

  $scope.genres = ["Animation", "Fantasy", "Adventure", "Family", "Drama", "Music"];
  $scope.selectedValue = undefined;

  $scope.showSelectValue = function (mySelect) {
    $scope.selectedValue = mySelect;
  }

  $scope.addSelectedGenre = function () {
    const payload = {
      genre: $scope.selectedValue
    };
    $http.post('/api/user/genre/add',  payload).then(function(response){
    });
  }

  $scope.removeSelectedGenre = function () {
    const payload = {
      genre: $scope.selectedValue
    };
    $http.post('/api/user/genre/remove',  payload).then(function(response){
    });
  }

  $scope.showRecommendedMoviesBasedOnGenre = function () {
    if ($scope.user) {
      var abort = false;
      $http.get('/api/movie/getAllMoviesFromTheater/' + 42490).then(function(response){
        //For each movie
        response.data.forEach (function (movie) {
          abort = false;
            //For each genre in the movie
            movie.genres.forEach (function (genre) {
              //Select the ones that match the user
              if (abort == false) {
                if ($scope.userGenres.includes(genre)) {
                  $scope.recommendedMovies.push(movie);
                  abort = true;
                }
              }
            });
        });
        // $scope.recommendedMovies = response.data;
      });
    }
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
      const msg = response.data;
      if(msg.created){
        window.location.replace('index.html');
      } else{
        $window.alert(msg.msg);
      }
    }); // returns msg object, which will have a msg if failed
    // msg = {created: boolean, msg: ''}
  }

  $scope.saveUser = function(userToSave){
    // expect user to have {username: '', password: ''}
    $http.post('/api/user/save', userToSave); // saves updates to user.
  }
}]);

app.factory('UserMethods', function($http) {
    var methods = {
        getGenres: function(user){
            return $http.post('../api/user/genre/get', user);
        },
        setGenres: function(user, genres){
            const body = {
                username: user.username,
                genres: genres
            };
            return $http.post('../api/user/genre/set', body);
        },

        setHistory: function(user, history){
            const body = {
                username: user.username,
                history: history
            };
            return $http.post('../api/user/history/set', body);
        },
        // getHistory: function(user, history){
        //     return $http.post('../api/user/history/get', user);
        // },

        checkPassword: function(user){
            return $http.post('http://localhost:8080/api/user/password/check', user);
        },
        setPassword: function(user){
            return $http.post('http://localhost:8080/api/user/password/set', user);
        },
        getCompany: function(user){
            return $http.post('../api/user/company/get')
        },
        createUser: function(user){
            return $http.post('http://localhost:8080/api/user/create', user);
        }
    };

    return methods;
  });
