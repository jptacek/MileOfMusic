mileOfMusicApp.controller('artistController',
    function ($scope, $log, $routeParams, $sce, artistData, concertData, myScheduleData, CordovaService) {
        //$log.info('heop');

        CordovaService.ready.then(function() {
            //$log.info('artist  in');
            $log.info($routeParams.artistId);

            artistData.getArtist($routeParams.artistId).then(function (result) {
                $scope.selectedArtist = result;
                //$log.info('artist  out');
            });
            
            artistData.getMusic($routeParams.artistId).then(function (result) {

                $.each(result, function (i, item) {
                    item.audio = $sce.trustAsHtml("<audio controls='controls' preload='none'><source src='" + item.musicUrl + "' /></audio>");
                });

                $scope.music = result;
                //$log.info('artist  out');
            });

            concertData.getConcertsByArtist($routeParams.artistId).then(function (result) {
                $scope.concertListForArtist = result;
            });

            $scope.showArtistList = function() {
                //$log.info('ShowArtistList');
                window.location.href = "#/artistList";
            };

            // this is used to control the tabs on the Artist Detail page.
            // Each tab should work with it's own uniqye index 
            $scope.selectedTabIndex = 1;
            $scope.setSelectedTab = function (tabId) {
                $scope.selectedTabIndex = tabId;
            };
            $scope.shouldShowTab = function (tabId) {
                return tabId == $scope.selectedTabIndex;
            };

            $scope.saveFavorite = function (concertId) {
                //$log.info("saveFavorite");
                myScheduleData.saveConcertToMySchedule(concertId);
            };
        });
    });