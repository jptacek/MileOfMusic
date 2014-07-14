mileOfMusicApp.controller('venueController',
    function($scope,$log,$routeParams, venueData, myScheduleData, CordovaService,concertData) {

        CordovaService.ready.then(function() {

            venueData.getVenue($routeParams.venueId).then(function (result) {
                $scope.selectedVenue = result;
            });

            $scope.isLoading = true;
            concertData.getConcertsByVenue($routeParams.venueId).then(function (result) {
                $scope.shows = result;                
                $scope.isLoading = true;
            }, function () { $scope.isLoading = false; });

            $scope.showVenueList = function(){
                window.location.href = "#venueList";
            }

            $scope.openTwitterURL = function () {
                openURL('http://www.twitter.com/' + $scope.selectedVenue.twitter);
            }

            $scope.openFacebookURL = function () {
                openURL($scope.selectedVenue.facebook);
            }

            $scope.openInstagramURL = function () {
                openURL('http://www.instagram.com/' + $scope.selectedVenue.instagram);
            }
            $scope.openVenueURL = function () {
                openURL('http://'+$scope.selectedVenue.url);
            }

            $scope.openMapsURL = function () {
                openURL('http://bing.com/maps/default.aspx?where1=' + $scope.selectedVenue.address + ',' + $scope.selectedVenue.city + ',' + $scope.selectedVenue.state);
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
