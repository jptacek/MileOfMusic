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