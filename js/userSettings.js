'use strict';

const userSettings = (function() {
    let soundPlaying = false;
    let volume = 1;

    const changeVolumeIcon = newVolume => {
        let oldIcon, newIcon;
        if (volume === 1) {
            oldIcon = globalConfig.icons.volumeMute;
            newIcon = globalConfig.icons.volumeHigh;
        } else if (volume >= 0.66) {
            oldIcon = globalConfig.icons.volumeHigh;
            newIcon = globalConfig.icons.volumeMedium;
        } else if (volume >= 0.33) {
            oldIcon = globalConfig.icons.volumeMedium;
            newIcon = globalConfig.icons.volumeLow;
        } else {
            oldIcon = globalConfig.icons.volumeLow;
            newIcon = globalConfig.icons.volumeMute;
        }
        domUtility.changeIconFromTo(pageElements.volumeButton.icon, oldIcon, newIcon);
    };

    return {
        changeRainIntensity: newIntensity => {
            pageElements.rainGif.style.opacity = newIntensity;
            pageElements.rainGif.filter = `alpha(opacity=${newIntensity})`; // IE fallback
        },
        changeLightningFrequency: newFrequency => {
            lightningProvider.stop();
            if (newFrequency[0] !== null && newFrequency[1] !== null) {
                lightningProvider.start(newFrequency[0], newFrequency[1]);
            }
        },
        changeDistanceToThunder: distanceInKilometers => {
            pageElements.thunderDistanceText.innerText = distanceInKilometers;
            thunderProvider.setTimeUntilThunder(distanceInKilometers);
        },
        changeImage: (pathToImg, altText) => {
            pageElements.resultImage.src = pathToImg;
            pageElements.resultImage.alt = altText;
        },
        changeActiveThumbnail: (oldActiveImg, newActiveImg) => {
            oldActiveImg.classList.remove(
                globalConfig.thumbnailConfig.activeClass
            );
            newActiveImg.classList.add(
                globalConfig.thumbnailConfig.activeClass
            );
        },
        changeSoundState: () => {
            if (soundPlaying) {
                rainSoundPlayer.pause();
                thunderProvider.pause();

                domUtility.changeIconFromTo(
                    pageElements.pauseButton.icon,
                    globalConfig.icons.pauseIcon,
                    globalConfig.icons.playIcon
                );

                domUtility.changeAriaLabelTo(
                    pageElements.pauseButton.button,
                    globalConfig.labels.play
                );

                soundPlaying = false;
            } else {
                rainSoundPlayer.resume();
                thunderProvider.resume();

                domUtility.changeIconFromTo(
                    pageElements.pauseButton.icon,
                    globalConfig.icons.playIcon,
                    globalConfig.icons.pauseIcon
                );

                domUtility.changeAriaLabelTo(
                    pageElements.pauseButton.button,
                    globalConfig.labels.pause
                );

                soundPlaying = true;
            }

            return soundPlaying;
        },
        initVolume: startVolume => {
            volume = startVolume;
            rainSoundPlayer.setNewGlobalVolume(volume);
            thunderProvider.changeVolume(volume);
            changeVolumeIcon(volume);
        },
        changeVolume: () => {
            if (volume === 1) {
                volume = 0.66;
            } else if (volume >= 0.66) {
                volume = 0.33;
            } else if (volume >= 0.33) {
                volume = 0;
            } else {
                volume = 1;
            }

            rainSoundPlayer.setNewGlobalVolume(volume);
            thunderProvider.changeVolume(volume);
            changeVolumeIcon(volume);
        },
        getCurrentVolume: () => {
            return volume;
        },
    };
})();
