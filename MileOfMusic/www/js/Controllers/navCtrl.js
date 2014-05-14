mileOfMusicApp.controller('navController', function ($scope, $location, navFactory) {
    $scope.canSearchAZ = navFactory.canSearchAZ;
    $scope.$on('$routeChangeStart', function () {
        navFactory.assignCanSearchAZ(false);
        navFactory.assignIsSearchAZShowing(false);
    });
    $scope.canSearchAZ = navFactory.canSearchAZ;

    $scope.showSearchAZ = navFactory.showSearchAZ;
    $scope.searchAZ = navFactory.searchAZ;
    $scope.isSearchAZShowing = navFactory.isSearchAZShowing;
    $scope.navigate = navFactory.navigate;
});