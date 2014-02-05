mileOfMusicApp.controller('artistController',
    function($scope,$log, artistData,CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('artist  in');
            //$scope.selectedArtist =artistData2.getArtist2();
            $scope.selectedArtist =artistData.getArtist();
            $log.info('artist  out');

            $scope.showArtistList = function(){
                $log.info('ShowArtistList');
                window.location.href = "#/artistList";
            }
        });


    });

