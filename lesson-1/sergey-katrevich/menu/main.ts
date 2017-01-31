type menu = {title: string; items?: menuList};
type menuList = menu[];

let menuList: menuList = [
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
            {title: 'Птицы', items: [
              {title: 'Древние'},
              {title: 'Современные'},
              {title: 'Уникальные'}
            ]},
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

function generateMenu(list: menuList): string {
  function createMenu (items: menuList | undefined) {
    if (!items) {
      return '';
    }
    let content: string = `<ul>`;
    for (let item of items) {
      content += createItem(item);
    }
    return content + `</ul>`;
  }
  function createItem(item: menu) {
    let items = item.items;
    let isSubMenu = items && items.length > 0;
    let content = `<li><a ${isSubMenu ? 'class="title"' : ''}>${item.title}</a>`;
    if (isSubMenu) {
      content += createMenu(items);
    }
    return content + `</li>`;
  }
  return createMenu(list);
}

let navMenuList = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (ev: MouseEvent) => {
  let el = <HTMLAnchorElement>ev.target;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  let parenLi = el.parentNode as HTMLLIElement;
  parenLi.classList.toggle('menu-open');
};

