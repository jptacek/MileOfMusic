angular.module('fsCordova', [])
    .service('CordovaService', ['$document', '$q',
        function($document, $q) {

            var d = $q.defer(),
                resolved = false;

            var self = this;
            this.ready = d.promise;

            document.addEventListener('deviceready', function() {
                resolved = true;
                d.resolve(window.cordova);
            });

            // Check to make sure we didn't miss the
            // event (just in case)
            setTimeout(function() {
                if (!resolved) {
                    if (window.cordova) d.resolve(window.cordova);
                }
            }, 3000);
        }]);

mileOfMusicApp = angular.module('mileOfMusicApp', ['fsCordova','ngRoute']).
    config(function($routeProvider) {
        $routeProvider
            .when('/artistList',
            {
                templateUrl:'templates/artistList.html',
                controller: 'artistsListController'
            })
            .when('/artist/:artistId',
            {
                templateUrl:'templates/artist.html',
                controller: 'artistController'
            })
            .when('/venueList',
            {
                templateUrl:'templates/venueList.html',
                controller: 'venueListController'
            })
            .when('/venue/:venueId',
            {
                templateUrl:'templates/venue.html',
                controller: 'venueController'
            })
            .when('/concertList',
            {
                templateUrl:'templates/concertList.html',
                controller: 'concertsListController'
            })
            .when('/concert/:concertId',
            {
                templateUrl:'templates/concert.html',
                controller: 'concertController'
            })
            .when('/info',
            {
                templateUrl:'templates/info.html'
            })
            .when('/festivalStory',
            {
                templateUrl:'templates/story.html'
            })
            .when('/tickets',
            {
                templateUrl:'templates/tickets.html'
            })
            .when('/directions',
            {
                templateUrl:'templates/directions.html'
            })
            .when('/sponsors',
            {
                templateUrl:'templates/sponsors.html'
            })
            .when('/volunteers',
            {
                templateUrl:'templates/volunteers.html'
            })
            .when('/settings',
            {
                templateUrl:'templates/settings.html'
            })
            .when('/credits',
            {
                templateUrl:'templates/credits.html'
            })
            .when('/',
            {
                templateUrl:'templates/home.html',
                controller: 'homeController'
            })
            .otherwise({redirectTo: '/'});
    });

