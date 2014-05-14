mileOfMusicApp.controller('concertController',
    function($scope,$log,$routeParams,concertData,artistData,venueData,CordovaService) {

        CordovaService.ready.then(function() {

            concertData.getConcert($routeParams.concertId).then(function (result) {
                $scope.selectedConcert = result;
            });

            $scope.showConcertList = function(){
                window.location.href = "#/concertList";
            }
        });

    });