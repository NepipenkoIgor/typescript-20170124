type menuList = {title: string; items: any[]}[];
const menuList: menuList = [
    {
        title: 'Животные',
        items: [{
                title: 'Млекопитающие',
                items: [{
                        title: 'Коровы'
                    },
                    {
                        title: 'Ослы'
                    },
                    {
                        title: 'Собаки'
                    },
                    {
                        title: 'Тигры'
                    }
                ]
            },
            {
                title: 'Другие',
                items: [{
                        title: 'Змеи'
                    },
                    {
                        title: 'Птицы'
                    },
                    {
                        title: 'Ящерицы'
                    },
                ],
            },
        ]
    },
    {
        title: 'Рыбы',
        items: [{
                title: 'Аквариумные',
                items: [{
                        title: 'Гуппи'
                    },
                    {
                        title: 'Скалярии'
                    }
                ]
            },
            {
                title: 'Форель',
                items: [{
                    title: 'Морская форель'
                }]
            },
        ]
    }
];

function generateMenu(data: menuList): string {
    let html: string = '';
    html += '<ul>';
    for(let item in data){
        html += '<li>';
        if(typeof(data[item].items) === 'object'){
            html += '<a class="title">' + data[item].title + '</a>';
            html += generateMenu(data[item].items);
        } else {
            html += '<a>' + data[item].title + '</a>';
        }
        html += '</li>';
    }
    html += '</ul>';
    return html;
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