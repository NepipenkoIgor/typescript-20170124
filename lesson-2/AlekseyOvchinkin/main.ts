type strNum = string|number;

interface IHomeWork {
    isInArray<T>(arr: T[], ...params: T[]): boolean;
    summator(...params: strNum[]): number;
    getUnique<T>(...params: T[]): T[];
}

class HomeWork implements IHomeWork {

    // 1
    public isInArray = <T>(arr: T[], ...params: T[]) => {

        for (let item of params) {
            if (arr.indexOf(item) === -1) {
                return false;
            }
        }

        return true;
    }

    // 2
    // TypeGuard
    private isString = (value: strNum): value is string => {
        return typeof value === 'string';
    }

    public summator = (...params: strNum[]): number => {

        let result: number = 0;

        for (let item of params) {

            if (this.isString(item)) {
                result += parseInt(item);
                continue;
            }

            result += item;
        }

        return result;
    }

    // 3
    public getUnique = <T>(...params: T[]): T[] => {

        let uniqArray: T[] = [];

        for (let item of params) {

            if (uniqArray.indexOf(item) !== -1) {
                continue;
            }

            uniqArray.push(item);
        }

        return uniqArray;
    }
}


////////////// 5 /////////////

type MenuItem = {
    title: string,
    items?: MenuItem[]
};

type MenuType = MenuItem[];

const menuArray: MenuType = [
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

const HIDDEN_CLASS: string = 'hidden';
const SELECTED_CLASS: string = 'selected';

const ACTION_CLOSE: string = 'close';
const ACTION_OPEN: string = 'open';
const ACTION_TOGGLE: string = 'toggle';

const ID_MENU: string = 'menu';
const ID_CONTAINER: string = 'container';

interface IMenu {
    getElem(): HTMLDivElement;
    toggle(elem: HTMLSpanElement): void;
    close(elem: HTMLSpanElement): void;
    open(elem: HTMLSpanElement): void;
}

class Menu implements IMenu {

    private elem: HTMLDivElement;

    constructor(elem: HTMLDivElement) {

        this.elem = elem;
        this.elem.innerHTML = this.createMenu(menuArray);
        this.elem.onclick = this.clickHandler;
    }

    // public
    public getElem = (): HTMLDivElement => {
        return this.elem;
    };


    public toggle = (elem: HTMLSpanElement): void => {
        this.turnElement(elem, ACTION_TOGGLE);
    };


    public open = (elem: HTMLSpanElement): void => {
        this.turnElement(elem, ACTION_OPEN);
    };

    public close = (elem: HTMLSpanElement): void => {
        this.turnElement(elem, ACTION_CLOSE);
    };

    private turnElement = (elem: HTMLSpanElement, action: string): void => {

        const li: HTMLLIElement = elem.closest('li') as HTMLLIElement;
        const ul: HTMLUListElement = li.querySelector('ul') as HTMLUListElement;

        switch (action) {

            case ACTION_TOGGLE:
                ul.classList.toggle(HIDDEN_CLASS);
                break;

            case ACTION_OPEN:
                ul.classList.remove(HIDDEN_CLASS);
                break;

            case ACTION_CLOSE:
                ul.classList.add(HIDDEN_CLASS);
                break;
        }
    };

    // private
    private createMenu = (menu: MenuType): string => {

        let content: string = ``;

        content += `<a href="#" data-item="toggle">toggle</a>`;
        content += `<a href="#" data-item="open">open</a>`;
        content += `<a href="#" data-item="close">close</a>`;

        content += `<ul id=${ID_MENU}>`;

        for (let item of menu) {
            content += this.createItem(item);
        }

        content += `</ul>`;

        return content;
    };

    private createItem(menuItem: MenuItem): string {

        let content: string = `<li>`;

        content += `<span>${menuItem.title}</span>`;

        if (menuItem.items && menuItem.items.length > 0) {

            content += `<ul class=${HIDDEN_CLASS}>`;

            for (let item of menuItem.items) {
                content += this.createItem(item);
            }

            content += `</ul>`;
        }

        content += `</li>`;

        return content;

    }

    private clickHandler = (ev: MouseEvent): void => {

        ev.preventDefault();

        let target: HTMLElement = ev.target as HTMLElement;

        const dataItem: string|null = target.getAttribute('data-item');

        if (dataItem) {

            const arrayOfSelected: NodeListOf<HTMLUListElement> = this.elem.querySelectorAll(`.${SELECTED_CLASS}`) as NodeListOf<HTMLUListElement>;

            switch (dataItem) {
                case ACTION_TOGGLE:
                    for (let i = 0; i < arrayOfSelected.length; i++) {

                        // ВОПРОС: почему транспайлер не ругается на несоответствие типов?
                        this.toggle(arrayOfSelected[i]);
                    }
                    break;

                case ACTION_OPEN:
                    for (let i = 0; i < arrayOfSelected.length; i++) {

                        // ВОПРОС: почему транспайлер не ругается на несоответствие типов?
                        this.open(arrayOfSelected[i]);
                    }
                    break;

                case ACTION_CLOSE:
                    for (let i = 0; i < arrayOfSelected.length; i++) {

                        // ВОПРОС: почему транспайлер не ругается на несоответствие типов?
                        this.close(arrayOfSelected[i]);
                    }
                    break;
            }

        } else {

            const span: HTMLSpanElement = target.closest('span') as HTMLSpanElement;
            const li: HTMLLIElement = span.closest('li') as HTMLLIElement;

            if (span && li) {

                const childUl: HTMLUListElement = li.querySelector('ul') as HTMLUListElement;

                if (childUl) {
                    span.classList.toggle(SELECTED_CLASS);
                }
            }
        }

    }
}


///////////////////////////////////////////////

let homeWork: HomeWork = new HomeWork();

// 1
console.log(homeWork.isInArray<string>(['a', 'b', 'c'], 'a', 'b', 'c'));
console.log(homeWork.isInArray<string>(['a', 'b', 'c'], 'a', 'b', 'x'));

// 2
console.log(homeWork.summator(1, '2', 3, '4', '5', 6));

// 3
console.log(homeWork.getUnique<number>(1, 2, 3, 4, 3, 5, 4, 5, 6));
console.log(homeWork.getUnique<strNum>(1, 2, 3, 4, '3', 5, 4, '5', 6));

// 5
let div = document.getElementById(ID_CONTAINER) as HTMLDivElement;
let menu = new Menu(div);







































