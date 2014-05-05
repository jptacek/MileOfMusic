mileOfMusicApp.controller('myScheduleController',
    function ($scope, $log, $routeParams, myScheduleData, CordovaService) {
        $log.info('mySchedule here');

        CordovaService.ready.then(function() {
            $log.info('mySchedule  in');
            myScheduleData.getMySchedule().then(function (result) {
                $log.info('mySchedule list in');
                console.log(result);
                $scope.mySchedule = result;
            });


            $scope.clearSchedule = function () {
                myScheduleData.clearSavedBookmarks();
            };

        });
    });