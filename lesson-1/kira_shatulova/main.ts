type menuList = {title: string; items?: menuList}[];

const MENULIST: menuList = [
  {
    title: 'Животные', items: [
    {
      title: 'Млекопитающие', items: [
      {title: 'Коровы'},
      {title: 'Ослы'},
      {title: 'Собаки'},
      {title: 'Тигры'}
    ]
    },
    {
      title: 'Другие', items: [
      {title: 'Змеи'},
      {title: 'Птицы'},
      {title: 'Ящерицы'},
    ],
    },
  ]
  },
  {
    title: 'Рыбы', items: [
    {
      title: 'Аквариумные', items: [
      {title: 'Гуппи'},
      {title: 'Скалярии'}
    ]
    },
    {
      title: 'Форель', items: [
      {title: 'Морская форель'}
    ]
    },
  ]
  }
];

let htmlMenuList: HTMLUListElement = document.createElement('ul');

function createMenu(list: menuList, htmlMenuList) {
  for (let item of list) {
    let htmlMenuItem: HTMLLIElement = document.createElement('li');
    htmlMenuItem.innerHTML = item.title;
    htmlMenuItem.classList.add('title');
    htmlMenuList.appendChild(htmlMenuItem);
    if (!item.items) {
      continue;
    }
    let htmlMenuList1: HTMLUListElement = document.createElement('ul');
    htmlMenuItem.appendChild(htmlMenuList1);
    createMenu(item.items, htmlMenuList1);
  }
  return htmlMenuList;
}

let navMenuList: HTMLDivElement = document.querySelector('.menu') as HTMLDivElement;
navMenuList.appendChild(createMenu(MENULIST, htmlMenuList));

navMenuList.onclick = (ev: MouseEvent) => {
  let el = <HTMLLIElement>ev.target;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  el.classList.toggle('menu-open');
};
