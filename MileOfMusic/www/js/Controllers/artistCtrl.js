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

            // Answer if the concert is part of the schedule of favorites
            $scope.checkSchedule = function (concertId) {
                return myScheduleData.getSavedBookmarkList().indexOf(concertId) < 0;
            }

            // Remove the concert from the favorites
            $scope.removeFavorite = function (concertId) {
                //$log.info("saveFavorite");
                try {
                    var result = myScheduleData.removeConcertFromMySchedule(concertId);
                    if (result) {
                        toastr["success"]("Concert has been removed to your schedule.", "Success");
                    }
                    else {
                        toastr["info"]("Concert was not in your schedule.", "Already Removed");
                    }
                }
                catch (err) {
                    toastr["error"](err.message, "Error");
                }
            };

            // Save the concert to the favorites
            $scope.saveFavorite = function (concertId) {
                //$log.info("saveFavorite");
                try {
                    var result = myScheduleData.saveConcertToMySchedule(concertId);
                    if (result) {
                        toastr["success"]("Concert has been added to your schedule.", "Success");
                    }
                    else {
                        toastr["info"]("Concert was already in your schedule.", "Already Exists");
                    }
                }
                catch (err) {
                    toastr["error"](err.message, "Error");
                }
            };
        });
    });