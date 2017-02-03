var Slider = (function () {
    function Slider(options) {
        this.isActive = false;
        this.sliderTemplate = ("\n    <div class=\"slider\">\n        <div class=\"thumb\">\n        </div>\n    </div>\n  ");
        var sliderContext = this;
        this.element = options.element;
        this.value = options.value || 0;
        this.element.innerHTML = this.sliderTemplate;
        this.offset = this.calcOffset();
        this.thumb = this.element.querySelector('.thumb');
        this.thumb.addEventListener('mousedown', function () {
            sliderContext.mousedownHandler.call(sliderContext);
        });
        document.documentElement.addEventListener('mouseup', function () {
            sliderContext.mouseupHandler.call(sliderContext);
        });
        document.documentElement.addEventListener('mousemove', function (event) {
            sliderContext.mousemoveHandler.call(sliderContext, event);
        });
        this.updatePosition();
    }
    Slider.prototype.getValue = function () {
        return this.value;
    };
    Slider.prototype.setValue = function (newValue) {
        var hasChange = newValue !== this.value;
        this.value = newValue;
        if (hasChange) {
            this.updatePosition();
        }
    };
    Slider.prototype.mousedownHandler = function () {
        this.isActive = true;
    };
    Slider.prototype.mouseupHandler = function () {
        this.isActive = false;
    };
    Slider.prototype.mousemoveHandler = function (event) {
        if (this.isActive) {
            var newPosition = 0;
            if (event.pageX > this.offset.left) {
                if (event.pageX > (this.offset.left + this.offset.width)) {
                    newPosition = 100;
                }
                else {
                    newPosition = Math.round(((event.pageX - this.offset.left) / (this.offset.width)) * 100);
                }
            }
            this.setValue(newPosition);
        }
    };
    Slider.prototype.updatePosition = function () {
        this.thumb.style.left = this.value + '%';
    };
    Slider.prototype.calcOffset = function () {
        var box = this.element.querySelector('.slider');
        return {
            left: box.offsetLeft,
            width: box.offsetWidth
        };
    };
    return Slider;
}());
var mySlider = new Slider({
    element: document.getElementById('mySlider'),
    value: 10
});
//mySlider.setValue(55);
//console.log(mySlider.getValue());   // 55
