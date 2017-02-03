
type menuItem = {title: string; items?: menuList};
type menuList = menuItem[];

const menu: menuList = [
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
   ]

function generateMenu(list: menuList): string {

   if (!list) {
      return ''
    }

   return (
       `
       <ul>
           ${list.map(generateItem).join('')}
       </ul>
       `
   )
 
}

function generateItem(item: menuItem): string {

  let titleClass: string = ''

  if(item.items){
    titleClass = 'title'
  }


  return (
      `
        <li>
          <a class="${titleClass}">${item.title}</a>
          ${generateMenu(item.items)}
        </li>
      `
    )
}

let navMenuList = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menu);

navMenuList.onclick = (ev: MouseEvent) => {
  let el = <HTMLAnchorElement>ev.target;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  let parenLi = el.parentNode as HTMLLIElement;
  parenLi.classList.toggle('menu-open');
};


