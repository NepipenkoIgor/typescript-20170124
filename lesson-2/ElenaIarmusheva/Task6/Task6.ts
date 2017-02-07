class Slider {
    protected _slider: HTMLDivElement;
    protected _thumb: HTMLDivElement;
    protected _sliderWidth: number;
    protected _shiftX: number;

    constructor({elem}) {
        this._slider = elem;
        this._thumb = elem.querySelector('.thumb');

        this._sliderWidth  = this._slider.offsetWidth - this._thumb.offsetWidth;

        this._thumb.onmousedown = (e: MouseEvent) => {
            this.thumbOnMouseDown(e);
        };

        this._thumb.ondragstart = () => {
            return false;
        };
        this._slider.onselectstart = () => {
            return false;
        };
    }

    protected thumbOnMouseDown(e) {
        this._shiftX = e.pageX - this._thumb.getBoundingClientRect().left;
        this.moveAt(e);
        this._slider.onmousemove = this.elemOnMouseMove.bind(this);
        this._thumb.onmouseup = this.thumbOnMouseUp.bind(this);
    }

    protected elemOnMouseMove (e: MouseEvent ): void {
        this.moveAt(e);
    }


    protected thumbOnMouseUp(): void {
        this._slider.onmousemove = null;
        this._thumb.onmouseup = null;
    }


    protected moveAt(e: MouseEvent): void {
        let left = e.pageX - this._shiftX - this._slider.getBoundingClientRect().left;
        left = (left < this._sliderWidth) ? left : this._sliderWidth;
        left = (left < 0 ) ? 0 : left;

        if (parseInt(getComputedStyle(this._thumb).left) !== left ) {
            this._thumb.style.left = left + 'px';
        }
    }

}

let div = document.querySelector('.slider');
let slider = new Slider({elem: div});
