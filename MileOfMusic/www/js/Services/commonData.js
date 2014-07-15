mileOfMusicApp.factory('commonData', function ($http, $log, $q, appHelper) {
    var getRemoteData = function (storageKey, versionUrl, dataUrl, newDataCallback, preStoreDataCallback, getCachedDataCallback) {
        var deferred = $q.defer();

        var dataKey = storageKey;
        var versionKey = storageKey + "-version";
        var versionDateKey = versionKey + "-date";

        var lastVersionCheck = new Date(localStorage.getItem(versionDateKey));
        var data = localStorage.getItem(dataKey);
        //var dateCheck = new Date(new Date().getTime() - (12 * 60 * 60 * 1000)); // Check twice per day
        var dateCheck = new Date(new Date().getTime() - (1 * 30 * 1000)); // Check every 30 minutes

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
                            }, function (e) { deferred.reject(); });
                        }
                    }, function (e) { deferred.reject(); });
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

        return deferred.promise;
    };

    var checkForMissingImages = function (data, idProperty, targetDirectory, photoUrlLocalProperty, photoUrlRemoteProperty, photoUrlProperty) {
        var deferred = $q.defer();

        photoUrlLocalProperty = photoUrlLocalProperty == null ? "photoUrlLocal" : photoUrlLocalProperty;
        photoUrlRemoteProperty = photoUrlRemoteProperty == null ? "photoUrlRemote" : photoUrlRemoteProperty;
        photoUrlProperty = photoUrlProperty == null ? "photoUrl" : photoUrlProperty;

        $.each(data, function (i, item) {
            var localItem = item;
            $.ajax({
                url: localItem[photoUrlLocalProperty],
                type: 'HEAD',
                error: function () {
                    localItem[photoUrlProperty] = localItem[photoUrlRemoteProperty];
                    try {
                        var fileTransfer = new FileTransfer();
                        var uri = encodeURI(localItem[photoUrlRemoteProperty]);
                        
                        try
                        {
                            fileTransfer.download(
                                uri,
                                "cdvfile://localhost/persistent" + targetDirectory + "/" + localItem[idProperty] + ".jpg",
                                function (entry) {
                                    localItem[photoUrlProperty] = localItem[photoUrlLocalProperty];
                                },
                                function (error) {
                                    $log.error(error);
                                    fileTransfer.download(
                                       uri,
                                       targetDirectory + "/" + localItem[idProperty] + ".jpg",
                                       function (entry) {
                                           localItem[photoUrlProperty] = localItem[photoUrlLocalProperty];
                                       },
                                       function (error) {
                                           $log.error(error);
                                       }
                                   );
                                }
                            );
                        }
                        catch (err) { }
                    }
                    catch (err) { $log.error(err); }
                },
                success: function () {
                    localItem[photoUrlProperty] = localItem[photoUrlLocalProperty];
                }, complete: function () {
                    if (localItem[photoUrlProperty] == null) localItem[photoUrlProperty] = ""
                }
            });
        });

        var attempts = 0;
        var interval = setInterval(function () {
            var allAssigned = true;
            $.each(data, function (i, item) {
                if (item[photoUrlProperty] == undefined) {
                    allAssigned = false;
                    return false;
                }
            });
            attempts++;
            if (allAssigned || attempts >= 50) {
                clearInterval(interval);
                deferred.resolve();
            }
        }, 100);

        return deferred.promise;
    };

    return {
        getRemoteData: getRemoteData,
        checkForMissingImages: checkForMissingImages
    };
});