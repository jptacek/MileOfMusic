mileOfMusicApp.controller('venueListController',
    function ($scope, $log, venueData, CordovaService, navFactory) {

        navFactory.assignCanSearchAZ(true);

        CordovaService.ready.then(function() {

            venueData.getVenues().then(function (result) {
                $scope.locations = result.data;
            });

        });
    });