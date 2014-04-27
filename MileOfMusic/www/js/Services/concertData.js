mileOfMusicApp.factory('concertData', function($http, $log, $q, artistData, venueData, appHelper) {
    var getConcerts = function () {
        var deferred = $q.defer();

        $http.get('data/Concerts.txt').then(function (result) {
            $.each(result.data.concerts, function (i, item) {
                venueData.getVenue(item.venueId).then(function (result) {
                    item.venue = result;
                } ,function(data, status) {
                    item.venue = null;
                    $log.error(data);
                });
                artistData.getArtist(item.artistId).then(function (result) {
                    item.artist = result;
                }, function (data, status) {
                    item.artist = null;
                    $log.error(data);
                });
            });

            var interval = setInterval(function () {
                var isAllDataLoaded = true;
                $.each(result.data.concerts, function (i, item) {
                    if (item.venue == undefined || item.artist == undefined) {
                        isAllDataLoaded = false;
                        return false;
                    }
                });
                if (isAllDataLoaded) {
                    deferred.resolve(result);
                }
            }, 100);

        });

        return deferred.promise;
    };

    var getConcert = function(concertId)  {
        $log.info('getArtists in');

        var deferred = $q.defer();

        getConcerts().then(function (result) {
            var dict = appHelper.buildIndex(result.data.concerts, 'concertId');
            var concert = dict[concertId];
            console.log(concert)
            artistData.getArtist(concert.artistId).then(function (result) {
                concert.artist = result;

                venueData.getVenue(concert.venueId).then(function (result) {
                    concert.venue = result;
                    deferred.resolve(concert);
                });
            });
        }, function () { deferred.reject(); });

        return deferred.promise;

        //var concertListIndex = appHelper.buildIndex(concertsData.concerts,'concertId');
        //var concertListItem = concertListIndex[concertId]
  
        //return concertListItem;
    };

    var getConcertsByVenue = function (venueId) {
        var deferred = $q.defer();

        $http.get('data/Concerts.txt').then(function (result) {
            $.each(result.data.concerts, function (i, item) {
                artistData.getArtist(item.artistId).then(function (result) {
                    item.artist = result;
                }, function (data, status) {
                    item.artist = null;
                    $log.error(data);
                });
            });

            var interval = setInterval(function () {
                var isAllDataLoaded = true;
                $.each(result.data.concerts, function (i, item) {
                    if (item.artist == undefined) {
                        isAllDataLoaded = false;
                        return false;
                    }
                });
                if (isAllDataLoaded) {
                    var ary = [];
                    $.each(result.data.concerts, function (i, item) {
                        if (item.venueId == venueId) {
                            ary.push(item);
                        }
                    });
                    deferred.resolve(ary);
                }
            }, 100);

        });

        return deferred.promise;
    };

    var getConcertsByArtist = function (artistId) {
        var deferred = $q.defer();

        $http.get('data/Concerts.txt').then(function (result) {
            $.each(result.data.concerts, function (i, item) {

                // add the artist data to each concert
                artistData.getArtist(item.artistId).then(function (result) {
                    item.artist = result;
                }, function (data, status) {
                    item.artist = null;
                    $log.error(data);
                });

                // add the venue data to each concert
                venueData.getVenue(item.venueId).then(function (result) {
                    item.venue = result;
                }, function (data, status) {
                    item.venue = null;
                    $log.error(data);
                });
            });

            var interval = setInterval(function () {
                var isAllDataLoaded = true;
                $.each(result.data.concerts, function (i, item) {
                    if (item.artist == undefined) {
                        isAllDataLoaded = false;
                        return false;
                    }
                });
                if (isAllDataLoaded) {
                    var ary = [];
                    $.each(result.data.concerts, function (i, item) {
                        if (item.artistId == artistId) {
                            ary.push(item);
                        }
                    });
                    deferred.resolve(ary);
                }
            }, 100);

        });

        return deferred.promise;
    };

    return {
        getConcerts: getConcerts,
        getConcert: getConcert,
        getConcertsByVenue: getConcertsByVenue,
        getConcertsByArtist: getConcertsByArtist
    };
});


var concertsData = {
    concerts: [
        {
            "concertId": 1,
            "artistId": 1,
            "venueId": 1,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 2,
            "artistId": 2,
            "venueId": 2,
            "time": "2014-08-07T21:30:00Z"
        },
        {
            "concertId": 3,
            "artistId": 3,
            "venueId": 1,
            "time": "2014-08-07T22:00:00Z"
        },
        {
            "concertId": 4,
            "artistId": 4,
            "venueId": 31,
            "time": "2014-08-07T22:30:00Z"
        },
        {
            "concertId": 6,
            "artistId": 5,
            "venueId": 29,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 8,
            "artistId": 31,
            "venueId": 23,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 10,
            "artistId": 40,
            "venueId": 13,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 11,
            "artistId": 45,
            "venueId": 18,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 13,
            "artistId": 28,
            "venueId": 26,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 14,
            "artistId": 29,
            "venueId": 8,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 15,
            "artistId": 39,
            "venueId": 30,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 16,
            "artistId": 51,
            "venueId": 44,
            "time": "2014-08-07T19:00:00Z"
        },
        {
            "concertId": 17,
            "artistId": 44,
            "venueId": 41,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 18,
            "artistId": 51,
            "venueId": 30,
            "time": "2014-08-07T21:00:00Z"
        },
        {
            "concertId": 19,
            "artistId": 57,
            "venueId": 38,
            "time": "2014-08-07T21:00:00Z"
        }               

    ]
};