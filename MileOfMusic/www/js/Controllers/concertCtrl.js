mileOfMusicApp.controller('concertController',
    function ($scope, $log, $routeParams, concertData, artistData, venueData, myScheduleData,CordovaService) {

        CordovaService.ready.then(function() {

            concertData.getConcert($routeParams.concertId).then(function (result) {
                $scope.selectedConcert = result;
            });

            $scope.showConcertList = function(){
                window.location.href = "#/concertList";
            }

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