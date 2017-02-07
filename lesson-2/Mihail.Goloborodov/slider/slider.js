var Slider = (function () {
    function Slider(sliderElem) {
        this.slider = sliderElem;
        this.slider.classList.add('slider');
        this.thumb = this.createThumb();
        this.slider.appendChild(this.thumb);
        this.slider.addEventListener('mousedown', this.sliderMouseDownHandler.bind(this));
    }
    Slider.getPos = function (el) {
        var box = el.getBoundingClientRect(), coords = { top: 0, left: 0 };
        coords.top = box.top + pageYOffset;
        coords.left = box.left + pageXOffset;
        return coords;
    };
    Slider.prototype.createThumb = function () {
        var thumb = document.createElement('div');
        thumb.classList.add('thumb');
        thumb.addEventListener('mousedown', this.thumbMouseDownHandler.bind(this));
        thumb.ondragstart = function () { return false; };
        return thumb;
    };
    Slider.prototype.sliderMouseDownHandler = function (e) {
        var sliderPos = Slider.getPos(this.slider);
        this.thumb.style.left = e.pageX - sliderPos.left - this.thumb.offsetWidth / 2 + 'px';
    };
    Slider.prototype.thumbMouseDownHandler = function (e) {
        var thumb = this.thumb;
        var slider = this.slider;
        var thumbPos = Slider.getPos(thumb);
        var shiftX = e.pageX - thumbPos.left;
        var sliderPos = Slider.getPos(slider);
        function onMouseMove(e) {
            var newLeft = e.pageX - shiftX - sliderPos.left;
            if (newLeft < 0) {
                newLeft = 0;
            }
            var rightEdge = slider.offsetWidth - thumb.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }
            thumb.style.left = newLeft + 'px';
        }
        function onMouseUp(e) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };
    return Slider;
}());
var slider = new Slider(document.querySelector('#slider'));
