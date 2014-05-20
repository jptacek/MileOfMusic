mileOfMusicApp.controller('artistsListController',
    function ($scope, $log, $rootScope, artistData, CordovaService, navFactory, $location, $anchorScroll) {
        CordovaService.ready.then(function() {

            $scope.isLoading = true;
            artistData.getArtists().then(function (result) {
                $scope.performers = result.data;
                $scope.isLoading = false;
            }, function () { $scope.isLoading = false; });

        });

        navFactory.assignCanSearchAZ(true);
    });