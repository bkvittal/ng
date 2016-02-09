var weatherApp = angular.module('weatherApp',['ngRoute','ngResource','chart.js']);
weatherApp.config(['$routeProvider','ChartJsProvider',function($routeProvider,ChartJsProvider){
   
    ChartJsProvider.setOptions({
      colours: ['#D35400','#17202A','#DA3F01','#019FDE'],
      responsive: true,
      scaleShowGridLines : false,
      scaleGridLineWidth : 0
    });
 // Routers or Routing templates (URLs)   
    $routeProvider
    
    .when('/',{
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
   
    .when('/forecast',{
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days',{
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/visual',{
        templateUrl: 'pages/tempChart.html',
        controller: 'BarTempCtrl'
    })
}]);

//Custom Directives
weatherApp.directive("weatherReport",function(){
    return{
        restrict:'E',
        templateUrl: 'customdirectives/weatherReport.html',
        replace:true,
        scope:{
            weatherDay: "=",
            convertToStandard:"&",
            convertToDt:"&",
            dateFormat:"@"
        }
    }
});

// Custom Services
/*
weatherApp.service('cityService',function(){
    var self = this;
    this.city = 'New York, NY';
    
});

weatherApp.service('weatherService',['$resource',function($resource){
    var self = this;
    this.appId = "c34ca70c483ff131f2c9ddbf00b3cc0e";
    
    this.data = {};
    this.labels = [];
    this.getWeather = function(city,days){
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
                            
return weatherAPI.get({q:city,cnt:days,appid:self.appId});
                                 }
}]);
*/

//Controllers

weatherApp.controller("BarTempCtrl", ['$scope', '$timeout','weatherService','$log', function ($scope, $timeout,weatherService,$log) {

  $scope.labels = weatherService.labels;
  $scope.series = ['Day','Night','Max', 'Min'];
  $scope.data = weatherService.data;
 
}]);

weatherApp.controller('homeController',['$scope','$location','$log','$routeParams','cityService',function($scope,$location,$log,$routeParams,cityService) {
    $scope.city='';
    $scope.city = cityService.city;
    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    });
    
    $scope.submit = function(){
        $location.path("/forecast");
    };
}] );

weatherApp.controller('forecastController',['$scope','$log','$routeParams','cityService','weatherService','$filter',
                function($scope,$log,$routeParams,cityService,weatherService,$filter) {
    //$scope.city='';
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || '2';
    /*
    $scope.$watch('city',function(){
        cityService.city = $scope.city;
    });*/
$scope.weatherResult = weatherService.getWeather($scope.city,$scope.days);
                            
//scope.user = User.get( {username: 'bob'}  );    // GET
                            
// Helper functions or conversions 
$scope.convertToDate = function(apiDt){
    return new Date(apiDt*1000);
};
                            
$scope.convertTempToF = function(tempInDegK){
    return Math.round((1.8*(tempInDegK-273))+32);
};
var day = [];
var night = [];
var max = [];
var min = [];
var labels = [];
$scope.weatherResult.$promise.then(function(data) {
    console.log(data.list);
    angular.forEach(data.list, function(value, key) {
    
        day.push($scope.convertTempToF(value.temp.day));
        night.push($scope.convertTempToF(value.temp.night));
        min.push($scope.convertTempToF(value.temp.min));
        max.push($scope.convertTempToF(value.temp.max));
        labels.push($filter('date')($scope.convertToDate(value.dt)));
});
   });
                    
 //var max = [45, 34, 50, 60, 65, 70, 80,100, 80, 55, 18, 13];
 //var min = [28, 11, 33, 40, 45, 45, 55,72, 11, 32, 8, 3];
weatherService.data = [
    day,night,max,min
    ];
weatherService.labels = labels;
/*                            
$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
                            
$scope.weatherResult = $scope.weatherAPI.get({q:$scope.city,cnt:$scope.days,appid:"c34ca70c483ff131f2c9ddbf00b3cc0e"});
 */                                           
//console.log($scope.weatherResult); 
                                         
                                      
}] );


