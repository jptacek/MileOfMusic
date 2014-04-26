mileOfMusicApp.factory('concertData', function($http, $log, $q,artistData, venueData,appHelper) {
    var getConcerts = function()  {
        $log.info('getconcert in: ' + concertsData.concerts.length);
        for (var i = 0, len = concertsData.concerts.length; i < len; ++i) {
            $log.info('foo1: ');
            concertsData.concerts[i].artist = artistData.getArtist(concertsData.concerts[i].artistId);
            $log.info('foo: ' + concertsData.concerts[i].artist);
        }
        $log.info('getconcert out');
        return concertsData;
    };

    var getConcert = function(concertId)  {
        $log.info('getArtists in');
        var concertListIndex = appHelper.buildIndex(concertsData.concerts,'concertId');
        var concertListItem = concertListIndex[concertId]
        concertListItem.artist  = artistData.getArtist(concertListIndex[concertId].artistId);
        concertListItem.venue = venueData.getVenue(concertListIndex[concertId].venueId);
        return concertListItem;
    };

    return {
        getConcerts: getConcerts,
        getConcert: getConcert
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