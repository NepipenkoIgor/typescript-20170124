type menuList = {title: string; items?: menuList}[];

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
          {title: 'Ящерицы'}
        ]
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

function generateMenu(list: menuList): string {
  let content: string = `<ul>`;
  for (let a of list) {
    content += `<li><a ${a.items ? 'class="title"' : ''}>${a.title}</a>`;
    if (a.items) {
      content += generateMenu(a.items);
    }
    content += `</li>`;
  }
  content += `</ul>`;
  return content;
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

