mileOfMusicApp.controller('artistController',
    function($scope,$log, CordovaService) {
        $log.info('heop');
        CordovaService.ready.then(function() {
            $log.info('no heop');
            $scope.selectedArtist ='test';
            $log.info('hello from artist list');

        });
    });