type MenuItem = {
    title: string,
    items?: MenuItem[]
};

type MenuType = MenuItem[];

let menuArray: MenuType = [
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

function createItems(menu: MenuType): string {

    let content: string = `<ul id="menu">`;

    for (let item of menu) {
        content += createItem(item);
    }

    content += `</ul>`;

    return content;
}

function createItem(menuItem: MenuItem): string {

    let content: string = `<li>`;

    content += menuItem.title;

    if (menuItem.items && menuItem.items.length > 0) {

        content += `<ul class="hidden">`;

        for (let item of menuItem.items) {
            content += createItem(item);
        }

        content += `</ul>`;
    }

    content += `</li>`;

    return content;

}

document.body.innerHTML = createItems(menuArray);

let menu = document.getElementById('menu') as HTMLUListElement;

menu.onclick = (ev: MouseEvent) => {

    let target: HTMLElement = ev.target as HTMLElement;
    let li: HTMLLIElement = target.closest('li') as HTMLLIElement;

    let ulList: HTMLUListElement = li.querySelector('ul') as HTMLUListElement;

    if (ulList) {
        ulList.classList.toggle('hidden');
    }
};





























