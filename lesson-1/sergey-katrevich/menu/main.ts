type menu = {title: string; items?: menuList};
type menuList = menu[];

// type menuList = {title: string; items?: menuList}[];

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
  function createMenu (items?: menuList) {
    if (!items) return '';
    let menuContent = items.map(createItem).join('');
    return `<ul>${menuContent}</ul>`;
  }

  function createItem(item: menu) {
    let items: undefined|menuList = item.items;
    let clsTitle = items ? ' class="title"' : '';
    let aTag = `<a${clsTitle}>${item.title}</a>`;
    return `<li>${aTag}${createMenu(items)}</li>`;
  }

  return createMenu(list);
}

let navMenuList = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (ev: MouseEvent) => {
  let el = ev.target as HTMLAnchorElement;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  let parenLi = el.parentNode as HTMLLIElement;
  parenLi.classList.toggle('menu-open');
};

