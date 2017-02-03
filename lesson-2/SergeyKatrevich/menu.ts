/*5) Улучшите класс с менюшкой добавив публичные методы
getElem -возвращает елемент в котором генерится меню;
toggle открыть/закрыть элемент меню по метке;
close закрыть элемент меню по метке;
open открыть элемент меню по метке

в интерфейсе реализуйте кнопками вызов этих методов ( например над меню)
P.S. для демонстрации*/

interface IMenu {
  getElem(): HTMLElement;
  toggle(mark: string): void;
  close(mark: string): void;
  open(mark: string): void;
}

type menuList = {title: string, mark?: string, link?: string, items?: menuList}[];
type menuOpt = {element: HTMLElement, menuList: menuList};
let menuList: menuList = [
  {
    title: 'Животные',
    mark: 'mark',
    items: [
      {
        title: 'Млекопитающие',
        items: [
          {title: 'Коровы'},
          {title: 'Ослы'},
          {title: 'Собаки'},
          {title: 'Тигры'}
        ]
      },
      {
        title: 'Другие',
        items: [
          {title: 'Змеи'},
          {title: 'Птицы'},
          {title: 'Ящерицы'},
        ],
      }
    ]
  },
  {
    title: 'Рыбы',
    items: [
      {
        title: 'Аквариумные',
        items: [
          {title: 'Гуппи'},
          {title: 'Скалярии'}
        ]
      },
      {
        title: 'Форель',
        items: [
          {title: 'Морская форель'}
        ]
      }
    ]
  }
];

class Menu implements IMenu {
  protected element: HTMLElement;
  protected menuList: menuList;

  static toggleMenu(el: HTMLElement) {
    const parentLi: HTMLElement = el.parentNode as HTMLElement;
    parentLi.classList.toggle('menu-open');
  }

  static openMenu(el: HTMLElement) {
    const parentLi: HTMLElement = el.parentNode as HTMLElement;
    parentLi.classList.add('menu-open');
  }

  static closeMenu(el: HTMLElement) {
    const parentLi: HTMLElement = el.parentNode as HTMLElement;
    parentLi.classList.remove('menu-open');
  }

  public constructor(opt: menuOpt) {
    this.element = opt.element;
    this.menuList = opt.menuList;
    this.element.innerHTML = this.generateMenu(this.menuList);
    this.element.addEventListener('click', this.clickHandler);
  }

  public getElem(): HTMLElement {
    return this.element;
  }

  public toggle(mark: string) {
    const elem: HTMLElement = this.findElementByMark(mark);
    Menu.toggleMenu(elem);
  }

  public close(mark: string) {
    const elem: HTMLElement = this.findElementByMark(mark);
    Menu.closeMenu(elem);
  }

  public open(mark: string) {
    const elem: HTMLElement = this.findElementByMark(mark);
    Menu.openMenu(elem);
  }

  protected clickHandler(this: void, ev: MouseEvent): void {
    const el: HTMLElement = ev.target as HTMLElement;
    const classList = el.classList;
    if (!classList.contains('title')) {
      return;
    }
    const parentLi = el.parentNode as HTMLLIElement;
    parentLi.classList.toggle('menu-open');
  }

  protected generateMenu(menu: menuList): string {
    let content: string = `<ul>`;
    for (const a of menu) {
      const mark: string = a.mark ? ` data-mark="${a.mark}"` : '';
      const href = a.link ? ' href=' + a.link : '';
      const cls = a.items ? ' class=title' : '';
      content += `<li><a ${cls}${href}${mark}>${a.title}</a>`;
      if (!a.items) {
        content += `</li>`;
        continue;
      }
      content += `${this.generateMenu(a.items)}</li>`;
    }
    return `${content}</ul>`;
  }

  protected findElementByMark(mark: string): HTMLElement {
    return this.element.querySelector(`data-mark="${mark}"`) as HTMLElement;
  }

}

let element = document.querySelector('.menu') as HTMLElement;
let nav = new Menu({element, menuList})

const mark: string = 'mark';
let btnGetElem: HTMLButtonElement = document.querySelector('#getElem') as HTMLButtonElement;
let btnToggle: HTMLButtonElement = document.querySelector('#toggle') as HTMLButtonElement;
let btnClose: HTMLButtonElement = document.querySelector('#close') as HTMLButtonElement;
let btnOpen: HTMLButtonElement = document.querySelector('#open') as HTMLButtonElement;

btnToggle.addEventListener('click', () => {
  console.log(nav.getElem());
});

btnToggle.addEventListener('click', () => {
  nav.toggle(mark);
});

btnOpen.addEventListener('click', () => {
  nav.open(mark);
});

btnToggle.addEventListener('click', () => {
  nav.close(mark);
});


