mileOfMusicApp.factory('concertData', function($http, $log, $q, appHelper) {
    var getConcerts = function()  {
        $log.info('getconcert in');
        return concertsData;
    };

    var getConcert = function(concertId)  {
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