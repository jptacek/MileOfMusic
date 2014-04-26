mileOfMusicApp.controller('venueController',
    function($scope,$log,$routeParams, venueData,CordovaService) {
        $log.info('heop');

        CordovaService.ready.then(function() {
            $log.info('venue  in');
            $log.info($routeParams.venueId);
            //$scope.selectedArtist =artistData2.getArtist2();
            $scope.selectedVenue =venueData.getVenue($routeParams.venueId);
            $log.info('venue  out');

            $scope.showVenueList = function(){
                window.location.href = "#venueList";
            }
        });


    });

