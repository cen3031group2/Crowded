angular.module('user').controller('userController', ['$scope', 'User', 
  function($scope, User) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO 
	  *Save the article using the Listings factory. If the object is successfully 
    saved redirect back to the list page. Otherwise, display the error
	 */
      Listings.create($scope.newListing).then(function(){
        window.location.replace("/");
      }, function(err){
        if(err) $scope.error = err;
      });
    }

    $scope.deleteListing = function(index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful, 
		navigate back to 'listing.list'. Otherwise, display the error. 
       */
      Listings.delete($scope.listings[index]._id).then(function(){
        window.location.replace("/");
      }, function(err){
        if(err) $scope.error = err;
      });
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);