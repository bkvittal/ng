angular.module("app", ['chart.js','ngResource']) // here i couldn't understand about chart.js fil
  // Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#809DA8','#00394F'],
      responsive: true
    });
    // Configure all line charts
    //ChartJsProvider.setOptions('Bar', {
    //  datasetFill: false
   // });
  }])
  .controller("LineTempCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

  $scope.labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  $scope.series = ['2014', '2015'];
  $scope.data = [
      [28, 11, 33, 40, 45, 22, 40,1, 46, 22, 9, 80],
      [32, 34, 34, 29, 80, 22, 33,10, 45, 32, 0, 113]
    
  ];
 

}]);


/*
var app = angular.module('plunker', ['ngResource'])

app.factory('JsonResource', function($resource) {
  return $resource('events.json', {}, {
    query: {
      method: 'GET',
      transformResponse: function(data) {
        return angular.fromJson(data).events;
      },
      isArray: true
    }
  });
});

app.controller('MyCtrl', function($scope, JsonResource) {
  JsonResource.query().$promise.then(function(data) {
    $scope.events = data;
    $scope.isArray = data instanceof Array;
  });
});
*/