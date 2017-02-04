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

class Menu implements IMenu {
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
        let parentElement = target.parentNode as HTMLLIElement;
        parentElement.classList.toggle('menu-open');
    }

    protected generateMenu(menuList: menuList): string {
        let content: string = `<ul>`;
        for (let a of menuList) {
            content += `<li><a ${a.items ? 'class=title' : '' } 
                               ${a.link  ? 'href=' + a.link : ''}>${a.title}</a>`;
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

    public toggle(this: void, element: HTMLElement): void {
        let titles: NodeListOf<HTMLElement> = element.querySelectorAll('.title') as NodeListOf<HTMLAnchorElement>;
        for (let i = 0; i < titles.length; i++) {
            let parentElement = titles[i].parentNode as HTMLLIElement;
            parentElement.classList.toggle('menu-open');
        }
    }

    public close(element: HTMLElement): void {
        let titles: NodeListOf<HTMLElement> = element.querySelectorAll('.title') as NodeListOf<HTMLAnchorElement>;
        for (let i = 0; i < titles.length; i++) {
            let parentElement = titles[i].parentNode as HTMLLIElement;
            parentElement.classList.remove('menu-open');
        }
    }

    public open(element: HTMLElement): void {
        let titles: NodeListOf<HTMLElement> = element.querySelectorAll('.title') as NodeListOf<HTMLAnchorElement>;
        for (let i = 0; i < titles.length; i++) {
            let parentElement = titles[i].parentNode as HTMLLIElement;
            parentElement.classList.add('menu-open');
        }
    }
}

let element: HTMLElement = document.querySelector('.menu') as HTMLElement;
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

let buttonBox: HTMLElement = document.querySelector('.buttons') as HTMLDivElement;
buttonBox.innerHTML = `
            <button type="button" class = "get-elem">Get Elem</button>
            <button type="button" class = "close">Close</button>
            <button type="button" class = "open">Open</button>
            <button type="button" class = "toggle">Toggle</button>
`;

buttonBox.addEventListener('click', (e: MouseEvent) => {
    let target: HTMLElement = event.target as HTMLElement;

    if (target.classList.contains('get-elem')) {
        alert(menu.getElem());
    }

    if (target.classList.contains('close')) {
        menu.close(menu.getElem() as HTMLElement);
    }

    if (target.classList.contains('open')) {
       menu.open(menu.getElem() as HTMLElement);
    }

    if (target.classList.contains('toggle')) {
        menu.toggle(menu.getElem() as HTMLElement);
    }

});



