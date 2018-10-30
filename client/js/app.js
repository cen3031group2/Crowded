// this is Crowdy's app.js file
// 10/11/18

/* register the modules the application depends upon here*/
angular.module('movies', []);
angular.module('theaters', []);
/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['movies', 'theaters']);


$scope.redirect = function(){
  window.location = "crowdy2.html";
}
