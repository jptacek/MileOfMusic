mileOfMusicApp.controller('concertController',
    function($scope,$log,$routeParams,concertData,CordovaService) {
        $log.info('heop');

        CordovaService.ready.then(function() {
            $log.info('concert  in');
            $log.info($routeParams.concertId);

            $scope.selectedConcert =concertData.getConcert($routeParams.concertId);
            $log.info('concert  out');

            $scope.showConcertList = function(){
                $log.info('ShowconcertList');
                window.location.href = "#/concertList";
            }
        });


    });

