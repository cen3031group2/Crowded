angular.module('user').controller('userController', ['$scope', 'User', 
    function($scope, User) {
        $scope.user = undefined;
        $scope.getGenres = function(user){
            $scope.user.genres = User.getGenres(user);
        };
    
        $scope.checkPassword = function (user) {
            return User.checkPassword(user);
        };

        $scope.createUser = function (user) {
            return User.createUser(user);
        }
    }
]);