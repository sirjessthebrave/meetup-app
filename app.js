var myApp = angular.module('myApp', ['ngResource', 'ngSanitize']);

//meetup api key
var meetupApiKey = '5671969381e1e703f5c673a4f2b384e&callback=JSON_CALLBACK' ;

//request URL for women who code events
var wwcEventsUrl = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_id=13508462&page=20&key=' + meetupApiKey ;

//the ending of the url request for getting group info
var groupUrlEnding ='?photo-host=public&sig_id=53388232&key=';




myApp.controller('mainController', ['$scope', '$http', '$log', '$resource', function($scope, $http, $log, $resource) {
    $scope.url = {
        text: ''
    };
    var meetupUrl = ''
    
    $('.getMeetupInfo').submit(function(){
        //get url entered by user
        meetupUrl = $('.url').val();
        
        var regex = /([w]{3})/;//finding www
        var groupHeaderUrl = meetupUrl.replace(regex, 'api');//replacing www with api to make correct api request url
        //concta all peices of url for http request
        var groupIdUrl = groupHeaderUrl + groupUrlEnding + meetupApiKey;
    
    $http({// request group info with url user input
          method: 'JSONP',
          url: groupIdUrl
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.id = response.data.data.id;
            $scope.groupName = response.data.data.name;
            $scope.groupPic = response.data.data.group_photo.highres_link;
            $scope.groupDescription =  response.data.data.description;
            $scope.groupLink = response.data.data.link;
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

   }); 
    
    
//   $scope.eventData = [
//       {name: ''},
//       {description: ''},
//       {time: ''}
//   ];

   $http({
      method: 'JSONP',
      url: wwcEventsUrl
    }).then(function successCallback(response) {
        var data =  response.data;
        var names =[];
        $.each(data.results, function(i, val){
            names.push(val.name);
        });
        console.log(data);
        // this callback will be called asynchronously
        // when the response is available
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
    

}]);

