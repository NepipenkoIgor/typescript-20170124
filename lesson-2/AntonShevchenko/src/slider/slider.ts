class Slider {
    protected ui: {container: HTMLElement, thumb: HTMLElement};
    protected shift: Coords;
    constructor(sliderOptions: SliderOptions) {
        this.ui = {
            container: sliderOptions.el,
            thumb: Slider.getThumbFromContainer(sliderOptions)
        };
        this.bindThisToHandlers();
        this.bindMouseDown();
    }

    protected thumbMouseDownHandler(event: MouseEvent): void {
        let mouseClickCoords: Coords = Slider.mapMouseEventCoords(event);
        let thumbRect = this.ui.thumb.getBoundingClientRect();
        let thumbCoords: Coords = {x: thumbRect.left, y: thumbRect.top};

        this.startSliding(mouseClickCoords, thumbCoords);
    }

    protected static mapMouseEventCoords(event: MouseEvent): Coords {
        return {x: event.clientX, y: event.clientY};
    }

    protected documentMouseUpHandler(): void {
        this.stopSliding();
    }

    protected documentMouseMoveHandler(event: MouseEvent): void {
        let mouseCoords: Coords = Slider.mapMouseEventCoords(event);
        this.moveThumb(mouseCoords);
    }

    protected startSliding(mouseClickCoords: Coords, thumbCoords: Coords): void {
        this.calculateShift(mouseClickCoords, thumbCoords);
        this.bindMouseUpAndMouseMove();
    }

    protected moveThumb(mouseCoords: Coords): void {
        let thumbNewPosition: number = this.calculateThumbPosition(mouseCoords);
        this.setThumbLeftPosition(thumbNewPosition);
    }

    protected stopSliding(): void {
        this.unBindMouseUpAndMouseMove();
    }

    protected static getThumbFromContainer(sliderOptions: SliderOptions): HTMLElement {
        return sliderOptions.el.querySelector('.thumb') as HTMLElement;
    }

    private bindMouseDown(): void {
        this.ui.thumb.addEventListener('mousedown', this.thumbMouseDownHandler);
    }

    private bindThisToHandlers(): void {
        this.thumbMouseDownHandler = this.thumbMouseDownHandler.bind(this);
        this.documentMouseUpHandler = this.documentMouseUpHandler.bind(this);
        this.documentMouseMoveHandler = this.documentMouseMoveHandler.bind(this);
    }

    private bindMouseUpAndMouseMove(): void {
        document.addEventListener('mouseup', this.documentMouseUpHandler);
        document.addEventListener('mousemove', this.documentMouseMoveHandler);
    }

    private unBindMouseUpAndMouseMove(): void {
        document.removeEventListener('mouseup', this.documentMouseUpHandler);
        document.removeEventListener('mousemove', this.documentMouseMoveHandler);
    }

    private calculateShift(mouseClickCoords: Coords, thumbCoords: Coords): void {
        this.shift = {
            x: (mouseClickCoords.x - thumbCoords.x),
            y: (mouseClickCoords.y - thumbCoords.y)
        };
    }

    private setThumbLeftPosition(thumbNewPosition: number): void {
        this.ui.thumb.style.left = `${thumbNewPosition}px`;
    }

    private calculateThumbPosition(mouseCoords: Coords): number {
        let containerRect: ClientRect = this.ui.container.getBoundingClientRect();
        let leftPos: number = (mouseCoords.x - containerRect.left - this.shift.x);

        let leftMaxPos: number = Slider.maxLeftPoint;
        if (leftPos < leftMaxPos) {
            leftPos = leftMaxPos;
        }

        let rightMaxPos: number = this.calculateMaxRightPoint(containerRect);
        if (leftPos > rightMaxPos) {
            leftPos = rightMaxPos;
        }

        return leftPos;
    }

    protected calculateMaxRightPoint(containerRect: ClientRect): number {
        return containerRect.width - this.ui.thumb.offsetWidth;
    }

    static get maxLeftPoint(): number {
        return 0;
    }
}
type Coords = {x: number, y: number};
type SliderOptions = {el: HTMLElement};


new Slider({el: document.getElementById('slider')});