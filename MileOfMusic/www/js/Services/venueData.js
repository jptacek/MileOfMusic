mileOfMusicApp.factory('venueData', function ($http, $log, $q, appHelper, commonData) {

    //var versionUrl = "http://localhost:64618/Data/GetJson?callback=JSON_CALLBACK&filename=Venues.txt.version";
    //var dataUrl = "http://localhost:64618/Data/GetJson?callback=JSON_CALLBACK&filename=Venues.txt";
    var versionUrl = "http://mileofmusicmobile.azurewebsites.net/Data/GetJson?callback=JSON_CALLBACK&filename=Venues.txt.version";
    var dataUrl = "http://mileofmusicmobile.azurewebsites.net/Data/GetJson?callback=JSON_CALLBACK&filename=Venues.txt";

    var storageKey_getVenues = "venueData-getVenues";

    var cache_venueList = null;
    var cache_getVenue = null;

    var getVenues = function () {
        var deferred = $q.defer();

        var checkForMissingImages = function (result) {
            return commonData.checkForMissingImages(result.venues, "venueId", "venueImages");
        }

        // if the list is not in the cache, then build it
        commonData.getRemoteData(storageKey_getVenues, versionUrl, dataUrl, "initialVenueJson", function () { cache_getVenue = null; }, checkForMissingImages,
            function () { return cache_venueList; }).then(function (result) {
                cache_venueList = result;
                cache_getVenue = appHelper.buildIndex(result.data.venues, "venueId");
                deferred.resolve(cache_venueList);
            }, function () { deferred.reject(); });

        return deferred.promise;
    };

    var getVenue = function (venueId) {
        var deferred = $q.defer();

        if (cache_getVenue == null) {
            getVenues().then(function (result) {
                cache_getVenue = appHelper.buildIndex(result.data.venues, "venueId");
                deferred.resolve(cache_getVenue[venueId]);
            }, function () { deferred.reject(); });
        }
        else {
            deferred.resolve(cache_getVenue[venueId]);
        }

        return deferred.promise;
    };

    return {
        getVenues: getVenues,
        getVenue: getVenue
    };
});
