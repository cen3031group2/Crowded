// this is Crowdy's app.js file
// 10/11/18

/* register the modules the application depends upon here*/
angular.module('crowdy', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['MovieController']);



$scope.redirect = function(){
  window.location = "crowdy2.html";
}
