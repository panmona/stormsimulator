'use strict';

const domUtility = (function() {
    return {
        setLoadingText: (iconEl, loadingEl, text) => {
            iconEl.style.display = 'none';
            loadingEl.innerHTML = text;
        },
        removeLoadingText: (iconEl, loadingEl, oldText) => {
            iconEl.style.display = 'inline-block';
            loadingEl.innerHTML = '';
        },
        changeIconFromTo: (element, fromIcon, toIcon) => {
            element.classList.remove(fromIcon);
            element.classList.add(toIcon);
        },
        changeAriaLabelTo: (element, newAriaLabel) => {
            element.setAttribute('aria-label', newAriaLabel);
        },
    };
})();
