mileOfMusicApp.controller('artistsListController',
    function ($scope, $log, $rootScope, artistData, CordovaService, navFactory, $location, $anchorScroll) {
        CordovaService.ready.then(function() {

            artistData.getArtists().then(function (result) {
                $scope.performers = result.data;
            });

        });

        navFactory.assignCanSearchAZ(true);
    });