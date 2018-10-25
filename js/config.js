'use strict';

const globalConfig = {
    lightningConfig: {
        minimumBrightnessAmount: 110,
        maximumBrightnessAmount: 300,
        // From how many to how many milliseconds it can take for a flash to appear.
        // The first case is handled specially -> Flashes should never appear
        timeBetweenLightning: [
            [null, null],
            [35 * 1000, 55 * 1000],
            [20 * 1000, 45 * 1000],
            [16 * 1000, 30 * 1000],
            [8000, 15 * 1000],
            [5000, 9000],
            [1000, 5000],
            [500, 3000],
            [300, 1500],
        ],
    },
    thunderConfig: {
        /* This is not a balanced scale. It's kinda exponential.
        It starts at 0.45 because 0.45 multiplied by lowest rainVolume (0.33) equals 0.1485
        which is just high enough to hear.
        I tried with a calculation too but this is easier and more balanced. */
        thunderVolume: [
            0.45,
            0.455,
            0.46,
            0.465,
            0.47,
            0.48,
            0.49,
            0.5,
            0.53,
            0.55,
            0.6,
            0.65,
            0.7,
            0.75,
            0.8,
            0.9,
            1,
        ],
        maxNumberKm: 16,
        possibleThunderVariations: {
            lowestThunder: 1,
            highestThunder: 7,
        },
        thunderAudioPath: 'audio/thunder',
    },
    thumbnailConfig: {
        activeClass: 'active',
        thumbnailClass: 'changePicture',
    },
    loopAudioPath: 'audio/rainloop',
    icons: {
        playIcon: 'icon-play',
        pauseIcon: 'icon-pause',
        volumeHigh: 'icon-volume-high',
        volumeMedium: 'icon-volume-medium',
        volumeLow: 'icon-volume-low',
        volumeMute: 'icon-volume-mute',
    },
    storageConfig: {
        rainAmount: 'rain',
        lightningAmount: 'lightning',
        thunderAmount: 'thunder',
        volume: 'volume',
        backgroundImg: 'picture',
        version: 'version',
        isSoundPlaying: 'playing',
    },
    labels: {
        pause: 'pause',
        play: 'play',
        loading: 'Loading ...',
    },
};
// Noone can change the config trough the code thanks to the following line!
Object.freeze(globalConfig);
