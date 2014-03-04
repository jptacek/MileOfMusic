mileOfMusicApp.factory('concertData', function($http, $log, $q, appHelper,venueData) {
    var getConcerts = function(artistData,venueData)  {
        $log.info('getconcert in: ' + concertsData.concerts.length);
        for (var i = 0, len = concertsData.concerts.length; i < len; ++i) {
            $log.info('foo1: ');
            concertsData.concerts[i].artist = artistData.getArtist(concertsData.concerts[i].artistId);
            $log.info('foo: ' + concertsData.concerts[i].artist);
        }
        $log.info('getconcert out');
        return concertsData;
    };

    var getConcert = function(concertId,artistData)  {
        $log.info('getArtists in');
        var concertListIndex = appHelper.buildIndex(concertsData.concerts,'concertId');

        return concertListIndex[concertId];
    };

    return {
        getConcerts: getConcerts,
        getConcert: getConcert
    };
});


var concertsData = {
    concerts: [
        {
            "concertId": 4,
            "artistId": 1,
            "venueId": 1,
            "time": "2014-08-08T22:00:00Z"
        },
        {
            "concertId": 5,
            "artistId": 7,
            "venueId": 4,
            "time": "2014-08-07T21:00:00Z"
        }

    ]
};