mileOfMusicApp.controller('concertsListController',
    function($scope,$log, artistData, concertData,venueData,CordovaService) {
        $log.info('heop');
        if (artistData) {
            $log.info('defined');
        }
        else {

            $log.info('not defined');
        }
        CordovaService.ready.then(function() {
            $log.info('concert list in');
            $scope.shows = concertData.getConcerts();
            $log.info('concert list out');

        });
    });

