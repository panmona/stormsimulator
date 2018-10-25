'use strict';
// Add segments to a slider
$.fn.addSliderSegments = function(amount, orientation) {
    return this.each(function() {
        if (orientation == 'vertical') {
            var output = '',
                i;
            for (i = 1; i <= amount - 2; i++) {
                output +=
                    '<div class="ui-slider-segment" style="top:' +
                    100 / (amount - 1) * i +
                    '%;"></div>';
            }
            $(this).prepend(output);
        } else {
            var segmentGap = 100 / (amount - 1) + '%',
                segment =
                    '<div class="ui-slider-segment" style="margin-left: ' +
                    segmentGap +
                    ';"></div>';
            $(this).prepend(segment.repeat(amount - 2));
        }
    });
};
