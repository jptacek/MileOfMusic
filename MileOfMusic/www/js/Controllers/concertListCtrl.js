mileOfMusicApp.controller('concertsListController',
    function($scope,$log, concertData,CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('concert list in');
            $scope.shows =concertData.getConcerts();
            $log.info('concert list out');

        });
    });

