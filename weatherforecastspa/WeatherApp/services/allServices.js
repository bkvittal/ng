// Custom Services

weatherApp.service('cityService',function(){
    var self = this;
    this.city = 'New York, NY';
    
});

weatherApp.service('weatherService',['$resource',function($resource){
    var self = this;
    this.appId = "c34ca70c483ff131f2c9ddbf00b3cc0e";
    this.getWeather = function(city,days){
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{callback:"JSON_CALLBACK"},{get:{method:"JSONP"}});
                            
return weatherAPI.get({q:city,cnt:days,appid:self.appId});
                                 }
}]);