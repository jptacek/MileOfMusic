mileOfMusicApp.factory('concertData', function ($http, $log, $q, artistData, venueData, appHelper, commonData) {

    //var versionUrl = "http://localhost:64618/Data/GetJson?callback=JSON_CALLBACK&filename=Concerts.txt.version";
    //var dataUrl = "http://localhost:64618/Data/GetJson?callback=JSON_CALLBACK&filename=Concerts.txt";
    var versionUrl = "http://mileofmusicmobile.azurewebsites.net/Data/GetJson?callback=JSON_CALLBACK&filename=Concerts.txt.version";
    var dataUrl = "http://mileofmusicmobile.azurewebsites.net/Data/GetJson?callback=JSON_CALLBACK&filename=Concerts.txt";

    var storageKey_getConcerts = "concertData-getConcerts";
    var cache_geConcert = null;
    var cache_getConcertsByVenue = null;
    var cache_getConcertsByArtist = null;

    var getConcerts = function () {
        var deferred = $q.defer();

        commonData.getRemoteData(storageKey_getConcerts, versionUrl, dataUrl, function() {
            cache_geConcert = null;
            cache_getConcertsByVenue = null;
            cache_getConcertsByArtist = null;
        }, null).then(function (result) {
            $.each(result.data.concerts, function (i, concert) {
                artistData.getArtist(concert.artistId).then(function (result) {
                    concert.artist = result;
                }, function () { concert.artist = null; });
                venueData.getVenue(concert.venueId).then(function (result) {
                    concert.venue = result;
                }, function () { concert.venue = null; });

                var interval = setInterval(function () {
                    var allAssigned = true;
                    $.each(result.data.concerts, function (i, item) {
                        if (item.artist == undefined || item.venue == undefined) {
                            allAssigned = false;
                            return false;
                        }
                    });
                    if (allAssigned) {
                        clearInterval(interval);
                        deferred.resolve();
                    }
                }, 100);                
            });
            deferred.resolve(result);
        }, function () { deferred.reject(); });

        return deferred.promise;
    };

    var getConcert = function (concertId) {
        var deferred = $q.defer();

        if (cache_geConcert == null) {
            getConcerts().then(function (result) {
                cache_geConcert = appHelper.buildIndex(result.data.concerts, "concertId");
                deferred.resolve(cache_geConcert[concertId]);
            }, function () { deferred.reject(); });
        }
        else {
            deferred.resolve(cache_geConcert[concertId]);
        }

        return deferred.promise;
    };

    var getConcertsByVenue = function (venueId) {
        var deferred = $q.defer();

        if (cache_getConcertsByVenue == null) {
            getConcerts().then(function (result) {
                var lookup = [];
                $.each(result.data.concerts, function (i, item) {
                    if (lookup[item.venueId] == undefined) {
                        lookup[item.venueId] = [];
                    }
                    lookup[item.venueId].push(item);
                });
                cache_getConcertsByVenue = lookup;
                deferred.resolve(cache_getConcertsByVenue[venueId]);
            }, function () { deferred.reject(); });
        }
        else {
            deferred.resolve(cache_getConcertsByVenue[venueId]);
        }

        return deferred.promise;
    };

    var getConcertsByArtist = function (artistId) {
        var deferred = $q.defer();

        if (cache_getConcertsByArtist == null) {
            getConcerts().then(function (result) {
                var lookup = [];
                $.each(result.data.concerts, function (i, item) {
                    if (lookup[item.artistId] == undefined) {
                        lookup[item.artistId] = [];
                    }
                    lookup[item.artistId].push(item);
                });
                cache_getConcertsByArtist = lookup;
                deferred.resolve(cache_getConcertsByArtist[artistId]);
            }, function () { deferred.reject(); });
        }
        else {
            deferred.resolve(cache_getConcertsByArtist[artistId]);
        }

        return deferred.promise;
    };

    return {
        getConcerts: getConcerts,
        getConcert: getConcert,
        getConcertsByVenue: getConcertsByVenue,
        getConcertsByArtist: getConcertsByArtist
    };
});