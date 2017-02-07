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
                    { title: 'Ящерицы' }
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
        this.element = opt.element;
        this.menuList = opt.menuList;
        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
        this.addLinkIds();
    }
    Menu.prototype.getElem = function () {
        console.log(this.element);
        return this.element;
    };
    Menu.prototype.toggle = function (id, isOpen) {
        var el = document.getElementById("link-id-" + id);
        var parentLi = el.parentNode;
        if (!el.classList.contains('title')) {
            return;
        }
        if (isOpen === true) {
            parentLi.classList.add('menu-open');
            return;
        }
        if (isOpen === false) {
            parentLi.classList.remove('menu-open');
            return;
        }
        // Default
        parentLi.classList.toggle('menu-open');
    };
    Menu.prototype.close = function (id) {
        this.toggle(id, false);
    };
    Menu.prototype.open = function (id) {
        this.toggle(id, true);
    };
    Menu.prototype.addLinkIds = function () {
        var links = document.querySelectorAll('[data-link]');
        for (var i = 0; i < links.length; i++) {
            links[i].id = 'link-id-' + i;
        }
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
            content += "<li><a data-link " + (a.items ? 'class=title' : '') + (a.link ? 'href=' + a.link : '') + ">" + a.title + "</a>";
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
