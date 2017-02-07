//  6) Реализуйте слайдер
//  http://learn.javascript.ru/task/slider

type offsetConfig = {
    left: number,
    width: number
};

class Slider {

    private sliderBox: HTMLElement;
    private thumb: HTMLElement;
    private value: number;
    private isActive: boolean = false;
    private sliderTpl = (`
    <div class="slider">
        <div class="thumb">
        </div>
    </div>
    `);
    private offset: offsetConfig;

    public constructor(sliderBox: HTMLElement, value: number = 0) {

        this.sliderBox = sliderBox;
        this.sliderBox.innerHTML = this.sliderTpl;
        this.offset = this._calcOffset();
        this.value = value;

        this.thumb = this.sliderBox.querySelector('.thumb') as HTMLElement;
        
        this.thumb.addEventListener('mousedown', (() => {
            this._mousedownHandler();
        }));
        document.addEventListener('mouseup', (() => {
            this._mouseupHandler();
        }));
        document.documentElement.addEventListener('mousemove', ((event: MouseEvent) => {
            this._mousemoveHandler(event);
        }));

        this._updatePosition();
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(newValue: number): void {
        let hasChange: boolean = newValue !== this.value;
        this.value = newValue;
        if (hasChange) {
            this._updatePosition();
        }
    }

    private _mousedownHandler(): void {
        this.isActive = true;
    }

    private _mouseupHandler(): void {
        this.isActive = false;
    }

    private _mousemoveHandler(event: MouseEvent): void {
        if (this.isActive) {
            let newPosition: number = 0;
            if (event.pageX > this.offset.left) {
                if (event.pageX > (this.offset.left + this.offset.width)) {
                    newPosition = 100;
                } else {
                    newPosition = Math.round(((event.pageX - this.offset.left) / (this.offset.width)) * 100);
                }
            }
            this.setValue(newPosition);
        }
    }

    private _updatePosition(): void {
        this.thumb.style.left = this.value + '%';
    }

    private _calcOffset(): offsetConfig {
        let box = this.sliderBox.querySelector('.slider') as HTMLElement;
        return {
            left: box.offsetLeft,
            width: box.offsetWidth
        }
    }

}

let sliderBox = document.getElementById('new-slider') as HTMLElement;
let newSlider = new Slider(sliderBox, 50);