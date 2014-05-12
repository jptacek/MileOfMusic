mileOfMusicApp.controller('artistsListController',
    function($scope,$log, artistData, CordovaService) {
        //$log.info('heop');
        CordovaService.ready.then(function() {
            //$log.info('artist list in');

            artistData.getArtists().then(function (result) {
                $scope.performers = result.data;
                //$log.info('artist list out count: ' + $scope.performers.artists.length);

            });

        });

        $scope.alphabetNavigation = function (letter) {
            alert(letter);
        };
    });