mileOfMusicApp.controller('myScheduleController',
    function ($scope, $log, $routeParams, myScheduleData, CordovaService) {

        CordovaService.ready.then(function () {
            alert('getting data');
            myScheduleData.getMySchedule().then(function (result) {
                alert('received data');
                $scope.mySchedule = result;
            });


            $scope.removeFavorite = function (concertId) {
                try {
                    var result = myScheduleData.removeConcertFromMySchedule(concertId);
                    if (result) {
                        toastr["success"]("Concert has been removed to your schedule.", "Success");
                        myScheduleData.getMySchedule().then(function (result) {
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