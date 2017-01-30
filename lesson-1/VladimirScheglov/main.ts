type menuItem = { title: string; items?: menuItem[] };
type menuList = menuItem[];
const menu: menuList = [
    {
        title: "Животные", items: [
            {
                title: "Млекопитающие", items: [
                    { title: "Коровы" },
                    { title: "Ослы" },
                    { title: "Собаки" },
                    { title: "Тигры" }
                ]
            },
            {
                title: "Другие", items: [
                    {
                        title: "Змеи", items: [
                            { title: "Гадюка" },
                            { title: "Уж" }
                        ]
                    },
                    { title: "Птицы" },
                    { title: "Ящерицы" }
                ]
            }
        ]
    },
    {
        title: "Рыбы", items: [
            {
                title: "Аквариумные", items: [
                    { title: "Гуппи" },
                    { title: "Скалярии" }
                ]
            },
            {
                title: "Форель", items: [
                    { title: "Морская форель" }
                ]
            }
        ]
    }
];

function generateMenu(list: menuList): string {
    let content: string = `<ul>`;
    for (let item of list) {
        if (item.items != null) {
            content += `<li><a class="title">${item.title}</a>`;
            content += generateMenu(item.items);
            content += `</li>`;
        }
        else {
            content += `<li><a>${item.title}</a></li>`;
        }

    }
    content += `</ul>`;
    return content;
}

let navMenuList = document.querySelector(".menu") as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menu);
navMenuList.onclick = (ev: MouseEvent) => {
    let el = <HTMLAnchorElement>ev.target;
    let classList = el.classList;
    if (!classList.contains("title")) {
        return;
    }
    let parenLi = el.parentNode as HTMLLIElement;
    parenLi.classList.toggle("menu-open");
};
