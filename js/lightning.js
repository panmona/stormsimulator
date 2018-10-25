'use strict';

const lightningProvider = (function() {
    const getBrightnessString = (brightness, usePercentage = true) => {
        const percentSymbol = usePercentage ? '%' : '';
        return `brightness(${brightness}${percentSymbol})`;
    };

    const removeFilter = timeout => {
        setTimeout(() => {
            const normalBrightnessPercentage = 100;
            pageElements.resultImage.style.filter = getBrightnessString(
                normalBrightnessPercentage
            );
        }, timeout);
    };

    const hitLightning = intensity => {
        pageElements.resultImage.style.filter = getBrightnessString(intensity);

        const timeout = 80;
        removeFilter(timeout);
    };

    let currentTimeOut;
    return {
        start: function(timeMin, timeMax) {
            const lightningLoop = () => {
                const timeUntilNextHit = randomIntFromInterval(
                    timeMin,
                    timeMax
                );
                const intensityOfLightning = randomIntFromInterval(
                    globalConfig.lightningConfig.minimumBrightnessAmount,
                    globalConfig.lightningConfig.maximumBrightnessAmount
                );

                currentTimeOut = setTimeout(() => {
                    hitLightning(intensityOfLightning);
                    thunderProvider.scheduleThunder();
                    lightningLoop();
                }, timeUntilNextHit);
            };

            lightningLoop();
        },
        stop: function() {
            clearTimeout(currentTimeOut);
        },
    };
})();
