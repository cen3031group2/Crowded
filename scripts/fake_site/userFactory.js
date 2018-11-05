angular.module('user', []).factory('User', function($http) {
    var methods = {
        getGenres: function(user){
            return $http.post('../api/genre/get', user);
        },
        setGenres: function(user, genres){
            const body = {
                username: user.username,
                genres: genres
            };
            return $http.post('../api/genre/set', body);
        },
        
        setHistory: function(user, history){
            const body = {
                username: user.username,
                history: history
            };
            return $http.post('../api/history/set', body);
        },
        getHistory: function(user, history){
            return $http.post('../api/history/get', user);
        },

        checkPassword: function(user){
            return $http.post('../api/password/check', user);
        },
        setPassword: function(user){
            return $http.post('../api/password/set', user);
        },
        getCompany: function(user){
            
        }
    };
  
    return methods;
  });