mileOfMusicApp.factory('commonData', function ($http, $log, $q, appHelper) {
    var getRemoteData = function (storageKey, versionUrl, dataUrl, newDataCallback, preStoreDataCallback) {
        var deferred = $q.defer();

        var dataKey = storageKey;
        var versionKey = storageKey + "-version";
        var versionDateKey = versionKey + "-date";

        var lastVersionCheck = new Date(localStorage.getItem(versionDateKey));
        var data = localStorage.getItem(dataKey);
        var dateCheck = new Date(new Date().getTime() - (12 * 60 * 60 * 1000)); // Check twice per day


        if (data != null && lastVersionCheck != null && lastVersionCheck < dateCheck) {
            $log.info("Pulled from cache - no version check");
            var jsonData = JSON.parse(data);
            deferred.resolve(jsonData);
        }
        else {
            $http.jsonp(versionUrl).then(function (result) {
                var myVersion = localStorage.getItem(versionKey);
                if (data == null || myVersion == null || JSON.parse(myVersion).Version != result.Version) {
                    $log.info("New version");

                    // New version, so go download new JSON
                    $http.jsonp(dataUrl).then(function (result) {
                        $log.info("Got new version");

                        if (newDataCallback != null) newDataCallback();

                        function finalizeData() {
                            localStorage.setItem(versionKey, JSON.stringify(result));
                            localStorage.setItem(versionDateKey, new Date().toString());
                            localStorage.setItem(dataKey, JSON.stringify(result));
                            deferred.resolve(result);
                        }

                        if (preStoreDataCallback == null) {
                            finalizeData();
                        }
                        else {
                            // preStoreDataCallback MUST be a promise
                            preStoreDataCallback(result.data).then(function () {
                                finalizeData();
                            }, function (e) { deferred.reject(); });
                        }
                    }, function (e) { deferred.reject(); });
                }
                else {
                    // Pull from cache
                    $log.info("Pulled from cache - checked version");
                    localStorage.setItem(versionDateKey, new Date().toString());

                    var jsonData = JSON.parse(data);
                    deferred.resolve(jsonData);
                }
            }, function () {
                var data = localStorage.getItem(dataKey);
                if (data == null) {
                    deferred.reject();
                }
                else {
                    // Version get failed, but we have a cached version so just use that
                    var jsonData = JSON.parse(data);
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
                    console.log(localItem[photoUrlRemoteProperty]);
                    try {
                        var fileTransfer = new FileTransfer();
                        var uri = encodeURI(localItem[photoUrlRemoteProperty]);

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
                    catch (err) { $log.error(err); }
                },
                success: function () {
                    localItem[photoUrlProperty] = localItem.photoUrlLocal;
                }, complete: function () {
                    if (localItem[photoUrlProperty] == null) localItem[photoUrlProperty] = ""
                }
            });
        });

        var interval = setInterval(function () {
            var allAssigned = true;
            $.each(data, function (i, item) {
                if (item[photoUrlProperty] == undefined) {
                    allAssigned = false;
                    return false;
                }
            });
            if (allAssigned) {
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