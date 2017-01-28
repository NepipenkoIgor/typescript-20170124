type menuList = {title: string; items?: menuList}[];
const menuList: menuList = [
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

createAndAppendMenuTo(document.querySelector('.menu') as HTMLDivElement);

function createAndAppendMenuTo (navMenuList: HTMLDivElement): void {
    let menu: HTMLUListElement = generateMenu(menuList);
    navMenuList.appendChild(menu);
    navMenuList.onclick = menuClickHandler;
}

function generateMenu(list: menuList): HTMLUListElement {
    const titleClass:string = 'title';

    let UL:HTMLUListElement = document.createElement('ul');
    for (let listItem of list) {
        let li:HTMLLIElement = document.createElement('li');
        let a:HTMLAnchorElement = document.createElement('a');
        li.appendChild(a);
        a.innerText = listItem.title;
        if(listItem.items) {
            a.classList.add(titleClass);
            let sumUL = generateMenu(listItem.items);
            li.appendChild(sumUL);
        }
        UL.appendChild(li);
    }
    return UL;
}

function menuClickHandler(ev: MouseEvent): void {
    let el = <HTMLAnchorElement>ev.target;
    let classList = el.classList;
    if (!classList.contains('title')) {
        return;
    }
    let parenLi = el.parentNode as HTMLLIElement;
    parenLi.classList.toggle('menu-open');
}

