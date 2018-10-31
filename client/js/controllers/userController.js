angular.module('crowdy').controller('UserController', ['$scope', 'User',
  function($scope, User)});
  $scope.addListing = function() {
  /**TODO
  *Save the article using the Listings factory. If the object is successfully
  saved redirect back to the list page. Otherwise, display the error
  */
$scope.verify = undefined;

$scope.verifyLogin = function() {
    var login = {
      inputEmail: $scope.newLogin.inputEmail,
      inputPassword: $scope.newLogin.inputPassword,
    };
    //$scope.crowdy.push($scope.newListing);
    if($scope.newLogin.inputEmail == "test@test.com" && $scope.newLogin.inputPassword = "test") {
      $scope.verify = "verified";
    }
    else {
      $scope.verify = "not verified";
    }
    $scope.newLogin = {};
    $scope.newLogin.inputEmail = '';
    $scope.newLogin.inputPassword = '';


/*    Listings.create(crowdy).then(function(response){
      $scope.newListing.code='';
      $scope.newListing.name ='';
      $scope.newListing.address='';
    },
    function(error){
      console.log('Unable to add listing:', error);
};*/
]);
