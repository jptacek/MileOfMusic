mileOfMusicApp.controller('venueListController',
    function ($scope, $log, venueData, CordovaService, navFactory,$location, $anchorScroll) {

        navFactory.assignCanSearchAZ(true);

        CordovaService.ready.then(function () {

            $scope.isLoading = true;
            venueData.getVenues().then(function (result) {
                $scope.locations = result.data;
                $scope.isLoading = false;
            }, function () { $scope.isLoading = false; });

        });
        $scope.gotoTop = function () {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('top');

            // call $anchorScroll()
            $anchorScroll();
        };
    });