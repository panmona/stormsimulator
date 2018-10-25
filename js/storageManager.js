'use strict';
// This module exists because of the fact that localStorage is disabled in Safari per default.
let storageManager = (function() {
    // Source of this function: https://stackoverflow.com/a/16427747/5504438
    function islocalStorageAvailable() {
        var test = 'test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    const canUselocalStorage = islocalStorageAvailable();

    return {
        setItem: (key, value) => {
            if (canUselocalStorage) {
                localStorage.setItem(key, value);
            }
        },
        getItem: key => {
            if (canUselocalStorage) {
                return localStorage.getItem(key);
            }

            return null;
        },
    };
})();
