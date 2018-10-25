'use strict';

const initializer = (function() {
    let isWebAudioApiUnlocked = false;

    return {
        calculateRainIntensity: sliderValue => {
            // User should be able to disable rain BUT slider doesn't allow value of 0.
            // if (sliderValue === 1) {
            //     sliderValue = 0;
            // }

            const maxSliderValue =
                sliderUtil.allSliders[sliderUtil.sliderPositions.rainSlider]
                    .max;
            /* Opacity is from 0.0 to 1.0 (with floating point).
            Slider is from 1 to 20 (without floating point)
            Also I do not want to allow rain that looks unrealistic bcs it's too much. */
            return sliderValue / (maxSliderValue * 1.5);
        },
        registerRainHandler: () => {
            sliderUtil.registerEventHandler(
                sliderUtil.allSliders[sliderUtil.sliderPositions.rainSlider]
                    .$elem,
                'slide',
                (event, ui) => {
                    storageManager.setItem(
                        globalConfig.storageConfig.rainAmount,
                        ui.value
                    );
                    event.target.setAttribute('aria-valuenow', ui.value);

                    const calculatedIntensity = initializer.calculateRainIntensity(
                        ui.value
                    );
                    userSettings.changeRainIntensity(calculatedIntensity);

                    // TODO: volume code.
                    //userSettings.changeRainVolumeModifier(calculatedIntensity);
                    rainSoundPlayer.changeVolumeModifier(calculatedIntensity);
                }
            );
        },
        registerThunderHandler: () => {
            sliderUtil.registerEventHandler(
                sliderUtil.allSliders[
                    sliderUtil.sliderPositions.thunderDistanceSlider
                ].$elem,
                'slide',
                (event, ui) => {
                    userSettings.changeDistanceToThunder(ui.value);
                    storageManager.setItem(
                        globalConfig.storageConfig.thunderAmount,
                        ui.value
                    );
                    event.target.setAttribute('aria-valuenow', ui.value);
                }
            );
        },
        registerLightningHandler: () => {
            sliderUtil.registerEventHandler(
                sliderUtil.allSliders[
                    sliderUtil.sliderPositions.lightningSlider
                ].$elem,
                'slidechange',
                (event, ui) => {
                    userSettings.changeLightningFrequency(
                        globalConfig.lightningConfig.timeBetweenLightning[
                            ui.value - 1
                        ]
                    );
                    storageManager.setItem(
                        globalConfig.storageConfig.lightningAmount,
                        ui.value
                    );
                    event.target.setAttribute('aria-valuenow', ui.value);
                }
            );
        },
        registerChangeSettingsHandler: () => {
            pageElements.thumbnails.forEach(currentElement => {
                function changeImage(element) {
                    const clickedElement = element.target;
                    const tempThumbnailConfig = globalConfig.thumbnailConfig;
                    const currentActiveElement = document.querySelector(
                        `.${tempThumbnailConfig.thumbnailClass}.${tempThumbnailConfig.activeClass}`
                    );

                    userSettings.changeActiveThumbnail(
                        currentActiveElement,
                        clickedElement
                    );
                    userSettings.changeImage(
                        clickedElement.src,
                        clickedElement.alt
                    );

                    storageManager.setItem(
                        globalConfig.storageConfig.backgroundImg,
                        clickedElement.id
                    );
                }

                currentElement.addEventListener('click', element => {
                    changeImage(element);
                });

                currentElement.addEventListener('keypress', element => {
                    const enterKey = 13;
                    if (element.keyCode === enterKey) {
                        changeImage(element);
                    }
                });

            });
        },
        registerPauseHandler: () => {
            pageElements.pauseButton.button.addEventListener('click', e => {
                const isSoundNowPlaying = userSettings.changeSoundState();
                storageManager.setItem(
                    globalConfig.storageConfig.isSoundPlaying,
                    isSoundNowPlaying
                );

                function initWebAudioApi() {
                    domUtility.setLoadingText(
                        pageElements.pauseButton.icon,
                        pageElements.pauseButton.loading,
                        globalConfig.labels.loading
                    );

                    rainSoundPlayer.unlockWebAudioApi();
                    rainSoundPlayer.init();
                    isWebAudioApiUnlocked = true;

                    thunderProvider.initInstances();
                }

                if (!isWebAudioApiUnlocked) {
                    initWebAudioApi();
                }
            });
        },
        registerVolumeHandler: () => {
            pageElements.volumeButton.button.addEventListener('click', function(e) {
                userSettings.changeVolume();

                storageManager.setItem(
                    globalConfig.storageConfig.volume,
                    userSettings.getCurrentVolume()
                );
            });
        },
        initThunder: () => {
            let savedThunderAmount = storageManager.getItem(
                globalConfig.storageConfig.thunderAmount
            );
            if (savedThunderAmount === null) {
                savedThunderAmount =
                    sliderUtil.allSliders[
                        sliderUtil.sliderPositions.thunderDistanceSlider
                    ].startValue;
            } else {
                savedThunderAmount = parseInt(savedThunderAmount);
            }

            sliderUtil.setValueForSlider(
                sliderUtil.allSliders[
                    sliderUtil.sliderPositions.thunderDistanceSlider
                ].$elem,
                savedThunderAmount
            );

            userSettings.changeDistanceToThunder(savedThunderAmount);
            thunderProvider.changeVolume(userSettings.getCurrentVolume());
        },
        initLightning: () => {
            let savedLightningAmount = storageManager.getItem(
                globalConfig.storageConfig.lightningAmount
            );
            if (savedLightningAmount === null) {
                savedLightningAmount =
                    sliderUtil.allSliders[
                        sliderUtil.sliderPositions.lightningSlider
                    ].startValue - 1;
            } else {
                savedLightningAmount = parseInt(savedLightningAmount);
            }

            userSettings.changeLightningFrequency(
                globalConfig.lightningConfig.timeBetweenLightning[
                    savedLightningAmount - 1
                ]
            );
            sliderUtil.setValueForSlider(
                sliderUtil.allSliders[
                    sliderUtil.sliderPositions.lightningSlider
                ].$elem,
                savedLightningAmount
            );
        },
        initVolume: () => {
            let savedVolume = storageManager.getItem(
                globalConfig.storageConfig.volume
            );
            if (savedVolume === null) {
                savedVolume = 1;
            }
            userSettings.initVolume(parseFloat(savedVolume));
        },
        initRain: function() {
            let savedRainAmount = storageManager.getItem(
                globalConfig.storageConfig.rainAmount
            );
            let calculatedIntensity;

            if (savedRainAmount !== null) {
                savedRainAmount = parseInt(savedRainAmount);
                sliderUtil.setValueForSlider(
                    sliderUtil.allSliders[sliderUtil.sliderPositions.rainSlider]
                        .$elem,
                    savedRainAmount
                );

                calculatedIntensity = this.calculateRainIntensity(
                    savedRainAmount
                );
                userSettings.changeRainIntensity(calculatedIntensity);
            } else {
                calculatedIntensity = this.calculateRainIntensity(sliderUtil.allSliders[
                    sliderUtil.sliderPositions.rainSlider
                ].startValue)
            }
            rainSoundPlayer.changeVolumeModifier(calculatedIntensity);
        },
        initSelectedThumbnail: () => {
            let idOfLastSelectedImage = storageManager.getItem(
                globalConfig.storageConfig.backgroundImg
            );
            if (idOfLastSelectedImage !== null) {
                document.getElementById(idOfLastSelectedImage).click();
            }
        },
        saveVersion: () => {
            storageManager.setItem(globalConfig.storageConfig.version, '1.2');
        }
    };
})();

initializer.initVolume();
initializer.initRain();
initializer.registerRainHandler();
initializer.registerThunderHandler();
initializer.registerLightningHandler();
initializer.registerChangeSettingsHandler();
initializer.registerPauseHandler();
initializer.registerVolumeHandler();
initializer.initThunder();
initializer.initLightning();
initializer.initSelectedThumbnail();

// TODO: implement better version handling in a next version sometime / what's new dialog
initializer.saveVersion();
