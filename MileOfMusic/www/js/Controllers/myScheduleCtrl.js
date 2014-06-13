mileOfMusicApp.controller('myScheduleController',
    function ($scope, $log, $routeParams, myScheduleData, CordovaService) {

        alert('stat me i[');

        CordovaService.ready.then(function () {
            alert('getting data');


        });
    });