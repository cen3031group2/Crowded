var app = angular.module('avatar', ['ngFileUpload']);

app.controller('UpdateController', ['$scope', '$http', '$window', 'Upload', '$timeout', function($scope, $http, $window, Upload, $timeout){
    $scope.$watch('file', function(){
    })
    $scope.updateAvatarImage = async function(file){ 
        if(!file){
            $window.alert("Select file!");
        } else {
           
            file.upload = Upload.upload({
                url: '/avatar_image',
                method: 'post',
                data: {
                    file: file
                }
            });
            file.upload.then(function (response) {
                $timeout(function () {
                  file.result = response.data;
                  console.log(response.data);
                });
              }, function (response) {
                if (response.status > 0)
                  $scope.errorMsg = response.status + ': ' + response.data;
              }, function (evt) {
                // Math.min is to fix IE which reports 200% sometimes
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
              });
        }
    }
  }]);