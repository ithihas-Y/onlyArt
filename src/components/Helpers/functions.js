export const createRipple = (ref) => {
    let cleanUp, debounce, i, len, ripple, rippleContainer, ripples, showRipple;

    debounce = function (func, delay) {
        let inDebounce;
        inDebounce = undefined;
        return function () {
            let args, context;
            context = this;
            args = arguments;
            clearTimeout(inDebounce);
            return inDebounce = setTimeout(function () {
                return func.apply(context, args);
            }, delay);
        };
    };

    showRipple = function (e) {
        let pos, ripple, rippler, size, style, x, y;
        rippler = document.createElement('span');
        size = ref.offsetWidth;
        pos = ref.getBoundingClientRect();
        x = e.pageX - pos.left - (size / 2);
        y = -80;
        style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
        ref.rippleContainer.appendChild(rippler);
        return rippler.setAttribute('style', style);
    };

    cleanUp = function () {
        while (ref.rippleContainer.firstChild) {
            ref.rippleContainer.removeChild(ref.rippleContainer.firstChild);
        }
    };

    // ripples = document.querySelectorAll('[ripple]');
    // for (i = 0, len = ripples.length; i < len; i++) {
    //     ripple = ripples[i];
        rippleContainer = document.createElement('div');
        rippleContainer.className = 'ripple--container';
        // ripple.addEventListener('mousedown', showRipple);
        // ripple.addEventListener('mouseup', debounce(cleanUp, 2000));
        // ripple.rippleContainer = rippleContainer;
        // ripple.appendChild(rippleContainer);
        ref.addEventListener('mousedown', showRipple);
        ref.addEventListener('mouseup', debounce(cleanUp, 2000));
        ref.rippleContainer = rippleContainer;
        ref.appendChild(rippleContainer);
    // }
}