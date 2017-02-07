/*Основываясь на примере который был показан на лекции
Создайте функцию которая будет генерить меню любой вложенности + обработчик события для открывания/закрывания его
Пример списка меню ниже.
    P.S. Очень важно что бы вложеность могла быть любой */

type menuList = {title: string, items?: menuList}[]; // здесь мы рекурсивно задаём тип

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
];


let ulEl: HTMLUListElement = document.createElement("ul");

function generateMenu(list: menuList, ulEl) {

    for (let item of list) {

        let liEl: HTMLLIElement = document.createElement('li');
        liEl.innerHTML = item.title;
        liEl.classList.add('title');
        ulEl.appendChild(liEl);

        if (item.items) {
            let htmlMenuList1 : HTMLUListElement = document.createElement('ul');
            liEl.appendChild(htmlMenuList1);
            generateMenu(item.items, htmlMenuList1);
        }
    }
    return ulEl;
}

let navMenuList: HTMLDivElement = document.querySelector('.menu') as HTMLDivElement;

navMenuList.appendChild(generateMenu(menu, ulEl));


navMenuList.onclick = (ev: MouseEvent) => {
    let el = ev.target as HTMLLIElement;
    let classList = el.classList;
    if (classList.contains("title")){
        el.classList.toggle("menu-open")
    }
};