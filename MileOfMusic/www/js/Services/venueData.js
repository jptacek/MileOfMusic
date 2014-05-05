mileOfMusicApp.factory('venueData', function ($http, $log, $q, appHelper, commonData) {

    //var versionUrl = "http://localhost:64618/Data/GetJson?callback=JSON_CALLBACK&filename=Venues.txt.version";
    //var dataUrl = "http://localhost:64618/Data/GetJson?callback=JSON_CALLBACK&filename=Venues.txt";
    var versionUrl = "http://mileofmusicmobile.azurewebsites.net/Data/GetJson?callback=JSON_CALLBACK&filename=Venues.txt.version";
    var dataUrl = "http://mileofmusicmobile.azurewebsites.net/Data/GetJson?callback=JSON_CALLBACK&filename=Venues.txt";
    
    var storageKey_getVenues = "venueData-getVenues";
    var cache_geVenue = null;

    var getVenues = function () {
        var deferred = $q.defer();

        var checkForMissingImages = function (result) { return commonData.checkForMissingImages(result.venues, "venueId", "venueImages"); }

        commonData.getRemoteData(storageKey_getVenues, versionUrl, dataUrl, function() { cache_geVenue = null; }, checkForMissingImages).then(function (result) {
            deferred.resolve(result);
        }, function () { deferred.reject(); });

        return deferred.promise;
    };

    var getVenue = function (venueId) {
        var deferred = $q.defer();

        if (cache_geVenue == null) {
            getVenues().then(function (result) {
                cache_geVenue = appHelper.buildIndex(result.data.venues, "venueId");
                deferred.resolve(cache_geVenue[venueId]);
            }, function () { deferred.reject(); });
        }
        else {
            deferred.resolve(cache_geVenue[venueId]);
        }

        return deferred.promise;
    };

    return {
        getVenues: getVenues,
        getVenue: getVenue
    };
});
