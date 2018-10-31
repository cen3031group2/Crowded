angular.module('crowdy').factory('Movies', function($http) {
  var methods = {
      getAllMoviesFromTheater: function(theater_id){
          const config = {
             params:{
                 theater_id: "2"
             }
          };
         return $http.get('./api/movies', config);
      }
  };
  return methods
});
