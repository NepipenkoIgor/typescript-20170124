/**
 * Created by LinkFly on 2/3/2017.
 */
/*6) Реализуйте слайдер
http://learn.javascript.ru/task/slider
*/
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
////////////////////// SliderBase ///////////////////////////
var SliderBase = (function () {
    function SliderBase(elContainer, elBox, elSlide) {
        this.elContainer = elContainer;
        this.elBox = elBox;
        this.elSlide = elSlide;
        this.moveAble = false;
        this.addListeners();
        this.setSliderXByMouseX(200);
    }
    SliderBase.prototype.addListeners = function () {
        var _this = this;
        this.elSlide.addEventListener('mousedown', function () { _this.moveAble = true; });
        window.addEventListener('mouseup', function () {
            if (_this.moveAble) {
                _this.moveAble = false;
            }
        });
        this.elContainer.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    };
    SliderBase.prototype.getSliderSlideW = function () {
        var pxWidth = getComputedStyle(this.elSlide).width;
        pxWidth = pxWidth.slice(0, -2); // delete px at the end
        return parseInt(pxWidth, 10);
    };
    SliderBase.prototype.mouseMoveHandler = function (ev) {
        if (!this.moveAble) {
            return;
        }
        this.setSliderXByMouseX(ev.clientX);
    };
    ;
    SliderBase.prototype.setSliderXByMouseX = function (mouseX) {
        var curSlideX = mouseX - this.getSliderSlideW() / 2;
        curSlideX = this.correctSlideX(curSlideX);
        elSliderSlide.style.left = curSlideX + "px";
    };
    return SliderBase;
}());
var Slider = (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Slider.prototype, "state", {
        get: function () {
            return { x: this.x };
        },
        enumerable: true,
        configurable: true
    });
    Slider.prototype.getParts = function () {
        return {
            box: this.elBox,
            container: this.elContainer,
            slide: this.elSlide,
        };
    };
    Slider.prototype.report = function () {
        var parts = this.getParts();
        var x = this.state.x;
        console.log("Slider details:\nx = " + x + "\ncontainer = " + parts.container + "\nbox = " + parts.box + "\nslide = " + parts.slide + "\n  ");
    };
    Slider.prototype.correctSlideX = function (x) {
        var sliderSlideW = this.getSliderSlideW();
        var rect = this.elBox.getBoundingClientRect();
        var sliderMinX = rect.left;
        var sliderMaxX = rect.right;
        x -= sliderMinX;
        var maxX = sliderMaxX - sliderMinX - sliderSlideW;
        if (x < 0) {
            x = 0;
        }
        else if (x > maxX) {
            x = maxX;
        }
        this.x = x;
        return x;
    };
    return Slider;
}(SliderBase));
///////////////////////// Using Slider /////////////////////////
var sel = document.querySelector.bind(document);
var elSliderContainer = sel('.slider-container');
var elSliderSlide = sel('.slider-slide');
var elSliderBox = sel('.slider-box');
var slider = new Slider(elSliderContainer, elSliderBox, elSliderSlide);
console.log('slider: ', slider, 'state: ', slider.state, 'parts: ', slider.getParts());
slider.report();
//# sourceMappingURL=slider.js.map