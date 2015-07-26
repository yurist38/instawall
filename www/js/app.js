// AccessToken 180849786.02eb1da.3d7bb82737ce4604ae16a84aa83142c5

angular.module('InstaWall', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("MainCtrl", function($scope, $http, $log){

  $scope.$log = $log;
  var accessToken = "180849786.02eb1da.3d7bb82737ce4604ae16a84aa83142c5";
  // FULL URI - https://api.instagram.com/v1/tags/{tag-name}?access_token=ACCESS-TOKEN
  var mainUrl = "https://api.instagram.com/v1/tags/"
  var fullUrl = mainUrl;

  $scope.findPics = function(){
    mainUrl += $scope.tagname+"/media/recent?access_token="+accessToken+'&callback=JSON_CALLBACK&count=10';
    $log.log(mainUrl);

    var instaResponse = $http.jsonp(mainUrl);

    instaResponse.then(function(response) {
        $scope.instaData = response.data.data;
        //$log.log($scope.instaData);
    });
    instaResponse.error(function(data, status, headers, config) {
        alert("Sorry! Can not connect with server... Try later.");
    });

  }

});
