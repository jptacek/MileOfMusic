mileOfMusicApp.controller('concertsListController',
    function ($scope, $log, artistData, concertData, venueData, notificationFactory,CordovaService, navFactory, myScheduleData) {
        navFactory.assignCanSearchAZ(true);

        CordovaService.ready.then(function () {
            $scope.isLoading = true;
            concertData.getConcerts().then(function (result) {
                $scope.shows = result.data;
                $scope.setSelectedTab(1);
                $scope.isLoading = false;
            }, function () { $scope.isLoading = false; });

            // this is used to control the tabs on the Artist Detail page.
            // Each tab should work with it's own uniqye index 
            $scope.setSelectedTab = function (tabId) {
                $scope.selectedTabIndex = tabId;

                var currentDate = new Date();

                if ($scope.shows != undefined) {
                    switch (tabId) {
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
                }
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
            // Answer if the concert is part of the schedule of favorites
            $scope.checkSchedule = function (concertId) {
                return myScheduleData.getSavedBookmarkList().indexOf(concertId) < 0;
            }

            // Remove the concert from the favorites
            $scope.removeFavorite = function (concertId) {
                try {
                    var result = myScheduleData.removeConcertFromMySchedule(concertId);
                    if (result) {
                        notificationFactory.success("Concert has been removed from your schedule.");
                    }
                    else {
                        notificationFactory.info("Concert was not in your schedule.");
                    }
                }
                catch (err) {
                    notificationFactory.error(err.message);
                }
            };

            // Save the concert to the favorites
            $scope.saveFavorite = function (concertId) {
                try {
                    var result = myScheduleData.saveConcertToMySchedule(concertId);
                    if (result) {
                        notificationFactory.success("Concert has been added to your schedule.");
                    }
                    else {
                        notificationFactory.info("Concert was already in your schedule.");
                    }
                }
                catch (err) {
                    notificationFactory.error(err.message);
                }
            };
        });
    });

