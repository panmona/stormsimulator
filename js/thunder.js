'use strict';

const thunderProvider = (function() {
    let distanceInKilometers;
    let timeUntilThunder;
    let paused = true;
    let globalVolume;

    let audiosPlaying = [[], [], [], [], [], [], []];
    let possibleThunderToPlay = [[], [], [], [], [], [], []];

    const calculateVolume = volumeToCalc => {
        return (
            volumeToCalc *
            globalConfig.thunderConfig.thunderVolume[
                globalConfig.thunderConfig.maxNumberKm -
                    distanceInKilometers +
                    1
            ]
        );
    };

    const playThunder = thunderToPlay => {
        if (!paused) {
            const thunderVariant = thunderToPlay - 1;
            const nextToPlay = audiosPlaying[thunderVariant].length;

            let audio = possibleThunderToPlay[thunderVariant][nextToPlay];
            if (audio === undefined) {
                audio = new Audio(getPathToThunder(thunderToPlay));
            }
            
            audio.volume = calculateVolume(globalVolume);
            audio.currentTime = 0;
            audio.addEventListener('ended', () => {
                const index = audiosPlaying[thunderVariant].indexOf(audio);
                audiosPlaying[thunderVariant].splice(index, 1);
            });
            audio.play();

            audiosPlaying[thunderVariant].push(audio);
        }
    };

    const chooseThunderToPlay = () => {
        const thunderToUse = randomIntFromInterval(
            globalConfig.thunderConfig.possibleThunderVariations.lowestThunder,
            globalConfig.thunderConfig.possibleThunderVariations.highestThunder
        );
        return thunderToUse;
    };

    const getPathToThunder = thunderNumber => {
        const startOfFileName = 'thunder-';
        const fileExtension = '.wav';
        return (
            globalConfig.thunderConfig.thunderAudioPath +
            '/' +
            startOfFileName +
            thunderNumber +
            fileExtension
        );
    };

    return {
        initInstances: () => {
            // This gives us really basic support on mobile safari but not more.
            // So that means, that the sound only works for the lower levels of the lightning slider.
            // It's definitely better than no thunder at all though!
            const differentThunderSounds = 7;
            for (let i = 0; i < differentThunderSounds; i++) {
                const amountOfInstances = 1;
                for (let j = 0; j < amountOfInstances; j++) {
                    const path = getPathToThunder(i + 1);
                    const audio = new Audio(path);
                    audio.volume = 0;
                    audio.play().then(() => {
                        audio.pause();
                        possibleThunderToPlay[i].push(audio);
                    });
                }
            }
        },
        setTimeUntilThunder: newDistanceInKm => {
            distanceInKilometers = newDistanceInKm;
            const soundTravellingSpeedModifierKm = 3; // Sound travels with 340.29 meters per second
            const secondsToMilliseconds = 1000;
            timeUntilThunder =
                newDistanceInKm *
                soundTravellingSpeedModifierKm *
                secondsToMilliseconds;
        },
        scheduleThunder: () => {
            setTimeout(() => {
                const thunderToPlay = chooseThunderToPlay();
                playThunder(thunderToPlay);
            }, timeUntilThunder);
        },
        pause: () => {
            paused = true;
            audiosPlaying.forEach(array => {
                array.forEach(element => {
                    element.pause();
                });
                array.length = 0;
            });
        },
        resume: () => {
            paused = false;
            // From an usability standpoint it's better if I don't resume the audio playing.
        },
        changeVolume: rainVolume => {
            globalVolume = rainVolume;

            let volumeToSet = calculateVolume(rainVolume);
            audiosPlaying.forEach(array => {
                array.forEach(el => {
                    el.volume = volumeToSet;
                });
            });
        },
    };
})();
