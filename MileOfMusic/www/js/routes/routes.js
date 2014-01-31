mileOfMusicApp.config(function($routeProvider)
{
    $routeProvider.when('/artistList',
        {
            templateUrl:'templates/artistList.html',
            controller: 'artistsListController'
        })
});