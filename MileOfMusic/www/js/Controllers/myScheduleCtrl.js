mileOfMusicApp.controller('myScheduleController',
    function ($scope, $log, $routeParams, myScheduleData, CordovaService) {
        $log.info('mySchedule here');

        CordovaService.ready.then(function() {
            $log.info('mySchedule  in');
            myScheduleData.getMySchedule().then(function (result) {
                //$log.info('mySchedule list in');
                //console.log(result);
                $scope.mySchedule = result;
            });


            $scope.removeFavorite = function (concertId) {
                //$log.info("saveFavorite");
                try {
                    var result = myScheduleData.removeConcertFromMySchedule(concertId);
                    if (result) {
                        toastr["success"]("Concert has been removed to your schedule.", "Success");
                        myScheduleData.getMySchedule().then(function (result) {
                            //$log.info('mySchedule list in');
                            //console.log(result);
                            $scope.mySchedule = result;
                        });
                    }
                    else {
                        toastr["info"]("Concert was not in your schedule.", "Already Removed");
                    }
                }
                catch (err) {
                    toastr["error"](err.message, "Error");
                }
            };
            
            $scope.clearSchedule = function () {
                myScheduleData.clearSavedBookmarks();
                $scope.mySchedule = [];
            };

        });
    });