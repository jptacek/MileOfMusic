mileOfMusicApp.controller('venueListController',
    function($scope,$log, venueData,CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('venue list in');
            $scope.locations =venueData.getVenues();
            $log.info('venue list out');

        });
    });

