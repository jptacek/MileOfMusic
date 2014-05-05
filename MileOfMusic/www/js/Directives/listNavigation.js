mileOfMusicApp.directive('listnav', function () {
    return {
        scope: {
            current: '='
        },
        templateUrl: '/templates/directives/listNavigation.html',
        controller: function ($scope, $location, $anchorScroll) {
            $scope.showListNav = false;
            $scope.toggleListNav = function () {
                $scope.showListNav = !$scope.showListNav;
            }
            $scope.navigate = function (letter) {
                var old = $location.hash();
                $location.hash("nav-" + letter);
                $anchorScroll();
                //reset to old to keep any additional routing logic from kicking in
                $location.hash(old);

                $scope.toggleListNav();                
            };
        }
    };
});