/**
 *  #5
 *  Улучшите класс с менюшкой добавив публичные методы
 getElem -возвращает елемент в котором генерится меню;
 toggle открыть/закрыть элемент меню по метке;
 close закрыть элемент меню по метке;
 open открыть элемент меню по метке

 */

type menuList = {title: string; link?: string; items?: menuList}[];
type menuOptions = {element: HTMLElement; menuList: menuList};

interface IMenu {
    getElem(): HTMLElement;
    toggle(element: HTMLLIElement): void;
    open(element: HTMLLIElement): void;
    close(element: HTMLLIElement): void;
}

class Menu implements IMenu{
    protected element: HTMLElement;
    protected menuList: menuList;

    constructor(menuItems: menuOptions) {
        this.element = menuItems.element;
        this.menuList = menuItems.menuList;

        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', this.clickHandler);

    }

    protected clickHandler(this: void, event: MouseEvent): void {
        let target: HTMLElement = event.target as HTMLElement;
        if (!target.classList.contains('title')) {
            return;
        }
        let parentElement = element.parentNode as HTMLLIElement;
        parentElement.classList.toggle('menu-open');
    }

    protected generateMenu(menuList: menuList): string {
        let content: string = `<ul>`;
        for (let a of menuList) {
            content += `<li><a ${a.items ? 'class=title' : ''}+${a.link ? 'href=' + a.link : ''}>${a.title}</a>`;
            if (!a.items) {
                content += `</li>`;
                continue;
            }
            content += `${this.generateMenu(a.items)}</li>`;
        }
        return `${content}</ul>`;
    }

    public getElem(): HTMLElement {
        return this.element;
    }

    public toggle(this: void, element: HTMLLIElement): void {
        element.classList.toggle('menu-open');
    }

    public close(element: HTMLLIElement): void {
        element.classList.remove('menu-open');
    }

    public open(element: HTMLLIElement): void {
        element.classList.add('menu-open');
    }
}

let element: HTMLElement = document.querySelector('.menu') as HTMLDivElement;
let menuList: menuList = [
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

let menu = new Menu({element, menuList});