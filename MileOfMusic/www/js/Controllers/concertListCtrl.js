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
            concertData.getConcerts().then(function (result) {
                $log.info('concert list in');
                console.log(result);
                $scope.shows = result.data;
            });
        });
    });

