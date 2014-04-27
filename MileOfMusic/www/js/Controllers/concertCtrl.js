mileOfMusicApp.controller('concertController',
    function($scope,$log,$routeParams,concertData,artistData,venueData,CordovaService) {
        $log.info('heop');

        CordovaService.ready.then(function() {
            $log.info('concert  in');
            $log.info($routeParams.concertId);

            concertData.getConcert($routeParams.concertId).then(function (result) {
                console.log(result)
                $scope.selectedConcert = result;
                $log.info('concert  out');
            });

            $scope.showConcertList = function(){
                $log.info('ShowconcertList');
                window.location.href = "#/concertList";
            }
        });

    });