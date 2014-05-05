mileOfMusicApp.controller('artistsListController',
    function($scope,$log, artistData, CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('artist list in');

            artistData.getArtists().then(function (result) {
                $scope.performers = result.data;
                $log.info('artist list out count: ' + $scope.performers.artists.length);

            });
            // how to get the count of items in the array for debugging?
            //$log.info('artist list out count: ' +artistsData.length);
        });

        $scope.alphabetNavigation = function (letter) {
            alert(letter);
        };
    });