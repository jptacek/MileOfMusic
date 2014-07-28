mileOfMusicApp.factory('concertData', function ($http, $log, $q, artistData, venueData, appHelper, commonData) {

    //var versionUrl = "http://localhost:64618/Data/GetJson?callback=JSON_CALLBACK&filename=Concerts.txt.version";
    //var dataUrl = "http://localhost:64618/Data/GetJson?callback=JSON_CALLBACK&filename=Concerts.txt";
    var versionUrl = "http://mileofmusicmobile.azurewebsites.net/Data/GetJson?callback=JSON_CALLBACK&filename=Concerts.txt.version";
    var dataUrl = "http://mileofmusicmobile.azurewebsites.net/Data/GetJson?callback=JSON_CALLBACK&filename=Concerts.txt";

    var storageKey_getConcerts = "concertData-getConcerts";
    var cache_concertList = null;
    var cache_getConcert = null;
    var cache_getConcertsByVenue = null;
    var cache_getConcertsByArtist = null;

    var getConcerts = function () {
        var deferred = $q.defer();

        // the list is not in cache, so build it
        commonData.getRemoteData(storageKey_getConcerts, versionUrl, dataUrl, "initialConcertJson", function () {
            cache_getConcert = null;
            cache_getConcertsByVenue = null;
            cache_getConcertsByArtist = null;
            cache_concertList = null;
        }, null, function () { return cache_concertList; }).then(function (result) {
            $.each(result.data.concerts, function (i, concert) {
                concert.artistData = [];
                $.each(concert.artists, function (j, artist) {
                    // populate the artist into the concert
                    artistData.getArtist(artist).then(function (result) {
                        concert.artistData.push(result);
                    }, function () { concert.artistData.push(null); });
                });

                // populate the venue into the concert
                venueData.getVenue(concert.venueId).then(function (result) {
                    concert.venue = result;
                }, function () { concert.venue = null; });

            });


            var attempts = 0;
            var interval = setInterval(function () {
                var allAssigned = true;

                // the promise only resolves when each concert contains both an artist and venue
                $.each(result.data.concerts, function (i, item) {
                    if (item.venue == undefined || item.artistData.length != item.artists.length) {
                        allAssigned = false;
                        return false;
                    }
                });

                attempts++;
                if (allAssigned || attempts >= 50) {
                    clearInterval(interval);
                    cache_concertList = result;
                    deferred.resolve(cache_concertList);
                }
            }, 100);

        }, function () { deferred.reject(); });

        return deferred.promise;
    };

    var getConcert = function (concertId) {
        var deferred = $q.defer();

        if (cache_getConcert == null) {
            getConcerts().then(function (result) {
                cache_getConcert = appHelper.buildIndex(result.data.concerts, "concertId");
                deferred.resolve(cache_getConcert[concertId]);
            }, function () { deferred.reject(); });
        }
        else {
            deferred.resolve(cache_getConcert[concertId]);
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
                    $.each(item.artists, function (i, artistId) {
                        if (lookup[artistId] == undefined) {
                            lookup[artistId] = [];
                        }
                        lookup[artistId].push(item);
                    });
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