angular.module('mileOfMusicApp', ['fsCordova'])
    .controller('artistsListController',
    function($scope,$log, CordovaService) {
        CordovaService.ready.then(function() {
            $scope.performers =artistsData;
            $log.info('hello from artist list');

        });
    });

var artistsData = {
    artists: [
        {
            "artistName": "California Wives",
            "twitter": "californiawives",
            "instagram": "",
            "facebook": "https://www.facebook.com/CaliforniaWives",
            "description": "",
            "url": "http://californiawives.com/"
        },
        {
            "artistName": "Cory Chisel",
            "twitter": "corychisel",
            "instagram": "",
            "facebook": "https://www.facebook.com/corychisel",
            "description": "",
            "url": "http://corychisel.com/"
        },
        {
            "artistName": "Travelling Suitcases",
            "twitter": "trvlingsuitcase",
            "instagram": "",
            "facebook": "https://www.facebook.com/TheTravelingSuitcase",
            "description": "",
            "url": "http://californiawives.com/"
        }
    ]
};


