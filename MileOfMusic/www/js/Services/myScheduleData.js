mileOfMusicApp.factory('myScheduleData', function ($http, $log, $q, concertData, appHelper, localStorageService) {

    var bookmarkStorageKey = 'bookmarkConcertList';
    var getMySchedule = function() {
        var deferred = $q.defer();

        var concertList = [];

        var bookmarkList = this.getSavedBookmarkList();

        var processedConcerts = [];

        $.each(bookmarkList, function (i, concertId) {

            // get the concertData for the concertId
            concertData.getConcert(concertId).then(function (result) {
                concertList.push(result);
                processedConcerts.push(concertId);
            }, function (data, status) {
                processedConcerts.push(concertId);
            });

        });

        // note: the promise gets resolved when the length of the concertList is the same as the bookmarkList
        var interval = setInterval(function () {
            var isAllDataLoaded = processedConcerts.length == bookmarkList.length;
            if (isAllDataLoaded) {
                clearInterval(interval);
                deferred.resolve(concertList);
            }
        }, 100);

        return deferred.promise;
    };
   
    // Save the specified concertId to the bookmark list, only if it does not already exist
    var saveConcertToMySchedule = function (concertId) {

        var bookmarkList = this.getSavedBookmarkList();
        if (bookmarkList.indexOf(concertId) == -1) {
            // the concert does not already exist in the list, so add it and save the list
            bookmarkList.push(concertId);
            var bookmarkListJson = JSON.stringify(bookmarkList);

            localStorageService.set(bookmarkStorageKey, bookmarkListJson);
            return true;
        }
        return false;
    };

    // Save the specified concertId to the bookmark list, only if it does not already exist
    var removeConcertFromMySchedule = function (concertId) {
        var bookmarkList = this.getSavedBookmarkList();
        var index = bookmarkList.indexOf(concertId);
        if (index >= 0) {
            // the concert does not already exist in the list, so add it and save the list
            bookmarkList.splice(index, 1);
            var bookmarkListJson = JSON.stringify(bookmarkList);
            localStorageService.set(bookmarkStorageKey, bookmarkListJson);
            return true;
        }
        return false;
    };

    // Answer the saved bookmark list.  If no saved list is found, return empty array
    var getSavedBookmarkList = function () {
        var savedBookmarkList = localStorageService.get(bookmarkStorageKey);
        if (savedBookmarkList)
            return savedBookmarkList;
        else        
            return [];
    }

    // Clear all bookmarks from storage
    var clearSavedBookmarks = function () {
        localStorageService.clearAll();
    }

    return {
        getMySchedule: getMySchedule,
        getSavedBookmarkList: getSavedBookmarkList,
        saveConcertToMySchedule: saveConcertToMySchedule,
        removeConcertFromMySchedule: removeConcertFromMySchedule,
        clearSavedBookmarks: clearSavedBookmarks,
    };
});

