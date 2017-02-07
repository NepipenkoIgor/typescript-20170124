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
          {title: 'Ящерицы'}
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
  toggle(id: number, isOpen?: boolean): void;
  close(id: number): void;
  open(id: number): void;
}

class Menu implements IMenu {
  protected element: HTMLElement;
  protected menuList: menuList;

  public getElem(): HTMLElement {
    console.log(this.element);
    return this.element;
  }
  public toggle(id: number, isOpen?: boolean): void {
    let el: HTMLElement = document.getElementById(`link-id-${id}`) as HTMLElement;
    let parentLi = el.parentNode as HTMLLIElement;
    if (!el.classList.contains('title')) {
      return;
    }
    if (isOpen === true) {
      parentLi.classList.add('menu-open');
      return;
    }
    if (isOpen === false) {
      parentLi.classList.remove('menu-open');
      return;
    }
    // Default
    parentLi.classList.toggle('menu-open');
  }

  public close(id: number): void {
    this.toggle(id, false);
  }
  public open(id: number): void {
    this.toggle(id, true);
  }
  public constructor(opt: menuOpt) {
    this.element = opt.element;
    this.menuList = opt.menuList;
    this.element.innerHTML = this.generateMenu(this.menuList);
    this.element.addEventListener('click', this.clickHandler);
    this.addLinkIds();
  }
  protected addLinkIds(this: void): void {
    let links = document.querySelectorAll('[data-link]') as HTMLCollection;
    for (let i = 0; i < links.length; i++) {
      links[i].id = 'link-id-' + i;
    }
  }

  protected clickHandler(this: void, ev: MouseEvent): void {
    let el: HTMLElement = ev.target as HTMLElement;
    let classList = el.classList;
    if (!classList.contains('title')) {
      return;
    }
    let parentLi = el.parentNode as HTMLLIElement;
    parentLi.classList.toggle('menu-open');
  }

  protected generateMenu(menuList: menuList): string {
    let content: string = `<ul>`;
    for (let a of menuList) {
      content += `<li><a data-link ${a.items ? 'class=title' : ''}${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
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
