mileOfMusicApp.controller('artistsListController',
    function($scope,$log, artistData, CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('artist list in');
            $scope.performers = artistData.getArtists();
            $log.info('artist list out count: ');

// how to get the count of items in the array for debugging?
            //$log.info('artist list out count: ' +artistsData.length);

        });
    });

