mileOfMusicApp.factory('appHelper', function () {
    var buildIndex = function (source, property) {
        var tempArray = [];
        for (var i = 0, len = source.length; i < len; ++i) {
            tempArray[source[i][property]] = source[i];
        }
        return tempArray;
    };

    var lookup = function (data, propertyCheck, value, deferred) {
        var isFound = false;
        var result = null;
        $.each(data, function (i, item) {
            if (item[propertyCheck] == value) {
                if (deferred != null) {
                    deferred.resolve(item);
                }
                result = value;
                isFound = true;
                return false;
            }
        });
        if (deferred != null && !isFound) {
            deferred.reject();
        }
        return value;
    };

    var openMapsUrl = function (address, city, state)
    {
        openUrlInNewWindow('https://www.google.com/maps/place/' + address + ',' + city + ',' + state);
    }
    var openWebsiteUrl = function (url) {
        url = checkWebSiteUrl(url);
        openUrlInNewWindow(url);
    }
    var openTwitterSite = function (twitterHandle) {
        var url = 'http://www.twitter.com/' + twitterHandle;
        openUrlInNewWindow(url);
    }
    var openInstagramSite = function (instagramHandle) {
        var url = 'http://www.instagram.com/' + instagramHandle;
        openUrlInNewWindow(url);
    }

    var openFacebookSite = function (faceBook) {
        var url = checkWebSiteUrl(faceBook);
        openUrlInNewWindow(url);
    }

    var openUrlInNewWindow = function(url)
    {
        openURL(url);
    }

    var checkWebSiteUrl = function(urlToCheck) {
        if (urlToCheck.toLowerCase().indexOf('http://') == -1) {

            if (urlToCheck.toLowerCase().indexOf('https://') == -1) {
                urlToCheck = 'http://' + urlToCheck;
            }
        }

        return urlToCheck;
    }
    return {
        buildIndex: buildIndex,
        lookup: lookup,
        openWebsiteUrl: openWebsiteUrl,
        openTwitterSite: openTwitterSite,
        openInstagramSite: openInstagramSite,
        openFacebookSite: openFacebookSite,
        openMapsUrl: openMapsUrl
    };
}).factory('notificationFactory', function () {
    return {
        success: function (text) {
            toastr.success(text, "Success");
        },
        info: function (text) {
            toastr.info(text, "Info");
        },
        error: function (text) {
            toastr.error(text, "Error");
        }
    };
});