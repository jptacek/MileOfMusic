mileOfMusicApp.controller('artistController',
    function ($scope, $log, $routeParams, $sce,$location, $anchorScroll, artistData, concertData, myScheduleData, appHelper, CordovaService) {

        CordovaService.ready.then(function () {
            window.scrollTo(0, 0);

            artistData.getArtist($routeParams.artistId).then(function (result) {
                $scope.selectedArtist = result;


            });

            artistData.getMusic($routeParams.artistId).then(function (result) {

                    $.each(result, function(i, item) {
                        item.audio = $sce.trustAsHtml("<audio controls='controls' preload='none'><source src='" + item.musicUrl + "' /></audio>");
                    });
                $scope.music = result;
            });

            concertData.getConcertsByArtist($routeParams.artistId).then(function (result) {
                $scope.concertListForArtist = result;
            });

            $scope.showArtistList = function () {
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


            $scope.openTwitterURL = function () {
                appHelper.openTwitterSite($scope.selectedArtist.twitter);
            }

            $scope.openFacebookURL = function () {
                appHelper.openFacebookSite($scope.selectedArtist.facebook);
            }

            $scope.openInstagramURL = function () {
                appHelper.openInstagramSite($scope.selectedArtist.instagram);
            }
            $scope.openBandURL = function () {
                appHelper.openWebsiteUrl($scope.selectedArtist.url);
            }

            // Answer if the concert is part of the schedule of favorites
            $scope.checkSchedule = function (concertId) {
                return myScheduleData.checkSchedule(concertId);
            }

            // Remove the concert from the favorites
            $scope.removeFavorite = function (concertId) {
                myScheduleData.removeFavorite(concertId);
            };

            // Save the concert to the favorites
            $scope.saveFavorite = function (concertId) {
                myScheduleData.saveFavorite(concertId);
            };
        });
    });