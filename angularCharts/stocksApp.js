angular.module("app", ["chart.js"]) // here i couldn't understand about chart.js fil
  // Optional configuration
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#DA3F01','#019FDE'],
      responsive: true
    });
    // Configure all line charts
    //ChartJsProvider.setOptions('Bar', {
    //  datasetFill: false
   // });
  }])
  .controller("PieCtrl", ['$scope', '$timeout', function ($scope, $timeout) {

  $scope.labels = ["Google", "Facebook", "Adobe","Sterotaxis", "Gamestop", "Apple"];
  $scope.data = [50, 100, 200,4000,500,100];
  /*    
      $scope.data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        //label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        //label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        //label: "Yellow"
    }
]
 */

}]);