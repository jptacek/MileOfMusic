mileOfMusicApp.controller('mySchedule2',
    function ($scope, $log, $routeParams,  CordovaService) {

        alert('stat me i[');
        $scope.foo = "test";
        CordovaService.ready.then(function () {
            alert('getting data');


        });
    });