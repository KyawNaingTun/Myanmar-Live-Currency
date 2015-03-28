angular.module('CurrecyApp', [])
// controller
.controller('MainController', function($scope, $filter, $http, $timeout) {
    $scope.json_get = function(){
        $http({method: 'GET', url: 'json/codes.json'})
            .success(function(data){
                console.log(data);
                $scope.codes = data;
            });
    };
    $scope.json_get();
    // to get currency json
    var getCurrency = function (){
            $scope.cLoading = true;
            $http({method: 'GET', url: 'server.php'})
                .success(function(data){
                    console.log(data);
                    $scope.cLoading = false;
                    $scope.currency = data;
                    $scope.total = data.rates;
	        // Start the call per 2second
	        $timeout(getCurrency, 2000);
                })
                .error(function(data){
                    console.log(data);
                    $scope.cLoading = false;
                    alert("Sorry, server connection timeout!");
                });
                // Start the call per 2second
                $timeout(getCurrency, 2000);
        };
       

        $scope.clock = "loading clock..."; // initialise the time variable
        $scope.timer = "12:00:00";// default currency timer
        var tick = function() {
            $scope.now = Date.now() // get the current time
            $timeout(tick, 1000); // reset the timer
            $scope.clock = $filter('date')($scope.now, "hh:mm:ss");// filter to 00:00:00
            // 
        }
        // Start the clock timer
        $timeout(tick, 1000);
});