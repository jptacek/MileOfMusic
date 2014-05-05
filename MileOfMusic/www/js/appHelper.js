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

    return {
        buildIndex: buildIndex,
        lookup: lookup
    };
});