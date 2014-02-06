mileOfMusicApp.factory('venueData', function($http, $log, $q, appHelper) {
    var getVenues = function()  {
        $log.info('getVenues in');
        return venuesData;
    };

    var getVenue = function(venueId)  {
        $log.info('getArtists in');
        var venueListIndex = appHelper.buildIndex(venuesData.venues,'venueId');



        return venueListIndex[venueId];
    };

    return {
        getVenues: getVenues,
        getVenue: getVenue
    };
});


var venuesData = {
    venues: [
        {
            "venueId": 4,
            "venueName": "Deja Vu",
            "address": "519 W. College Ave",
            "zip": 54914,
            "twitter": "DejaVuMartini",
            "hours": "5:00PM - 2:00AM",
            "phone": "920 380-9904",
            "underage": true,
            "underageWithAdult": true,
            "facebook": "https://www.facebook.com/dejavumartinilounge",
            "description": "Located at 519 West College Ave, (Downtown Appleton, WI) Dèjá Vu Martini Lounge is anything but typical. We believe in the simple things in life; Good people, good conversations, good music, and yes, a really good drink.",
            "yelp": "http://www.yelp.com/biz/deja-vu-appleton",
            "url": "http://dejavumartini.com/"
        },
        {
            "venueId": 5,
            "venueName": "Basil's Pub",
            "address": "109 W. College Ave",
            "zip": 54914,
            "twitter": "",
            "hours": "11:00AM - 2:00AM",
            "phone": "920 954-1707",
            "underage": false,
            "underageWithAdult": false,
            "facebook": "https://www.facebook.com/bazilspub",
            "description": "For a bite to eat and a hassle-free setting, Bazil’s Pub and Provisions offers just what you are looking for. An Upscale bar and grill  specializing in over 150 beers from around the world. Come in and enjoy the most comfortable barstools in the valley!",
            "yelp": "http://www.yelp.com/biz/bazils-pub-and-provisions-appleton",
            "url": "http://www.bazilpub.com/"
        },
        {
            "venueId": 2,
            "venueName": "Stone Cellar Brewpub",
            "address": "1004 South Olde Oneida Street",
            "zip": 54915,
            "twitter": "stone_cellar ",
            "hours": "11:00AM - 2:00AM",
            "phone": "920 731-3322",
            "underage": false,
            "underageWithAdult": true,
            "facebook": "https://www.facebook.com/stonecellarbrewpub",
            "description": "Stone Cellar is helping to lead the charge in the community to be more sustainable, support local businesses and local citizens, strive towards the offering of only organic fruits and vegetables, and buying from companies with certified humane practices",
            "yelp": "http://www.yelp.com/biz/stone-cellar-appleton",
            "url": "http://www.stonecellarbrewpub.com/"
        },
        {
            "venueId": 1,
            "venueName": "Anduzzis",
            "address": "403 W. College Ave",
            "zip": 54914,
            "twitter": "",
            "hours": "11:00AM - 2:00AM",
            "phone": "920 257-2582",
            "underage": false,
            "underageWithAdult": true,
            "facebook": "https://www.facebook.com/anduzzis",
            "description": "Stop before and after Appleton Events including Octoberfest, PAC Shows, Timber Rattler games, Weddings, Birthdays, Summer Festivals, and College Avenue activities - See more at: http://www.anduzzis.com/#sthash.uA8SURwy.dpuf",
            "yelp": "http://www.yelp.com/biz/anduzzis-sports-club-appleton",
            "url": "http://www.anduzzis.com/"
        }

    ]
};