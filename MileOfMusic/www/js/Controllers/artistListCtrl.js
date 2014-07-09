mileOfMusicApp.controller('artistsListController',
    function ($scope, $log, $rootScope, artistData, CordovaService, navFactory, $location, $anchorScroll) {
        CordovaService.ready.then(function() {
            $scope.isLoading = true;
            artistData.getArtists().then(function (result) {
                $scope.performers = result.data;
                $scope.isLoading = false;
            }, function () { $scope.isLoading = false; });

        });
        $scope.gotoTop = function () {
            // set the location.hash to the id of
            // the element you wish to scroll to.
            $location.hash('top');

            // call $anchorScroll()
            $anchorScroll();
        };
        navFactory.assignCanSearchAZ(true);
    });