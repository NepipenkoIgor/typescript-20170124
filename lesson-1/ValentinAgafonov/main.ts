
type menuItem = { 
    title: string
    items?: menuList
};

type menuList = menuItem[]

let menu: menuList  = [
    {
        title: 'Животные', 
        items: [
            {
                title: 'Млекопитающие', 
                items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { 
                        title: 'Собаки',
                        items: [
                            { title: 'Бульдоги' },
                            { title: 'Овчарки' },
                            { title: 'Таксы' }
                        ] 
                    },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие', 
                items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
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
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель', 
                items: [
                    { title: 'Морская форель' }
                ]
            },
        ]
    }
];

function generateMenuListHTML(list?: menuList): string {
    if (!list) {
        return '';
    }
    return (
        `<ul>
            ${list.map(generateMenuItemHTML).join('')}
        </ul>`
    );
}

function generateMenuItemHTML(item: menuItem): string {
    return (
        `<li>
            <a class="title">
                ${item.title}
            </a>
            ${generateMenuListHTML(item.items)}
        </li>`
    );
}


let navMenuList = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenuListHTML(menu);

navMenuList.onclick = (ev: MouseEvent) => {
  let el = <HTMLAnchorElement>ev.target;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  let parenLi = el.parentNode as HTMLLIElement;
  parenLi.classList.toggle('menu-open');
};
