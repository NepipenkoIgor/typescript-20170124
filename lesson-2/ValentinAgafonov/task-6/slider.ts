
type sliderOptions = {
    element: HTMLElement,
    value?: number
};

type offsetConfig = {
    left: number,
    width: number
}

class Slider {

  private element: HTMLElement;
  private thumb: HTMLElement;
  private value: number;
  private isActive: boolean = false;
  private sliderTemplate = (`
    <div class="slider">
        <div class="thumb">
        </div>
    </div>
  `);
  private offset: offsetConfig;

  public constructor(options: sliderOptions) {

    let sliderContext = this;
    
    this.element = options.element;
    this.value = options.value || 0;
    
    this.element.innerHTML = this.sliderTemplate;

    this.offset = this.calcOffset();    

    this.thumb = this.element.querySelector('.thumb') as HTMLElement;
    this.thumb.addEventListener('mousedown', function () {
        sliderContext.mousedownHandler.call(sliderContext);
    });
    document.documentElement.addEventListener('mouseup', function () {
        sliderContext.mouseupHandler.call(sliderContext);
    });
    document.documentElement.addEventListener('mousemove', function (event: MouseEvent) {
        sliderContext.mousemoveHandler.call(sliderContext, event);
    })

    this.updatePosition();
    
  }

  public getValue(): number {
      return this.value;
  }

  public setValue(newValue: number): void {
      let hasChange: boolean = newValue !== this.value;
      this.value = newValue;
      if (hasChange) {
        this.updatePosition();
      }
  }

  private mousedownHandler():void {
    this.isActive = true;
  }

  private mouseupHandler():void {
    this.isActive = false;
  }

  private mousemoveHandler(event: MouseEvent):void {
      
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

  private updatePosition(): void {
      this.thumb.style.left = this.value + '%';
  }

  private calcOffset(): offsetConfig {
      let box = this.element.querySelector('.slider') as HTMLElement;
      return {
          left: box.offsetLeft,
          width: box.offsetWidth
      }
  }

}




let mySlider = new Slider({ 
    element: document.getElementById('mySlider') as HTMLElement, 
    value: 10
});


//mySlider.setValue(55);
//console.log(mySlider.getValue());   // 55


