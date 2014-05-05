mileOfMusicApp.filter('firstLetter', [function () {
    return function (word) {
        if (word == null)
            return null;
        else
            return word.charAt(0).toString().toUpperCase();
    }
}]);