mileOfMusicApp.controller('venueListController',
    function($scope,$log, venueData,CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('venue list in');

            venueData.getVenues().then(function (result) {
                $scope.locations = result.data;
                $log.info('venue list out');
            });

        });
    });