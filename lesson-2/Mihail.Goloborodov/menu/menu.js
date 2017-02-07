var menuList = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие',
                items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
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
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель',
                items: [
                    { title: 'Морская форель' }
                ]
            }
        ]
    }
];
var Menu = (function () {
    function Menu(opt) {
        this.lastId = 0;
        this._element = opt.element;
        this._menuList = opt.menuList;
        this._element.innerHTML = this.generateMenu(this._menuList);
        this._element.addEventListener('click', this.clickHandler);
    }
    Menu.prototype.getElem = function () {
        return this._element;
    };
    Menu.prototype.open = function (id) {
        this.toggle(id, true);
    };
    Menu.prototype.close = function (id) {
        this.toggle(id, false);
    };
    Menu.prototype.toggle = function (id, value) {
        var el = this.getElem().querySelector("li[data-id=\"" + id + "\"]");
        el.classList.toggle('menu-open', value);
    };
    Menu.prototype.getNextId = function () {
        return ++this.lastId;
    };
    Menu.prototype.clickHandler = function (ev) {
        var el = ev.target;
        var classList = el.classList;
        if (!classList.contains('title')) {
            return;
        }
        var parentLi = el.parentNode;
        parentLi.classList.toggle('menu-open');
    };
    Menu.prototype.generateMenu = function (menuList) {
        var content = "<ul>";
        for (var _i = 0, menuList_1 = menuList; _i < menuList_1.length; _i++) {
            var a = menuList_1[_i];
            content += "<li data-id=\"" + this.getNextId() + "\"><a " + (a.items ? 'class=title' : '') + "\n        " + (a.link ? 'href=' + a.link : '') + ">" + a.title + "</a>";
            if (!a.items) {
                content += "</li>";
                continue;
            }
            content += this.generateMenu(a.items) + "</li>";
        }
        return content + "</ul>";
    };
    return Menu;
}());
var element = document.querySelector('.menu');
var nav = new Menu({ element: element, menuList: menuList });
