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
  var accessToken = "180849786.02eb1da.3d7bb82737ce4604ae16a84aa83142c5"
  // FULL URI - https://api.instagram.com/v1/tags/{tag-name}?access_token=ACCESS-TOKEN
    , MAIN_URL = "https://api.instagram.com/v1/tags/"
    , maxTagId = '';

  $scope.feedActive = false;


  $scope.findPics = function(){
    firstUrl = MAIN_URL+$scope.tagname+"/media/recent?access_token="+accessToken+'&callback=JSON_CALLBACK&count=5';

    var instaResponse = $http.jsonp(firstUrl);

    instaResponse.then(function(response) {
        $scope.instaData = response.data.data;
        maxTagId = response.data.pagination.next_max_tag_id;
        $scope.feedActive = true;
    });
    instaResponse.error(function(data, status, headers, config) {
        alert("Sorry! Can not connect with server... Try later.");
    });

  }

  $scope.loadMore = function() {
    if(maxTagId){
      var instaResponse = $http.jsonp(firstUrl+'&max_tag_id='+maxTagId)  ;
      instaResponse.then(function(responseMore) {
          var oldData = responseMore.data.data;
          $scope.instaData = $scope.instaData.concat(oldData);
          maxTagId = responseMore.data.pagination.next_max_tag_id;
          $scope.$broadcast('scroll.infiniteScrollComplete');
      });
      instaResponse.error(function(data, status, headers, config) {
          alert("Sorry! Can not connect with server... Try later.");
      });
    }
  }

});
