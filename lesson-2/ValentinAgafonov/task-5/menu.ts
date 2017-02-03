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


class Menu {
  protected element: HTMLElement;
  protected menuList: menuList;

  public constructor(opt: menuOpt) {
    this.element = opt.element;
    this.menuList = opt.menuList;
    this.element.innerHTML = this.generateMenu(this.menuList);
    this.element.addEventListener('click', this.clickHandler);
  }

  public getElem(): HTMLElement {
    return this.element;
  }

  public static toggleLi(li: HTMLLIElement): void {
    li.classList.toggle('menu-open');
  }

  public static openLi(li: HTMLLIElement): void {
    li.classList.add('menu-open');
  }  

  public static closeLi(li: HTMLLIElement): void {
    li.classList.remove('menu-open');
  }    

  protected clickHandler(this: void, ev: MouseEvent): void {
    let el: HTMLElement = ev.target as HTMLElement;
    let classList = el.classList;
    if (!classList.contains('title')) {
      return;
    }
    Menu.toggleLi(el.parentNode as HTMLLIElement);
  }

  protected generateMenu(menuList: menuList): string {
    let content: string = `<ul>`;
    for (let a of menuList) {
      content += `<li><a ${a.items ? 'class=title' : ''} 
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


let testGetElem = document.getElementById('testGetElem') as HTMLElement;
testGetElem.addEventListener('click', function() {
  console.log(nav.getElem());  
});

let testToggleLi = document.getElementById('testToggleLi') as HTMLElement;
testToggleLi.addEventListener('click', function() {
  Menu.toggleLi(document.querySelector('.menu li:first-child') as HTMLLIElement);
});

let testOpenLi = document.getElementById('testOpenLi') as HTMLElement;
testOpenLi.addEventListener('click', function() {
  Menu.openLi(document.querySelector('.menu li:first-child') as HTMLLIElement);
});

let testCloseLi = document.getElementById('testCloseLi') as HTMLElement;
testCloseLi.addEventListener('click', function() {
  Menu.closeLi(document.querySelector('.menu li:first-child') as HTMLLIElement);
});