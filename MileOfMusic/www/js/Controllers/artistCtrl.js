mileOfMusicApp.controller('artistController',
    function($scope,$log,$routeParams, artistData,CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('artist  in');
            $log.info($routeParams.artistId);
            //$scope.selectedArtist =artistData2.getArtist2();
            $scope.selectedArtist =artistData.getArtist($routeParams.artistId);
            $log.info('artist  out');

            $scope.showArtistList = function(){
                $log.info('ShowArtistList');
                window.location.href = "#/artistList";
            }
        });


    });

