type Pos = {top: number, left: number};

class Slider {
  protected slider: HTMLDivElement;
  protected thumb: HTMLDivElement;

  constructor(sliderElem: HTMLDivElement) {
    this.slider = sliderElem;
    this.slider.classList.add('slider');
    this.thumb = this.createThumb();
    this.slider.appendChild(this.thumb);
    this.slider.addEventListener('mousedown', this.sliderMouseDownHandler.bind(this));
  }

  protected static getPos(el: HTMLElement): Pos {
    let box = el.getBoundingClientRect(),
      coords: Pos = {top: 0, left: 0};

    coords.top = box.top + pageYOffset;
    coords.left = box.left + pageXOffset;

    return coords;
  }

  protected createThumb(): HTMLDivElement {
    let thumb: HTMLDivElement = document.createElement('div');
    thumb.classList.add('thumb');
    thumb.addEventListener('mousedown', this.thumbMouseDownHandler.bind(this));
    thumb.ondragstart = () => false;
    return thumb;
  }

  protected sliderMouseDownHandler (this: Slider, e: MouseEvent): void {
   let sliderPos: Pos = Slider.getPos(this.slider);
   this.thumb.style.left = e.pageX - sliderPos.left - this.thumb.offsetWidth / 2 + 'px';
  }

  protected thumbMouseDownHandler (this: Slider, e: MouseEvent): void {
    let thumb = this.thumb;
    let slider = this.slider;
    let thumbPos: Pos = Slider.getPos(thumb);
    let shiftX: number = e.pageX - thumbPos.left;
    let sliderPos: Pos = Slider.getPos(slider);

    function onMouseMove(this: void, e: MouseEvent): void {
      let newLeft = e.pageX - shiftX - sliderPos.left;

      if (newLeft < 0) {
        newLeft = 0;
      }

      let rightEdge = slider.offsetWidth - thumb.offsetWidth;

      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      thumb.style.left = newLeft + 'px';
    }

    function onMouseUp(this: void, e: MouseEvent): void {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
}

let slider = new Slider(document.querySelector('#slider') as HTMLDivElement);