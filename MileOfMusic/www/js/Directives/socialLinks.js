mileOfMusicApp.directive('socialLinks',  function($window){
    return{
        restrict: 'E',
        scope: {
            twitterURL2 : "="
        },
        transclude: true,
        template:"<button class='btn' ng-click='openUrl()'><span ng-transclude></span></button>",
        controller: function($scope){

            var wrappedFunction = function(action){
                return function(){
                    $scope.$apply(function(){
                        action();
                    });
                }
            };
            var inAppBrowser;
            $scope.twitterUrl = 'http://wwww.twitter.com/' + $scope.twitter;
            $scope.openUrl = function(){
                console.log($scope.twitterURL2);
                inAppBrowser = $window.open($scope.twitterURL2, '_blank', 'location=yes');
                console.log("did it");
                if($scope.exit instanceof Function){
                    inAppBrowser.addEventListener('exit', wrappedFunction($scope.exit));
                }
            };
        }
    };
});