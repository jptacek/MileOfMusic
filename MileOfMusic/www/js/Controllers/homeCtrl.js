mileOfMusicApp.controller('homeController',
    function ($scope, $log, CordovaService, artistData, concertData, venueData) {
        CordovaService.ready.then(function() {
            artistData.getArtists();
            concertData.getConcerts();
            venueData.getVenues();
        });
    });
