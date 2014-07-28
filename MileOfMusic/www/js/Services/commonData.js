mileOfMusicApp.factory('commonData', function ($http, $log, $q, appHelper, notificationFactory) {
    var getRemoteData = function (storageKey, versionUrl, dataUrl,initialData, newDataCallback, preStoreDataCallback, getCachedDataCallback) {
        var deferred = $q.defer();


            var dataKey = storageKey;
            var versionKey = storageKey + "-version";
            var versionDateKey = versionKey + "-date";

            var lastVersionCheck = new Date(localStorage.getItem(versionDateKey));
            var data = localStorage.getItem(dataKey);


            //var dateCheck = new Date(new Date().getTime() - (12 * 60 * 60 * 1000)); // Check twice per day
            var dateCheck = new Date(new Date().getTime() - (4 * 60 * 1000)); // Check every hours
            if (navigator != null && navigator.network != null &&
                navigator.network.connection != null && navigator.network.connection.type == Connection.NONE) {
                //    if (navigator == null || navigator.network == null || navigator.network.connection == null || navigator.network.connection.type != Connection.NONE) {
                alert('no network');
                if (data == null  ) {
                    alert ('nulls');
                    var jsonData = null;

                    alert('Trying to set local data ' + initialData);
                    var request = new XMLHttpRequest();

                    request.open("GET", initialData);
                    var textResult =  request.responseText;
                    var dataResult = JSON.stringify(textResult);
                    jsonData = JSON.parse(dataResult);
                    if (dataResult==null) {
                        alert('try with  /');
                        request.open("GET", '/'+initialData);
                        textResult =  request.responseText;
                        dataResult = JSON.stringify(textResult);
                        jsonData = JSON.parse(dataResult);
                    }

                    deferred.resolve(jsonData);
                }
                else {
                    notificationFactory.error("No network connection detected and could not get previous data.");

                }
                notificationFactory.error("No network connection detected. Cannot display page without a connection.");
            }
            else {
            if (data != null && lastVersionCheck != null && lastVersionCheck > dateCheck) {
                var jsonData = null;
                if (getCachedDataCallback != null) jsonData = getCachedDataCallback();
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

                            if (newDataCallback != null) newDataCallback();

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
                                }, function (e) {
                                    deferred.reject();
                                });
                            }
                        }, function (e) {
                            deferred.reject();
                        });
                    }
                    else {
                        // Pull from cache
                        localStorage.setItem(versionDateKey, new Date().toString());

                        var jsonData = null;
                        if (getCachedDataCallback != null) jsonData = getCachedDataCallback();
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
                        if (getCachedDataCallback != null) jsonData = getCachedDataCallback();
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