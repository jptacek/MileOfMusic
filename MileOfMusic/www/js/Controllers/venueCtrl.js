mileOfMusicApp.controller('venueController',
    function($scope,$log,$routeParams, venueData, myScheduleData,appHelper, CordovaService,concertData) {

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
                window.location.href = "#/venueList";
            }

            $scope.openTwitterURL = function () {
                appHelper.openTwitterSite($scope.selectedVenue.twitter);
            }

            $scope.openFacebookURL = function () {
                appHelper.openFacebookSite($scope.selectedVenue.facebook);
            }

            $scope.openInstagramURL = function () {
                appHelper.openInstagramSite($scope.selectedVenue.instagram);
            }
            $scope.openVenueURL = function () {
                appHelper.openWebsiteUrl($scope.selectedVenue.url);
            }

            $scope.openMapsURL = function () {
                appHelper.openMapsURL($scope.selectedVenue.address, $scope.selectedVenue.city, $scope.selectedVenue.state);
                //openURL('https://www.google.com/maps/place/' + $scope.selectedVenue.address + ',' + $scope.selectedVenue.city + ',' + $scope.selectedVenue.state);
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
