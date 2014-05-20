mileOfMusicApp.controller('venueListController',
    function ($scope, $log, venueData, CordovaService, navFactory) {

        navFactory.assignCanSearchAZ(true);

        CordovaService.ready.then(function () {

            $scope.isLoading = true;
            venueData.getVenues().then(function (result) {
                $scope.locations = result.data;
                $scope.isLoading = false;
            }, function () { $scope.isLoading = false; });

        });
    });