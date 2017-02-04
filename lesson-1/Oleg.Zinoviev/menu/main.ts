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
    }
  ]
  }
];

function generateMenu(list: Array<MenuList>): string {
  if (!list) { return ''; }
  return (`<ul>${list.map(generateMenuItem).join('')}</ul>`);
}

function generateMenuItem(item: MenuList) {
  return (`<li><a class="title">${item.title}</a>${generateMenu(item.items)}</li>`);
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
