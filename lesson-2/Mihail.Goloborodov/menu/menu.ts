type menuList = {title: string, link?: string, items?: menuList}[];
type menuOpt = {element: HTMLElement, menuList: menuList};
let menuList: menuList = [
  {
    title: 'Животные',
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

interface IMenu {
  getElem(): HTMLElement;
  open(id: number): void;
  close(id: number): void;
  toggle(id: number): void;
}

class Menu implements IMenu {
  private _element: HTMLElement;
  private _menuList: menuList;

  public constructor(opt: menuOpt) {
    this._element = opt.element;
    this._menuList = opt.menuList;
    this._element.innerHTML = this.generateMenu(this._menuList);
    this._element.addEventListener('click', this.clickHandler);
  }

  public lastId: number = 0;

  public getElem(): HTMLElement {
    return this._element;
  }

  public open(id: number): void {
    this.toggle(id, true);
  }

  public close(id: number): void {
    this.toggle(id, false);
  }

  public toggle(id: number, value?: boolean): void {
    let el: HTMLLIElement = this.getElem().querySelector(`li[data-id="${id}"]`) as HTMLLIElement;
    el.classList.toggle('menu-open', value);
  }

  public getNextId(): number {
    return ++this.lastId;
  }

  protected clickHandler(this: void, ev: MouseEvent): void {
    let el: HTMLElement = ev.target as HTMLElement;
    let classList = el.classList;
    if (!classList.contains('title')) {
      return;
    }
    let parentLi: HTMLLIElement = el.parentNode as HTMLLIElement;
    parentLi.classList.toggle('menu-open');
  }

  protected generateMenu(menuList: menuList): string {
    let content: string = `<ul>`;
    for (let a of menuList) {
      content += `<li data-id="${this.getNextId()}"><a ${a.items ? 'class=title' : ''}
        ${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
      if (!a.items) {
        content += `</li>`;
        continue;
      }
      content += `${this.generateMenu(a.items)}</li>`;
    }
    return `${content}</ul>`;
  }
}


let element = document.querySelector('.menu') as HTMLElement;
let nav = new Menu({element, menuList});