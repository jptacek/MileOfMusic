mileOfMusicApp.controller('artistsListController',
    function($scope,$log, artistData,CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('artist list in');
            $scope.performers =artistData.getArtists();
            $log.info('artist list out');

        });
    });

