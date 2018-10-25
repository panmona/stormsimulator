'use strict';

// I would like to not use JQuery but it's not possible as the Slider Plugin I use is written in JQuery.
// That's why I use it as less as possible. And only in this file.

const sliderUtil = {
    initSingleSlider: ($object, min, max, value, step) => {
        if ($object.length > 0) {
            $object
                .slider({
                    min: min,
                    max: max,
                    value: value,
                    orientation: 'horizontal',
                    range: 'min',
                })
                .addSliderSegments($object.slider('option').max);
            let domElement = $object[0];
            domElement.setAttribute('aria-valuemin', min);
            domElement.setAttribute('aria-valuemax', max);
            domElement.setAttribute('aria-valuenow', value);
            domElement.querySelector('a').setAttribute('tabIndex', 0); // Allow Tabbing to Handler
        } else {
            console.error('The object length was lower than zero!');
        }
    },
    allSliders: [
        {
            $elem: $(document.getElementById('rain-slider')),
            min: 5,
            max: 20,
            startValue: 11,
            step: 1,
        },
        {
            $elem: $(document.getElementById('lightning-slider')),
            min: 1,
            max: 9,
            startValue: 5,
            step: 1,
        },
        {
            $elem: $(document.getElementById('thunderDistance-slider')),
            min: 1,
            max: globalConfig.thunderConfig.maxNumberKm,
            startValue: 3,
            step: 1,
        },
    ],
    sliderPositions: {
        rainSlider: 0,
        lightningSlider: 1,
        thunderDistanceSlider: 2,
    },
    initSliders: function() {
        this.allSliders.forEach(slider => {
            this.initSingleSlider(
                slider.$elem,
                slider.min,
                slider.max,
                slider.startValue,
                slider.step
            );
        });
    },
    registerEventHandler: ($elem, eventType, whatToDo) => {
        $elem.on(eventType, whatToDo);
    },
    setValueForSlider: ($sliderElem, newValue) => {
        $sliderElem.slider('value', newValue);
        $sliderElem[0].setAttribute('aria-valuenow', newValue);
    },
};
Object.freeze(sliderUtil);

sliderUtil.initSliders();
