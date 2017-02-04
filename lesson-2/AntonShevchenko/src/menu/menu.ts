type menuList = {title: string, link?: string, items?: menuList}[];
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

interface IMenu {
    getElem(): HTMLElement;
    toggle(id: number): void;
    close(id: number): void;
    open(id: number): void;
}

abstract class AbstractMenu implements IMenu {
    constructor(protected element: HTMLElement) {}

    public getElem(): HTMLElement {
        return this.element;
    }

    abstract toggle(id: number): void;

    abstract close(id: number): void;

    abstract open(id: number): void;
}


class Menu extends AbstractMenu {
    public lastIndex: number = 0;

    public toggle(id: number): void {
        let subMenu: HTMLLIElement = this.getSubMenuById(id);

        Menu.toggleElement(subMenu);
    }

    public close(id: number): void {
        let subMenu: HTMLLIElement = this.getSubMenuById(id);

        Menu.closeElement(subMenu);
    }

    public open(id: number): void {
        let subMenu: HTMLLIElement = this.getSubMenuById(id);

        Menu.openElement(subMenu);
    }

    public constructor(protected element, protected menuList: menuList) {
        super(element);
        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', this.clickHandler.bind(this));
    }

    protected static toggleElement(el: HTMLLIElement): void {
        el.classList.toggle('menu-open');
    }

    protected static closeElement(el: HTMLLIElement): void {
        el.classList.remove('menu-open');
    }

    protected static openElement(el: HTMLLIElement): void {
        el.classList.add('menu-open');
    }

    protected getSubMenuById(id: string): HTMLLIElement;
    protected getSubMenuById(id: number): HTMLLIElement;
    protected getSubMenuById(id: number | string): HTMLLIElement {
        let subMenu: Element = this.element.querySelector(`[data-id="${id}"]`);
        if (!subMenu) {
            throw new Error('Submenu with such id was not found');
        }

        return subMenu as HTMLLIElement;
    }

    protected clickHandler(this: Menu, ev: MouseEvent): void {
        let el: HTMLElement = ev.target as HTMLElement;
        let classList = el.classList;
        if (!classList.contains('title')) {
            return;
        }
        let parentLi = el.parentNode as HTMLLIElement;
        Menu.toggleElement(parentLi);
    }

    protected generateNewIndex(): number {
        return ++this.lastIndex;
    }

    protected generateMenu(menuList: menuList): string {
        let content: string = `<ul>`;
        for (let a of menuList) {
            let index: number = this.generateNewIndex();

            content += `<li data-id="${index}">
                <a ${a.items ? 'class=title' : ''} 
                ${a.link ? 'href=' + a.link : ''}>${a.title}</a>
            `;
            if (!a.items) {
                content += `</li>`;
                continue;
            }
            content += `${this.generateMenu(a.items)}</li>`;
        }
        return `${content}</ul>`;
    }
}

let element = document.querySelector('.menu') as HTMLElement;
let nav = new Menu(element, menuList);