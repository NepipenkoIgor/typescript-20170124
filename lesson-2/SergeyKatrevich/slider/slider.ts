/**
 * Created by LinkFly on 2/3/2017.
 */
/*6) Реализуйте слайдер
http://learn.javascript.ru/task/slider
*/

////////////////////// SliderBase ///////////////////////////
abstract class SliderBase {
  private moveAble: boolean = false;
  public constructor(protected elContainer: HTMLDivElement,
                     protected elBox: HTMLDivElement,
                     protected elSlide: HTMLDivElement) {
    this.addListeners();
    this.setSliderXByMouseX(200);
  }

  public addListeners(): void {
    this.elSlide.addEventListener('mousedown', () => { this.moveAble = true; });

    window.addEventListener('mouseup', () => {
      if (this.moveAble) { this.moveAble = false; }
    });

    this.elContainer.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
  }

  protected getSliderSlideW(): number {
    let pxWidth: string = getComputedStyle(this.elSlide).width;
    pxWidth = pxWidth.slice(0, -2); // delete px at the end
    return parseInt(pxWidth, 10);
  }

  protected mouseMoveHandler(ev: MouseEvent): void {
    if (!this.moveAble) { return; }
    this.setSliderXByMouseX(ev.clientX);
  };

  protected setSliderXByMouseX(mouseX: number): void {
    let curSlideX: number = mouseX - this.getSliderSlideW() / 2;
    curSlideX = this.correctSlideX(curSlideX);
    elSliderSlide.style.left = `${curSlideX}px`;
  }

  protected abstract correctSlideX(x: number): number;
}

////////////////////// Slider ///////////////////////////
interface ISliderState {
  x: number;
}
interface ISliderParts {
  container: HTMLElement;
  box: HTMLElement;
  slide: HTMLElement;
}
interface ISlider {
  state: ISliderState;
  getParts(): ISliderParts;
  report?(): void;
}

class Slider extends SliderBase implements ISlider {
  private x: number;

  public get state(): ISliderState {
    return { x: this.x };
  }
  public getParts(): ISliderParts {
    return {
      box: this.elBox,
      container: this.elContainer,
      slide: this.elSlide,
    };
  }

  public report() {
    const parts: ISliderParts = this.getParts();
    const x: number = this.state.x;
    console.log(`Slider details:
x = ${x}
container = ${parts.container}
box = ${parts.box}
slide = ${parts.slide}
  `);
  }

  protected correctSlideX(x: number): number {
    const sliderSlideW = this.getSliderSlideW();
    const rect: ClientRect = this.elBox.getBoundingClientRect();
    const sliderMinX = rect.left;
    const sliderMaxX = rect.right;
    x -= sliderMinX;
    const maxX: number = sliderMaxX - sliderMinX - sliderSlideW;
    if (x < 0) {
      x = 0;
    } else if (x > maxX) {
      x = maxX;
    }
    this.x = x;
    return x;
  }
}

///////////////////////// Using Slider /////////////////////////
let sel: Function = document.querySelector.bind(document);
let elSliderContainer: HTMLDivElement = sel('.slider-container');
let elSliderSlide: HTMLDivElement = sel('.slider-slide');
let elSliderBox: HTMLDivElement = sel('.slider-box');
const slider = new Slider(elSliderContainer, elSliderBox, elSliderSlide);
console.log('slider: ', slider, 'state: ', slider.state, 'parts: ', slider.getParts());
slider.report();
