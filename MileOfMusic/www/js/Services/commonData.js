﻿mileOfMusicApp.factory('commonData', function ($http, $log, $q, appHelper, notificationFactory) {
    var getRemoteData = function (storageKey, versionUrl, dataUrl, initialData,newDataCallback, preStoreDataCallback, getCachedDataCallback) {
        var deferred = $q.defer();

        var dataKey = storageKey;
        var versionKey = storageKey + "-version";
        var versionDateKey = versionKey + "-date";
        var data;

        if (navigator !== undefined &&
            navigator.network !== undefined &&
            navigator.network.connection !== undefined &&
            navigator.network.connection.type === Connection.NONE) {
                alert('no netowrk');
                notificationFactory.error("No network connection detected. Cannot display page without a connection.");
                // Pull from cache
            data = localStorage.getItem(dataKey);
            if (data === undefined) {

                // Set local storage version
                data = localStorage.getItem(dataKey);
                if (data === undefined) {

                    // local storage is not set, first load, get from our data
                    alert('Trying to set local data ' + initialData);
                    var request = new XMLHttpRequest();

                    request.open("GET", "test.txt");
                    var textResult =  request.responseText;
                    var dataResult = JSON.stringify(textResult);
                    if (dataResult==null) {
                        alert('try with  /');
                        textResult =  request.responseText;
                        dataResult = JSON.stringify(textResult);
                    }
                    if (dataResult==null) {
                        alert('still null');
                    }
                    localStorage.setItem(dataKey,dataResult );
                    deferred.resolve(dataResult);
                }
                else {
                    // Version get failed, but we have a cached version so just use that
                    alert('data is not null, getting cache');
                    var jsonData = null;
                    if (getCachedDataCallback != null) {
                        alert('data is not null, getCachedDataCallback');
                        jsonData = getCachedDataCallback();
                    }
                    if (jsonData == null) {
                        alert('parse is not null, getCachedDataCallback');
                        jsonData = JSON.parse(data);
                    }
                    deferred.resolve(jsonData);
                }
            }
            else {
                alert('data is NOT null:' + dataKey);
                // Version get failed, but we have a cached version so just use that
                var jsonData = null;
                if (getCachedDataCallback != null) {
                    jsonData = getCachedDataCallback();}
                if (jsonData == null) {
                    jsonData = JSON.parse(data);
                }
                deferred.resolve(jsonData);
            }
        }
        else {
            alert(' netowrk');

            var lastVersionCheck = new Date(localStorage.getItem(versionDateKey));
             data = localStorage.getItem(dataKey);
            //var dateCheck = new Date(new Date().getTime() - (12 * 60 * 60 * 1000)); // Check twice per day
            var dateCheck = new Date(new Date().getTime() - (4 * 60 * 1000)); // Check every 4 hours

            if (data != null && lastVersionCheck != null &&
                lastVersionCheck > dateCheck) {
                    var jsonData = null;
                    if (getCachedDataCallback != null) {
                        jsonData = getCachedDataCallback();
                    }
                    if (jsonData == null) {
                        jsonData = JSON.parse(data);
                    }
                    deferred.resolve(jsonData);
            }
            else {
                $http.jsonp(versionUrl).then(function (result) {
                    var myVersion = localStorage.getItem(versionKey);
                    if (data == null || myVersion == null || JSON.parse(myVersion).Version != result.data.Version) {

                        // New version, so go download new JSON
                        $http.jsonp(dataUrl).then(function (dataResult) {

                            if (newDataCallback != null) {
                                newDataCallback();
                            }

                            function finalizeData() {
                                localStorage.setItem(versionKey, JSON.stringify(result.data));
                                localStorage.setItem(versionDateKey, new Date().toString());
                                localStorage.setItem(dataKey, JSON.stringify(dataResult));
                                deferred.resolve(dataResult);
                            }

                            if (preStoreDataCallback == null) {
                                finalizeData();
                            }
                            else {
                                // preStoreDataCallback MUST be a promise
                                preStoreDataCallback(dataResult.data).then(function () {
                                    finalizeData();
                                }, function (e) { deferred.reject(); });
                            }
                        }, function (e) { deferred.reject(); });
                    }
                    else {
                        // Pull from cache
                        localStorage.setItem(versionDateKey, new Date().toString());

                        var jsonData = null;
                        if (getCachedDataCallback != null) {
                            jsonData = getCachedDataCallback();
                        }
                        if (jsonData == null) {
                            jsonData = JSON.parse(data);
                        }
                        deferred.resolve(jsonData);
                    }
                }, function () {
                    var data = localStorage.getItem(dataKey);
                    if (data == null) {
                        deferred.reject();
                    }
                    else {
                        // Version get failed, but we have a cached version so just use that
                        var jsonData = null;
                        if (getCachedDataCallback != null) {
                            jsonData = getCachedDataCallback();
                        }
                        if (jsonData == null) {
                            jsonData = JSON.parse(data);
                        }
                        deferred.resolve(jsonData);
                    }
                });
            }
        }
        return deferred.promise;
    };

    var checkForMissingImages = function (data, idProperty, targetDirectory, photoUrlLocalProperty, photoUrlRemoteProperty, photoUrlProperty) {
        var deferred = $q.defer();

        photoUrlLocalProperty = photoUrlLocalProperty == null ? "photoUrlLocal" : photoUrlLocalProperty;
        photoUrlRemoteProperty = photoUrlRemoteProperty == null ? "photoUrlRemote" : photoUrlRemoteProperty;
        photoUrlProperty = photoUrlProperty == null ? "photoUrl" : photoUrlProperty;

        $.each(data, function (i, item) {
            var localItem = item;
            localItem[photoUrlProperty] = localItem[photoUrlLocalProperty];

        });

        setInterval(function () {
            deferred.resolve();
        }, 100);

        return deferred.promise;
    };

    return {
        getRemoteData: getRemoteData,
        checkForMissingImages: checkForMissingImages
    };
});