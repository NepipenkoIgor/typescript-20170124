var Slider = (function () {
    function Slider(_a) {
        var elem = _a.elem;
        var _this = this;
        this._slider = elem;
        this._thumb = elem.querySelector('.thumb');
        this._sliderWidth = this._slider.offsetWidth - this._thumb.offsetWidth;
        this._thumb.onmousedown = function (e) {
            _this.thumbOnMouseDown(e);
        };
        this._thumb.ondragstart = function () {
            return false;
        };
        this._slider.onselectstart = function () {
            return false;
        };
    }
    Slider.prototype.thumbOnMouseDown = function (e) {
        this._shiftX = e.pageX - this._thumb.getBoundingClientRect().left;
        this.moveAt(e);
        this._slider.onmousemove = this.elemOnMouseMove.bind(this);
        this._thumb.onmouseup = this.thumbOnMouseUp.bind(this);
    };
    Slider.prototype.elemOnMouseMove = function (e) {
        this.moveAt(e);
    };
    Slider.prototype.thumbOnMouseUp = function () {
        this._slider.onmousemove = null;
        this._thumb.onmouseup = null;
    };
    Slider.prototype.moveAt = function (e) {
        var left = e.pageX - this._shiftX - this._slider.getBoundingClientRect().left;
        left = (left < this._sliderWidth) ? left : this._sliderWidth;
        left = (left < 0) ? 0 : left;
        if (parseInt(getComputedStyle(this._thumb).left) !== left) {
            this._thumb.style.left = left + 'px';
        }
    };
    return Slider;
}());
var div = document.querySelector('.slider');
var slider = new Slider({ elem: div });
