type TMenuList = Array<{title: string, items?: TMenuList}>;

const menu: TMenuList = [
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

function generateMenu(menu: TMenuList): string {
    return `<ul>` +
        menu.reduce((acc: string, item) => {
            if (!item.items) return `${acc}<li><a>${item.title}</a></li>`;
            return `${acc}<li><a class="title">${item.title}</a>${(item.items ? generateMenu(item.items) : '')}</li>`;
        }, '')
        + `</ul>`;
}

let navMenuList = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menu);
navMenuList.onclick = (ev: MouseEvent) => {
    let el = ev.target as HTMLAnchorElement;
    let classList = el.classList;
    if (!classList.contains('title')) {
        return;
    }
    let parenLi = el.parentNode as HTMLLIElement;
    parenLi.classList.toggle('menu-open');
};
