//  5) Улучшите класс с менюшкой добавив публичные методы
//     getElem -возвращает елемент в котором генерится меню;
//      toggle открыть/закрыть элемент меню по метке;
//      close закрыть элемент меню по метке;
//      open открыть элемент меню по метке

type menuList = {
    title: string;
    items?: menuList
}[];
const menuList: menuList = [{
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


class Menu {
    private navMenu: HTMLDivElement; 

    public constructor(navMenu: HTMLDivElement, list: menuList, liSelector: string) {
        // Nav menu
        this.navMenu = navMenu;
        navMenu.innerHTML = this._generateMenu(list);

        // Element
        let liElement = document.querySelector(liSelector) as HTMLLIElement;

        // Controls
        let getElemButton = document.getElementById('getElem') as HTMLElement;
        let toggleLiButton = document.getElementById('toggleLi') as HTMLElement;
        let openLiButton = document.getElementById('openLi') as HTMLElement;
        let closeLiButton = document.getElementById('closeLi') as HTMLElement;

        // Events
        getElemButton.addEventListener('click', (() => {
            console.log(this.getElem(liElement));
        }));
        toggleLiButton.addEventListener('click', (() => {
            this.toggleLi(liElement);
        }));
        openLiButton.addEventListener('click', (() => {
            this.openLi(liElement);
        }));
        closeLiButton.addEventListener('click', (() => {
            this.closeLi(liElement);
        }));
        navMenu.addEventListener('click', this.toggleMenu);
    }

    public getElem(liItem: HTMLLIElement): HTMLLIElement {
        return liItem;
    }

    public toggleLi(liItem: HTMLLIElement): void {
        liItem.classList.toggle('menu-open');
    }

    public openLi(liItem: HTMLLIElement): void {
        liItem.classList.add('menu-open');
    }

    public closeLi(liItem: HTMLLIElement): void {
        liItem.classList.remove('menu-open');
    } 

    private _generateMenu(data: menuList): string {
        let html: string = '';
        html += '<ul>';
        for (let item of data) {
            html += '<li>';
            if (typeof (item.items) === 'object') {
                html += '<a class="title">' + item.title + '</a>';
                html += this._generateMenu(item.items);
            } else {
                html += '<a>' + item.title + '</a>';
            }
            html += '</li>';
        }
        html += '</ul>';
        return html;
    }

    private toggleMenu (ev: MouseEvent): void {
        let el = <HTMLAnchorElement> ev.target;
        let classList = el.classList;
        if (!classList.contains('title')) {
            return;
        }
        let parenLi = el.parentNode as HTMLLIElement;
        parenLi.classList.toggle('menu-open');
    } 
}

let navMenuList = document.querySelector('.menu') as HTMLDivElement;
let firstLiSelector = '.menu ul>li:first-child';
let mainMenu = new Menu(navMenuList, menuList, firstLiSelector);