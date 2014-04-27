mileOfMusicApp.factory('artistData', function($http, $log, $q, appHelper) {
    var getArtists = function () {
        $log.info('getArtists in');
        return $http.get('data/Artists.txt');

        //return artistsData;
    };

    var getArtist = function(artistId)  {
        $log.info('getArtists in');

        var deferred = $q.defer();

        getArtists().then(function (result) {
            var dict = appHelper.buildIndex(result.data.artists, 'artistId');
            deferred.resolve(dict[artistId]);
        }, function () { deferred.reject(); });

        return deferred.promise;

       //var artistListIndex = appHelper.buildIndex(artistsData.artists,'artistId');
       // return artistListIndex[artistId];
    };

    var getMusic = function (artistId) {

        var deferred = $q.defer();

        getArtist(artistId).then(function (result) {
            var name = result.artistName.replace("Test Artist ", "").replace(/ /g, '+');
        
            $http.jsonp("https://itunes.apple.com/search?callback=JSON_CALLBACK&term=" + name).then(function (result) {
                var output = [];

                if (result.data.resultCount > 0) {
                    $.each(result.data.results, function (i, item) {
                        if (item.kind == "song") {
                            output.push({
                                name: item.trackCensoredName,
                                album: item.collectionCensoredName,
                                musicUrl: item.previewUrl,
                                imageUrl: item.artworkUrl60
                            });
                        }

                        if (output.length >= 10) {
                            return false;
                        }
                    });
                }
                console.log(output);
                deferred.resolve(output);
            }, function () {
                deferred.reject();
            });

        }, function() { deferred.reject(); })

        return deferred.promise;
    }

    return {
        getArtists: getArtists,
        getArtist: getArtist,
        getMusic: getMusic
    };
});


var artistsData = {
    artists: [
        { "artistId": 1, "artistName": "Patchouli (Chicago) (ADI Show)", "twitter": "@twitterHandle", "instagram": "http://instagram.com/n33470", "facebook": "http://facebook.com/n33470", "description": "This is my description.   I like to work on DevCamps", "homebase": "Neenah, WI", "url": "http://www.skylinetechnologies.com" },
        { "artistId": 2, "artistName": "Roger Jokela (Key West)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 3, "artistName": "Balinese Gamelan – Music Educ. Event", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 4, "artistName": "Marty Paschke (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 5, "artistName": "Eric Krueger (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 6, "artistName": "Lucas Cates (Madison)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 7, "artistName": "Christopher Gold (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 8, "artistName": "Greg Waters & The Broad Street Boogie", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 9, "artistName": "Fox Cities (ADI Show)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 10, "artistName": "Fat Brass (Green Bay) (ADI Show)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 11, "artistName": "Special Guest: Cory Chisel", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 12, "artistName": "The Relics (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 13, "artistName": "Jacob Fannin (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 14, "artistName": "Jordin Baas (Milwaukee)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 15, "artistName": "Kyle Megna (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 16, "artistName": "Part of Harmony Row, 6-9pm", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 17, "artistName": "The Wild Ones (Santa Cruz, CA)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 22, "artistName": "Rob Anthony (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 24, "artistName": "Bummer City (Santa Cruz, CA)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 25, "artistName": "Bron Sage (Oshkosh)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 27, "artistName": "Haunted Heads (Oshkosh)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 28, "artistName": "Jordan Meredith (Nashville)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 29, "artistName": "Eric Lives Here (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 30, "artistName": "Nathan Dengel (Fox Cities)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 31, "artistName": "Mutts (Chicago)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        { "artistId": 32, "artistName": "Lucas Cates (Madison)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        {"artistId": 33,"artistName": "Kyle Megna &The Monsoons (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 34,"artistName": "Leading the Blind (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 35,"artistName": "The Lately (Madison)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 36,"artistName": "Missing Artist","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 37,"artistName": "Adria Ramos (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 39,"artistName": "Marty Paschke","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 40,"artistName": "Brandon Beebe (Madison)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 43,"artistName": "Fatbook (Chicago)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 44,"artistName": "T.U.G.G. (La Crosse)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 45,"artistName": "The Guilty Wanted (Oshkosh)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 47,"artistName": "Ricky Ganiere (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 48,"artistName": "Cedarwell (Sheboygan)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 49,"artistName": "Christopher Gold","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 50,"artistName": "Kyle Megna (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 51,"artistName": "Jana Nyberg Group (Twin Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 52,"artistName": "David DeWees (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 53,"artistName": "Jordan Meredith (Nashville)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 54,"artistName": "Leading the Blind","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 55,"artistName": "Balinese Gamelan – Music Educ. Event","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 56,"artistName": "Mighty WheelHouse (Madison)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 57,"artistName": "The Lately","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 58,"artistName": "Mel Flannery Trucking Co.","twitter": "melflannery","instagram": "","facebook": "https://www.facebook.com/melflannerytruckingcompany","description": "A few years back, when Melanie Flannery graduated from the prestigious Manhattan School of Music as a jazz performance major, the classically trained singer could have taken the easy road and accepted various offers to record and perform as a standards singer. Opting instead to take the more challenging but creatively fulfilling route of forming her own band, Mel Flannery Trucking Co., the multi-talented singer/songwriter and her brilliant all-male trio forged ahead with an organic, eclectic sound that has shaken the foundation of New York’s independent music scene. Appealing coolly to everyone from punk rock lovers to jazz aficionados and fans of sultry, envelope pushing pop/rock, the band fashions a tasty new hybrid Flannery dubs “avant-soul” on their upcoming third album As It Turns Out","homebase": "New York, NY","url": "http://melflannerytruckingco.com/"},
        {"artistId": 59,"artistName": "Nicole Rae (Oshkosh)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 60,"artistName": "Wilson (Fox Cities/Hong Kong)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 61,"artistName": "Greg Koch (Education)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 62,"artistName": "Bummer City","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 63,"artistName": "Roger Jokela","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 64,"artistName": "The Tyme Machines (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 65,"artistName": "Kyle Megna & The Monsoons (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 66,"artistName": "The Relics","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 67,"artistName": "Great Lake Drifters (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 68,"artistName": "The Wild Ones","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 71,"artistName": "Cory Chisel (Nashville)","twitter": "corychisel","instagram": "","facebook": "https://www.facebook.com/corychisel","description": "","homebase": "Nashville, TN","url": "http://corychisel.com/"},
        {"artistId": 72,"artistName": "The Candles (New York)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 73,"artistName": "SPACEWOMAN (New York)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 74,"artistName": "Adriel Denae (Chicago)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 75,"artistName": "Hillary Reynolds Band (Boston) ","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 78,"artistName": "Field Report (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 79,"artistName": "Foreign Fields (Nashville) ","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 80,"artistName": "Adelyn Rose (Eau Claire)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 83,"artistName": "Hugh Bob & The Hustle (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 84,"artistName": "Jonny Fritz (Nashville)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 85,"artistName": "Trapper Schoepp (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 88,"artistName": "Communist Daughter (Nashville)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 89,"artistName": "The Heart Pills (Eau Claire)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 90,"artistName": "RedHawks (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 92,"artistName": "Fresh Picked Grass (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 93,"artistName": "Holy Sheboygan! (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 94,"artistName": "The Wild Ones","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 95,"artistName": "Ricky Ganiere","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 96,"artistName": "Brandon Beebe","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 97,"artistName": "Mighty WheelHouse","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 98,"artistName": "The Traveling Suitcase (Oshkosh)","twitter": "trvlingsuitcase","instagram": "","facebook": "https://www.facebook.com/TheTravelingSuitcase","description": "","homebase": "Oshkosh, WI","url": "http://thetravelingsuitcase.bandcamp.com/"},
        {"artistId": 99,"artistName": "Blue, Seriously","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 100,"artistName": "Sam Winch (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 101,"artistName": "Haunted Heads","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 102,"artistName": "The Pernicious Bean (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 103,"artistName": "Bummer City","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 104,"artistName": "Jana Nyberg Group","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 105,"artistName": "Baba Ghanooj (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 106,"artistName": "Kory Murphy (Door County)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 107,"artistName": "Greg Koch (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 108,"artistName": "Tanya Winch (Austin, TX)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 109,"artistName": "Orange Iguanas (Oshkosh)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 110,"artistName": "The Blakes","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 113,"artistName": "Tony Memmel (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 114,"artistName": "Involuntary String Band (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 115,"artistName": "Ross Catterton","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 116,"artistName": "Tanya Winch and The Dirty Mercy","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 117,"artistName": "Brandon Beebe","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 118,"artistName": "Adelyn Rose","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 121,"artistName": "The Blakes (Seattle)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 122,"artistName": "California Wives (Chicago)","twitter": "californiawives","instagram": "FOO","facebook": "https://www.facebook.com/CaliforniaWives","description": "Indie rock band from Chicago with darker ’80s rock and New-Wave influences. The group released their debut album in 2012.","homebase": "Chicago, IL","url": "http://californiawives.com/"},
        {"artistId": 123,"artistName": "The Traveling Suitcase (Oshkosh)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 127,"artistName": "The Pernicious Bean","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 128,"artistName": "Great Lake Drifters","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 129,"artistName": "Kory Murphy","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 130,"artistName": "Hallorann (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 131,"artistName": "Charlie Parr (Duluth)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 132,"artistName": "Kyle Megna","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 133,"artistName": "Ida Jo (Madison)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 134,"artistName": "Cedarwell","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 135,"artistName": "J.E. Sunde (Eau Claire)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 136,"artistName": "The Midwestern Charm (Osh/Milw)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 137,"artistName": "Fort Frances (Chicago)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 138,"artistName": "Meridene (Eau Claire)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 139,"artistName": "Charlie Parr","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 140,"artistName": "Bonzie (Chicago)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 141,"artistName": "PHOX (Madison)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 142,"artistName": "The Hi-Matics (Stevens Point)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 143,"artistName": "Nathan Dengel","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 144,"artistName": "Ida Jo","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 145,"artistName": "Eric Krueger","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 146,"artistName": "Count This Penny (Madison)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 147,"artistName": "Hillary Reynolds Band","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 148,"artistName": "Jordan Meredith","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 149,"artistName": "Adria Ramos","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 150,"artistName": "Blue, Seriously (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 151,"artistName": "The Form (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 152,"artistName": "Kory Murphy","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 153,"artistName": "J.E. Sunde","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 154,"artistName": "Orange Iguanas","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 155,"artistName": "Neon (La Crosse)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 156,"artistName": "Roger Jokela","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 157,"artistName": "Bright Kind (Milwaukee)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 160,"artistName": "Rodney Crowell (Nashville)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 161,"artistName": "Justin Townes Earle (Nashville)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 162,"artistName": "Nicole Atkins (Nashville)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 163,"artistName": "Christopher Gold (Fox Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 164,"artistName": "Mel Flannery Trucking Co. (New York)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 167,"artistName": "The Pines (Twin Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 168,"artistName": "Fort Frances (Chicago)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 169,"artistName": "Luke Zimmerman (Twin Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 172,"artistName": "Those Darlins (Nashville)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 173,"artistName": "Bonzie (Chicago)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 174,"artistName": "Chase Cohl (Los Angeles)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 177,"artistName": "Nikki Lane (Nashville)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 178,"artistName": "Caroline Smith (Twin Cities)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 179,"artistName": "The Sleepwalkers (Green Bay)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 208,"artistName": "The Delta Routine","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 209,"artistName": "Special VIP-Only Event TBA  (VIP Ticket Holders only)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 210,"artistName": "Pete Schwantes (Mr. Pete)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 211,"artistName": "Children/Family Performer","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 213,"artistName": "California Wives","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 216,"artistName": "Caroline Smith","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        {"artistId": 217,"artistName": "The Family Business (Madison)","twitter": "","instagram": "","facebook": "","description": "","homebase": "","url": ""},
        { "artistId": 218, "artistName": "J.C. Brooks & The Uptown Sound (Chicago)", "twitter": "", "instagram": "", "facebook": "", "description": "", "homebase": "", "url": "" },
        {
            "artistId": "334265",
            "artistName": "ZZZ Test Artist Adriel Denae",
            "twitter": "",
            "instagram": "",
            "facebook": "",
            "description": "Adriel, flock of God, the son of Barzillai, the Meholathite, to whom Saul gave in marriage his daughter Merab (1 Sam. 18:19).",
            "homebase": null,
            "url": "https://www.facebook.com/adrieldenae",
            "genre": "Good Music",
            "photoUrlRemote": "https://s3-us-west-2.amazonaws.com/marcato.west/artists_files/photos/334265/original.jpg?1398519059"
        },
        {
            "artistId": "334263",
            "artistName": "ZZZ Test Artist Cats Playing Keyboards",
            "twitter": "",
            "instagram": "",
            "facebook": "",
            "description": "Cats Playing Keyboards Short Bio Cats Playing Keyboards Short Bio Cats Playing Keyboards Short Bio Cats Playing Keyboards Short Bio Cats Playing Keyboards Short Bio Cats Playing Keyboards Short Bio Cats Playing Keyboards Short Bio",
            "homebase": "Chicago",
            "url": "http://playhimoffkeyboardcat.com/",
            "genre": "Cat Boogie",
            "photoUrlRemote": "https://s3-us-west-2.amazonaws.com/marcato.west/artists_files/photos/334263/original.jpg?1398483019"
        },
        {
            "artistId": "330938",
            "artistName": "ZZZ Test Artist Cory Chisel",
            "twitter": "",
            "instagram": "",
            "facebook": "",
            "description": "Cory Chisel is an old believer. You can hear it in his music – there’s a wisdom beyond his years in that voice. You can see it in his story – the son of a preacher, sheltered from pop music, raised on hymns and Johnny Cash. “Mom played piano and organ, my dad did the preaching, the thing that my sister and I could add to the service was to sing.” As fate would have it, the kid was born to do it.\n\nHe grew up in the Iron Range town of Babbitt, Minnesota, and the rural flatlands of Appleton, Wisconsin. Along with the family’s spiritual doctrine, came a musician uncle, who taught Cory about the blues: Howlin’ Wolf, Robert Johnson, Sonny Boy Williamson.",
            "homebase": "Appleton",
            "url": "",
            "genre": "Americana, Folk Rock",
            "photoUrlRemote": "https://s3-us-west-2.amazonaws.com/marcato.west/artists_files/photos/330938/original.jpg?1398483302"
        },
        {
            "artistId": "330936",
            "artistName": "ZZZ Test Artist Elvis Presley",
            "twitter": "",
            "instagram": "",
            "facebook": "",
            "description": "Simply put, Elvis Presley was the first real rock & roll star. A white Southerner singing blues laced with country, and country laced with gospel, he brought together American music from both sides of the color line and performed it with a natural hip-swiveling sexuality that made him a teen idol and a role model for generations of cool rebels. He was repeatedly dismissed as vulgar, incompetent, and a bad influence, but the force of his music and his image was no mere merchandising feat. Presley signaled to mainstream culture that it was time to let go. Four decades after his death, Presley’s image and influence remain undiminished. While certainly other artists preceded him and he by no means “invented” rock & roll, he is indisputably its king. \n\n As a recording artist, Presley’s accomplishments are unparalleled. He is believed to have sold over 1 billion records worldwide, about 40 percent of those outside the U.S. The RIAA has awarded Presley the largest number of gold, platinum, and multiplatinum certifications of any artist in history; as of early 2001, 131. His chart performance, as tracked by Billboard, is also unmatched, with 149 charting pop singles: 114 Top 40, 40 Top 10, and 18 #1s. ",
            "homebase": "Greeceland",
            "url": "",
            "genre": "Rock",
            "photoUrlRemote": "https://s3-us-west-2.amazonaws.com/marcato.west/artists_files/photos/330936/original.jpg?1398483459"
        },
        {
            "artistId": "330937",
            "artistName": "ZZZ Test Artist Frank Zappa",
            "twitter": "",
            "instagram": "",
            "facebook": "",
            "description": "Frank Vincent Zappa (December 21, 1940 – December 4, 1993) was an American composer, electric guitarist, record producer, and film director. In a career spanning more than 30 years, Zappa wrote rock, jazz, electronic, orchestral, and musique concrète works. He also directed feature-length films and music videos, and designed album covers. Zappa produced almost all of the more than 60 albums he released with the band Mothers of Invention and as a solo artist.",
            "homebase": "Maryland",
            "url": "",
            "genre": "Jazz",
            "photoUrlRemote": "https://s3-us-west-2.amazonaws.com/marcato.west/artists_files/photos/330937/original.jpg?1398483543"
        }
    ]
};