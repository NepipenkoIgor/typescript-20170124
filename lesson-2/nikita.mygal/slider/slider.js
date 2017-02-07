//  6) Реализуйте слайдер
//  http://learn.javascript.ru/task/slider
var Slider = (function () {
    function Slider(sliderBox, value) {
        var _this = this;
        if (value === void 0) { value = 0; }
        this.isActive = false;
        this.sliderTpl = ("\n    <div class=\"slider\">\n        <div class=\"thumb\">\n        </div>\n    </div>\n    ");
        this.sliderBox = sliderBox;
        this.sliderBox.innerHTML = this.sliderTpl;
        this.offset = this._calcOffset();
        this.value = value;
        this.thumb = this.sliderBox.querySelector('.thumb');
        this.thumb.addEventListener('mousedown', (function () {
            _this._mousedownHandler();
        }));
        document.addEventListener('mouseup', (function () {
            _this._mouseupHandler();
        }));
        document.documentElement.addEventListener('mousemove', (function (event) {
            _this._mousemoveHandler(event);
        }));
        this._updatePosition();
    }
    Slider.prototype.getValue = function () {
        return this.value;
    };
    Slider.prototype.setValue = function (newValue) {
        var hasChange = newValue !== this.value;
        this.value = newValue;
        if (hasChange) {
            this._updatePosition();
        }
    };
    Slider.prototype._mousedownHandler = function () {
        this.isActive = true;
    };
    Slider.prototype._mouseupHandler = function () {
        this.isActive = false;
    };
    Slider.prototype._mousemoveHandler = function (event) {
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
    Slider.prototype._updatePosition = function () {
        this.thumb.style.left = this.value + '%';
    };
    Slider.prototype._calcOffset = function () {
        var box = this.sliderBox.querySelector('.slider');
        return {
            left: box.offsetLeft,
            width: box.offsetWidth
        };
    };
    return Slider;
}());
var sliderBox = document.getElementById('new-slider');
var newSlider = new Slider(sliderBox, 50);
