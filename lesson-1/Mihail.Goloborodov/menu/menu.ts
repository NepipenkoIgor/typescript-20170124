type menuList = {title: string, items?: menuList}[];
const menuList = [
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
      },
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
      },
    ]
  }
];

function generateMenu(list: menuList): string {
  let content: string = `<ul>`;
  for (let a of list) {
    content += `<li>`;
    if (a.items) {
      content += `<a class="title">${a.title}</a>` + generateMenu(a.items);
    } else {
      content += a.title;
    }
    content += `</li>`;
  }
  content += `</ul>`;
  return content;
}

let navMenuList = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (event: MouseEvent) => {
  let el = <HTMLAnchorElement>event.target;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  let parentLi = el.parentNode as HTMLLIElement;
  parentLi.classList.toggle('menu-open');
};



