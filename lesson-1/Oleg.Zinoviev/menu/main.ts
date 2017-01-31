type MenuList = {
  title: string,
  items?: MenuList[]
};

const menuList: Array<MenuList> = [
  {
    title: 'Животные', items: [
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
    },
  ]
  },
  {
    title: 'Рыбы', items: [
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
    },
  ]
  }
];

function generateMenu(list: Array<MenuList>): string {
  let content: string = `<ul>`;

  list.forEach(function (listItem: MenuList) {
    if (listItem.items instanceof Array) {
      _makeLi(listItem, true);
      _makeUL(listItem.items);
    } else {
      _makeLi(listItem);
    }
  });

  function _makeUL(items: Array<MenuList>) {
    content += '<ul>';
    items.forEach(function (item: MenuList) {
      if (item.items instanceof Array) {
        _makeLi(item, true);
        // Recursive call
        _makeUL(item.items);
      } else {
        _makeLi(item);
      }
    });
    content += '</ul>';
  }

  function _makeLi(item: MenuList, hasChilds?: boolean) {
    content += `<li><a class="title">${item.title}</a>`;
    if (!hasChilds) {
      content += '</li>';
    }
  }
  content += `</ul>`;
  return content;
}

let navMenuList = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);

navMenuList.onclick = (ev: MouseEvent) => {
  let el = ev.target as HTMLAnchorElement;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  let parenLi = el.parentNode as HTMLElement;
  parenLi.classList.toggle('menu-open');
};
