type menuList = { title: string, link?: string, items?: menuList }[];
type menuOpt = { element: HTMLElement, menuList: menuList };

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


class Menu {
  protected element: HTMLElement;
  protected menuList: menuList;
  protected ids: number[];

  public constructor(opt: menuOpt) {
    this.element = opt.element;
    this.menuList = opt.menuList;
    this.ids = [];
    this.element.innerHTML = this.generateMenu(this.menuList);
    this.element.addEventListener('click', this.clickHandler);
  }

  protected clickHandler(this: void, ev: MouseEvent): void {
    let el: HTMLElement = <HTMLElement>ev.target;
    let classList = el.classList;
    if (!classList.contains('title')) {
      return;
    }
    let parentLi = <HTMLLIElement>el.parentNode;
    parentLi.classList.toggle('menu-open');
  }

  protected generateMenu(menuList: menuList): string {
    let content: string = `<ul>`;
    let id: number;
    for (let a of menuList) {
      id = this.ids.length + 1;
      this.ids.push(id);
      content += `<li data-id=${id}><a ${a.items ? 'class=title' : ''}${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
      if (!a.items) {
        content += `</li>`;
        continue;
      }
      content += `${this.generateMenu(a.items)}</li>`;
    }
    return `${content}</ul>`;
  }

  protected getMenuItemById(id: number): HTMLLIElement|null {
    if (!~this.ids.indexOf(id)) {
      return null;
    }
    return <HTMLLIElement>this.element.querySelector(`li[data-id="${id}"]`);
  }

  public getElem(): HTMLElement {
    return this.element;
  }

  public open(id: number): void {
    let mi: HTMLLIElement|null = this.getMenuItemById(id);
    if (mi === null) {
      return;
    }
    if (mi.classList.contains('menu-open')) {
      return;
    }
    mi.classList.add('menu-open');
  }

  public close(id: number): void {
    let mi: HTMLLIElement|null = this.getMenuItemById(id);
    if (mi === null) {
      return;
    }
    if (!mi.classList.contains('menu-open')) {
      return;
    }
    mi.classList.remove('menu-open');
  }

  public toggle(id: number): void {
    let mi: HTMLLIElement|null = this.getMenuItemById(id);
    if (mi === null) {
      return;
    }
    if (mi.classList.contains('menu-open')) {
      mi.classList.remove('menu-open');
      return;
    }
    mi.classList.add('menu-open');
  }
}

let element = <HTMLElement>document.querySelector('.menu');
let nav = new Menu({element, menuList});
let inp = <HTMLInputElement>document.querySelector('input');

// Show id of current menu item
element.addEventListener('mouseover', (ev: MouseEvent) => {
  let el: HTMLElement = <HTMLElement>ev.target;
  let id: string|null = (<HTMLElement>el.parentElement).getAttribute('data-id');
  if (id === null) {
    return;
  }
  inp.value = id;
});

(<HTMLButtonElement>document.querySelector('#btOpen')).addEventListener('click', () => { nav.open(+inp.value); });
(<HTMLButtonElement>document.querySelector('#btClose')).addEventListener('click', () => { nav.close(+inp.value); });
(<HTMLButtonElement>document.querySelector('#btToggle')).addEventListener('click', () => { nav.toggle(+inp.value); });