mileOfMusicApp.controller('myScheduleController2',
    function ($scope, $log, $routeParams,myScheduleData,  CordovaService) {

        alert('stat me i[');

        CordovaService.ready.then(function () {
            alert('getting data');


        });
    });