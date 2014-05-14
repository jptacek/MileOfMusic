mileOfMusicApp.controller('venueController',
    function($scope,$log,$routeParams, venueData, myScheduleData, CordovaService,concertData) {

        CordovaService.ready.then(function() {

            venueData.getVenue($routeParams.venueId).then(function (result) {
                $scope.selectedVenue = result;
            });

            concertData.getConcertsByVenue($routeParams.venueId).then(function (result) {
                $scope.shows = result;
            });

            $scope.showVenueList = function(){
                window.location.href = "#venueList";
            }

            $scope.checkSchedule = function (concertId) {
                return myScheduleData.getSavedBookmarkList().indexOf(concertId) < 0;
            }

            // this is used to control the tabs on the Venue Detail page.
            // Each tab should work with it's own unique index 
            $scope.selectedTabIndex = 1;
            $scope.setSelectedTab = function (tabId) {
                $scope.selectedTabIndex = tabId;
            };
            $scope.shouldShowTab = function (tabId) {
                return tabId == $scope.selectedTabIndex;
            };

            $scope.removeFavorite = function (concertId) {
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

            $scope.saveFavorite = function (concertId) {
                try
                {
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
