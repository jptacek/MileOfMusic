mileOfMusicApp.controller('concertsListController',
    function ($scope, $log, artistData, concertData, venueData, CordovaService, navFactory, myScheduleData) {
        navFactory.assignCanSearchAZ(true);

        CordovaService.ready.then(function() {
            concertData.getConcerts().then(function (result) {
                $scope.shows = result.data;
                $scope.setSelectedTab(1);
            });

            // this is used to control the tabs on the Artist Detail page.
            // Each tab should work with it's own uniqye index 
            $scope.setSelectedTab = function (tabId) {
                $scope.selectedTabIndex = tabId;

                var currentDate = new Date();

                switch(tabId)
                {
                    case 1:
                        // Thursday
                        var result = [];
                        $.each($scope.shows.concerts, function (i, item) {
                            var date = new Date(item.timeStart);
                            if (date > currentDate && date.getDay() == 4) { // Thursay
                                result.push(item);
                            }
                        });
                        $scope.currentShows = result;
                        break;
                    case 2:
                        // Friday
                        var result = [];
                        $.each($scope.shows.concerts, function (i, item) {
                            var date = new Date(item.timeStart);
                            if (date > currentDate && date.getDay() == 5) { // Friday
                                result.push(item);
                            }
                        });
                        $scope.currentShows = result;
                        break;
                    case 3:
                        // Saturday
                        var result = [];
                        $.each($scope.shows.concerts, function (i, item) {
                            var date = new Date(item.timeStart);
                            if (date > currentDate && date.getDay() == 6) { // Saturday
                                result.push(item);
                            }
                        });
                        $scope.currentShows = result;
                        break;
                    case 4:
                        // Sunday
                        var result = [];
                        $.each($scope.shows.concerts, function (i, item) {
                            var date = new Date(item.timeStart);
                            if (date > currentDate && date.getDay() == 0) { // Sunday
                                result.push(item);
                            }
                        });
                        $scope.currentShows = result;
                        break;

                }
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

