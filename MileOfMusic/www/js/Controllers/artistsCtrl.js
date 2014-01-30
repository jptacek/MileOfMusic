angular.module('mileOfMusicApp', ['fsCordova'])
    .controller('artistsController',
    function($scope, CordovaService) {
        $scope.kitty = "foo";
        CordovaService.ready.then(function() {
            $scope.performers ={
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
                        "artistName": "Travelling Suitcases",
                        "twitter": "trvlingsuitcase",
                        "instagram": "",
                        "facebook": "https://www.facebook.com/TheTravelingSuitcase",
                        "description": "",
                        "url": "http://californiawives.com/"
                    }
                ]
            };
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
            "artistName": "Travelling Suitcases",
            "twitter": "trvlingsuitcase",
            "instagram": "",
            "facebook": "https://www.facebook.com/TheTravelingSuitcase",
            "description": "",
            "url": "http://californiawives.com/"
        }
    ]
};

