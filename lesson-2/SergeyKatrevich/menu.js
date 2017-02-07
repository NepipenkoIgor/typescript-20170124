/*5) Улучшите класс с менюшкой добавив публичные методы
getElem - возвращает елемент в котором генерится меню;
toggle открыть/закрыть элемент меню по метке;
close закрыть элемент меню по метке;
open открыть элемент меню по метке

в интерфейсе реализуйте кнопками вызов этих методов ( например над меню)
P.S. для демонстрации*/
var menuList = [
    {
        items: [
            {
                items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' },
                ],
                title: 'Млекопитающие',
            },
            {
                items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
                ],
                title: 'Другие',
            },
        ],
        mark: 'mark',
        title: 'Животные',
    },
    {
        items: [
            {
                items: [
                    { title: 'Гуппи' },
                    { title: 'Скалярии' },
                ],
                title: 'Аквариумные',
            },
            {
                items: [
                    { title: 'Морская форель' },
                ],
                title: 'Форель',
            },
        ],
        title: 'Рыбы',
    },
];
var Menu = (function () {
    function Menu(opt) {
        // Чтоб WebStorm не выводил предупреждения - что метод может быть статический
        // Не стрелочная ф-ия - потому что eslint ругается на использование this: void
        this.clickHandler = function (ev) {
            var el = ev.target;
            var classList = el.classList;
            if (!classList.contains('title')) {
                return;
            }
            var parentLi = el.parentNode;
            parentLi.classList.toggle('menu-open');
        };
        this.element = opt.element;
        this.menuList = opt.menuList;
        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }
    Menu.toggleMenu = function (el) {
        var parentLi = el.parentNode;
        parentLi.classList.toggle('menu-open');
    };
    Menu.openMenu = function (el) {
        var parentLi = el.parentNode;
        parentLi.classList.add('menu-open');
    };
    Menu.closeMenu = function (el) {
        var parentLi = el.parentNode;
        parentLi.classList.remove('menu-open');
    };
    Menu.prototype.getElem = function () {
        return this.element;
    };
    Menu.prototype.toggle = function (mark) {
        var elem = this.findElementByMark(mark);
        Menu.toggleMenu(elem);
    };
    Menu.prototype.close = function (mark) {
        var elem = this.findElementByMark(mark);
        Menu.closeMenu(elem);
    };
    Menu.prototype.open = function (mark) {
        var elem = this.findElementByMark(mark);
        Menu.openMenu(elem);
    };
    Menu.prototype.generateMenu = function (menu) {
        var content = "<ul>";
        for (var _i = 0, menu_1 = menu; _i < menu_1.length; _i++) {
            var a = menu_1[_i];
            var mark_1 = a.mark ? " data-mark=\"" + a.mark + "\"" : '';
            var href = a.link ? ' href=' + a.link : '';
            var cls = a.items ? ' class=title' : '';
            content += "<li><a " + cls + href + mark_1 + ">" + a.title + "</a>";
            if (!a.items) {
                content += "</li>";
                continue;
            }
            content += this.generateMenu(a.items) + "</li>";
        }
        return content + "</ul>";
    };
    Menu.prototype.findElementByMark = function (mark) {
        return this.element.querySelector("[data-mark=\"" + mark + "\"]");
    };
    return Menu;
}());
var element = document.querySelector('.menu');
var nav = new Menu({ element: element, menuList: menuList });
var btnGetElem = document.querySelector('#get-elem');
var btnToggle = document.querySelector('#toggle');
var btnOpen = document.querySelector('#open');
var btnClose = document.querySelector('#close');
var mark = 'mark';
btnGetElem.addEventListener('click', function () {
    console.log(nav.getElem());
});
btnToggle.addEventListener('click', function () {
    nav.toggle(mark);
});
btnOpen.addEventListener('click', function () {
    nav.open(mark);
});
btnClose.addEventListener('click', function () {
    nav.close(mark);
});
//# sourceMappingURL=menu.js.map