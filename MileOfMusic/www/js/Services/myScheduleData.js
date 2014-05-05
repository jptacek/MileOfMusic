mileOfMusicApp.factory('myScheduleData', function ($http, $log, $q, concertData, localStorageService, appHelper) {

    var bookmarkStorageKey = 'bookmarkConcertList';
    var getMySchedule = function() {
        var deferred = $q.defer();

        var concertList = [];

        var bookmarkList = this.getSavedBookmarkList();

        $.each(bookmarkList, function (i, concertId) {

            // get the concertData for the concertId
            concertData.getConcert(concertId).then(function (result) {
                concertList.push(result);
            }, function (data, status) {
                $log.error(data);
            });

        });

        // note: the promise gets resolved when the length of the concertList is the same as the bookmarkList
        var interval = setInterval(function () {
            var isAllDataLoaded = concertList.length == bookmarkList.length;
            if (isAllDataLoaded) {
                deferred.resolve(concertList);
            }
        }, 100);

        return deferred.promise;
    };
   
    // Save the specified concertId to the bookmark list, only if it does not already exist
    var saveConcertToMySchedule = function (concertId) {
        //$log.info('saveConcertToMySchedule');

        var bookmarkList = this.getSavedBookmarkList();
        if (bookmarkList.indexOf(concertId) == -1) {
            // the concert does not already exist in the list, so add it and save the list
            bookmarkList.push(concertId);
            var bookmarkListJson = JSON.stringify(bookmarkList);
            localStorageService.add(bookmarkStorageKey, bookmarkListJson);
        }

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
        localStorageService.add(bookmarkStorageKey, null);
    }

    return {
        getMySchedule: getMySchedule,
        getSavedBookmarkList: getSavedBookmarkList,
        saveConcertToMySchedule: saveConcertToMySchedule,
        clearSavedBookmarks: clearSavedBookmarks,
    };
});

