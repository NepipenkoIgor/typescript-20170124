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
        this.element = opt.element;
        this.menuList = opt.menuList;
        this.ids = [];
        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }
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
        var id;
        for (var _i = 0, menuList_1 = menuList; _i < menuList_1.length; _i++) {
            var a = menuList_1[_i];
            id = this.ids.length + 1;
            this.ids.push(id);
            content += "<li data-id=" + id + "><a " + (a.items ? 'class=title' : '') + (a.link ? 'href=' + a.link : '') + ">" + a.title + "</a>";
            if (!a.items) {
                content += "</li>";
                continue;
            }
            content += this.generateMenu(a.items) + "</li>";
        }
        return content + "</ul>";
    };
    Menu.prototype.getMenuItemById = function (id) {
        if (!~this.ids.indexOf(id)) {
            return null;
        }
        return this.element.querySelector("li[data-id=\"" + id + "\"]");
    };
    Menu.prototype.getElem = function () {
        return this.element;
    };
    Menu.prototype.open = function (id) {
        var mi = this.getMenuItemById(id);
        if (mi === null) {
            return;
        }
        if (mi.classList.contains('menu-open')) {
            return;
        }
        mi.classList.add('menu-open');
    };
    Menu.prototype.close = function (id) {
        var mi = this.getMenuItemById(id);
        if (mi === null) {
            return;
        }
        if (!mi.classList.contains('menu-open')) {
            return;
        }
        mi.classList.remove('menu-open');
    };
    Menu.prototype.toggle = function (id) {
        var mi = this.getMenuItemById(id);
        if (mi === null) {
            return;
        }
        if (mi.classList.contains('menu-open')) {
            mi.classList.remove('menu-open');
            return;
        }
        mi.classList.add('menu-open');
    };
    return Menu;
}());
var element = document.querySelector('.menu');
var nav = new Menu({ element: element, menuList: menuList });
var inp = document.querySelector('input');
// Show id of current menu item
element.addEventListener('mouseover', function (ev) {
    var el = ev.target;
    var id = el.parentElement.getAttribute('data-id');
    if (id === null) {
        return;
    }
    inp.value = id;
});
document.querySelector('#btOpen').addEventListener('click', function () { nav.open(+inp.value); });
document.querySelector('#btClose').addEventListener('click', function () { nav.close(+inp.value); });
document.querySelector('#btToggle').addEventListener('click', function () { nav.toggle(+inp.value); });
