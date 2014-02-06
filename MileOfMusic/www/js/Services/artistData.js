mileOfMusicApp.factory('artistData', function($http, $log, $q) {
    var getArtists = function()  {
            $log.info('getArtists in');
            return artistsData;
    };

    var getArtist = function(artistId)  {
        $log.info('getArtists in');
        return artistsData.artists[artistId-1];
    };

    return {
        getArtists: getArtists,
        getArtist: getArtist
    };
});


var artistsData = {
    artists: [
        {
            "artistId": 1,
            "artistName": "California Wives",
            "twitter": "californiawives",
            "instagram": "",
            "facebook": "https://www.facebook.com/CaliforniaWives",
            "description": "Indie rock band from Chicago with darker ’80s rock and New-Wave influences. The group released their debut album in 2012.",
            "url": "http://californiawives.com/"
        },
        {
            "artistId": 2,
            "artistName": "Cory Chisel",
            "twitter": "corychisel",
            "instagram": "",
            "facebook": "https://www.facebook.com/corychisel",
            "description": "",
            "url": "http://corychisel.com/"
        },
        {
            "artistId": 3,
            "artistName": "Mel Flannery",
            "twitter": "melflannery",
            "instagram": "",
            "facebook": "https://www.facebook.com/melflannerytruckingcompany",
            "description": "A few years back, when Melanie Flannery graduated from the prestigious Manhattan School of Music as a jazz performance major, the classically trained singer could have taken the easy road and accepted various offers to record and perform as a standards singer. Opting instead to take the more challenging but creatively fulfilling route of forming her own band, Mel Flannery Trucking Co., the multi-talented singer/songwriter and her brilliant all-male trio forged ahead with an organic, eclectic sound that has shaken the foundation of New York’s independent music scene. Appealing coolly to everyone from punk rock lovers to jazz aficionados and fans of sultry, envelope pushing pop/rock, the band fashions a tasty new hybrid Flannery dubs “avant-soul” on their upcoming third album As It Turns Out. ",
            "url": "http://melflannerytruckingco.com/"
        },
        {
            "artistId": 4,
            "artistName": "Travelling Suitcases",
            "twitter": "trvlingsuitcase",
            "instagram": "",
            "facebook": "https://www.facebook.com/TheTravelingSuitcase",
            "description": "",
            "url": "http://thetravelingsuitcase.bandcamp.com/"
        }
    ]
};