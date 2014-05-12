mileOfMusicApp.controller('concertsListController',
    function($scope,$log, artistData, concertData,venueData,CordovaService) {
        //$log.info('heop');
        //if (artistData) {
        //    $log.info('defined');
        //}
        //else {
        //    $log.info('not defined');
        //}

        CordovaService.ready.then(function() {
            concertData.getConcerts().then(function (result) {
                //$log.info('concert list in');
                console.log(result);
                $scope.shows = result.data;
                $scope.setSelectedTab(1);
            });

            // this is used to control the tabs on the Artist Detail page.
            // Each tab should work with it's own uniqye index 
            $scope.selectedTabIndex = 1;
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
                        console.log(result)
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
        });
    });

