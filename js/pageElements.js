'use strict';
const pageElements = {
    rainGif: document.getElementById('rain-animation'),
    resultImage: document.getElementById('result-image'),
    thunderDistanceText: document.getElementById('thunderDistance-number'),
    thumbnails: document.querySelectorAll(
        `.${globalConfig.thumbnailConfig.thumbnailClass}`
    ),
    pauseButton: {
        button: document.getElementById('pauseButton'),
        icon: document.getElementById('pauseButtonIcon'),
        loading: document.getElementById('pauseButtonLoading'),
    },
    volumeButton: {
        button: document.getElementById('volumeButton'),
        icon: document.getElementById('volumeButtonIcon'),
    },
};
Object.freeze(pageElements);
