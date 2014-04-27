mileOfMusicApp.factory('myScheduleData', function ($http, $log, $q, concertData, appHelper) {

    var getMySchedule = function () {
        var deferred = $q.defer();

        concertData.getConcerts().then(function (result) {
            $log.info('myScheduleData list in');
            deferred.resolve(result);
        }, function() { deferred.reject(); });

        return deferred.promise;
    };

    return {
        getMySchedule: getMySchedule
    };
});

