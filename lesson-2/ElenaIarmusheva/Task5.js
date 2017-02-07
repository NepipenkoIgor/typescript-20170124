/**
 *  #5
 *  Улучшите класс с менюшкой добавив публичные методы
 getElem -возвращает елемент в котором генерится меню;
 toggle открыть/закрыть элемент меню по метке;
 close закрыть элемент меню по метке;
 open открыть элемент меню по метке

 */
var Menu = (function () {
    function Menu(menuItems) {
        this._element = menuItems.element;
        this._menuList = menuItems.menuList;
        this._element.innerHTML = this.generateMenu(this._menuList);
        this._element.addEventListener('click', this.clickHandler);
    }
    Menu.prototype.clickHandler = function (event) {
        var target = event.target;
        if (!target.classList.contains('title')) {
            return;
        }
        var parentElement = target.parentNode;
        parentElement.classList.toggle('menu-open');
    };
    Menu.prototype.generateMenu = function (menuList) {
        var content = "<ul>";
        for (var _i = 0, menuList_1 = menuList; _i < menuList_1.length; _i++) {
            var a = menuList_1[_i];
            content += "<li><a " + (a.items ? 'class=title' : '') + " \n                               " + (a.link ? 'href=' + a.link : '') + ">" + a.title + "</a>";
            if (!a.items) {
                content += "</li>";
                continue;
            }
            content += this.generateMenu(a.items) + "</li>";
        }
        return content + "</ul>";
    };
    Menu.prototype.getElem = function () {
        return this._element;
    };
    Menu.prototype.toggle = function (element) {
        var liNodes = element.querySelectorAll('li');
        for (var i = 0; i < liNodes.length; i++) {
            liNodes[i].classList.toggle('menu-open');
        }
    };
    Menu.prototype.close = function (element) {
        var titles = element.querySelectorAll('.title');
        for (var i = 0; i < titles.length; i++) {
            var parentElement = titles[i].parentNode;
            parentElement.classList.remove('menu-open');
        }
    };
    Menu.prototype.open = function (element) {
        var titles = element.querySelectorAll('.title');
        for (var i = 0; i < titles.length; i++) {
            var parentElement = titles[i].parentNode;
            parentElement.classList.add('menu-open');
        }
    };
    return Menu;
}());
var element = document.querySelector('.menu');
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
var menu = new Menu({ element: element, menuList: menuList });
var buttonBox = document.querySelector('.menu-buttons');
buttonBox.innerHTML = "\n            <button type=\"button\" class = \".button-get-elem\">Get Elem</button>\n            <button type=\"button\" class = \".button-close\">Close</button>\n            <button type=\"button\" class = \".button-open\">Open</button>\n            <button type=\"button\" class = \".button-toggle\">Toggle</button>\n";
buttonBox.addEventListener('click', function (e) {
    var target = event.target;
    if (target.classList.contains('.button-get-elem')) {
        alert(menu.getElem());
    }
    if (target.classList.contains('.button-close')) {
        menu.close(menu.getElem());
    }
    if (target.classList.contains('.button-open')) {
        menu.open(menu.getElem());
    }
    if (target.classList.contains('.button-toggle')) {
        menu.toggle(menu.getElem());
    }
});
