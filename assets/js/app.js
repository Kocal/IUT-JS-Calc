function App(calc, $input, $output) {

    var els = [$input, $output];

    if (!(
        calc instanceof Calc)) {
        throw new Error("Expected an instance of Calc");
    }

    for (var i = 0, len = els.length; i < len; i++) {
        if (els[i] == null) {
            throw new Error("One of elements cannot be found");
        }
    }

    this.calc = calc;
    this.$input = $input;
    this.$output = $output;
}

App.prototype.init = function () {
    this.update();
    this.bindEvents();
};

App.prototype.update = function () {
    this.$output.innerHTML = this.calc.calculate($input.value);
};

App.prototype.bindEvents = function () {
    var self = this;

    this.$input.addEventListener('input', debounce(function () {
        self.update();
    }, 250), false);
};


function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            func.apply(context, args);
        }
    };
};
