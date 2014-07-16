mileOfMusicApp.controller('myScheduleController',
    function ($scope, $log, $routeParams, myScheduleData, CordovaService) {

        CordovaService.ready.then(function() {
            myScheduleData.getMySchedule().then(function (result) {
                $scope.mySchedule = result;
            });


            $scope.removeFavorite = function (concertId) {
                myScheduleData.removeFavorite(concertId);
            };
            
            $scope.clearSchedule = function () {
                myScheduleData.clearSavedBookmarks();
                $scope.mySchedule = [];
            };

        });
    });