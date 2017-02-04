/**
 * Created by LinkFly on 2/3/2017.
 */
/*6) Реализуйте слайдер
http://learn.javascript.ru/task/slider
*/
let sel: Function = document.querySelector.bind(document);
let elSliderContainer: HTMLDivElement = sel('.slider-container');
let elSliderSlide: HTMLDivElement = sel('.slider-slide');
let elSliderBox: HTMLDivElement = sel('.slider-box');
let moveAble: boolean = false;
let sliderSlideW: number;
let sliderMinX: number;
let sliderMaxX: number;

function getSliderSlideW(el: HTMLDivElement): number {
  let pxWidth: string = getComputedStyle(el).width;
  pxWidth = pxWidth.slice(0, -2); // delete px at the end
  return parseInt(pxWidth, 10);
}

function correctSlideX(x: number): number {
  x -= sliderMinX;
  const maxX: number = sliderMaxX - sliderMinX - sliderSlideW;
  if (x < 0) {
    x = 0;
  } else if (x > maxX) {
    x = maxX;
  }
  console.log('corrected: ', x);
  return x;
}

function mouseMoveHandler(this: void, ev: MouseEvent): void {
  if (!moveAble) { return; }
  let curSlideX: number = ev.clientX - sliderSlideW / 2;
  curSlideX = correctSlideX(curSlideX);
  elSliderSlide.style.left = `${curSlideX}px`;
}

function addListeners(): void {
  elSliderSlide.addEventListener('mousedown', () => { moveAble = true; });

  window.addEventListener('mouseup', () => {
    if (moveAble) { moveAble = false; }
  });

  elSliderContainer.addEventListener('mousemove', mouseMoveHandler);
}

function sliderInit(): void {
  sliderSlideW = getSliderSlideW(elSliderSlide);
  const rect: ClientRect = elSliderBox.getBoundingClientRect();
  sliderMinX = rect.left;
  sliderMaxX = rect.right;
  addListeners();
}

sliderInit();
