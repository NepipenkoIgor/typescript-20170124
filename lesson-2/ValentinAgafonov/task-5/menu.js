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
        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }
    Menu.prototype.getElem = function () {
        return this.element;
    };
    Menu.toggleLi = function (li) {
        li.classList.toggle('menu-open');
    };
    Menu.openLi = function (li) {
        li.classList.add('menu-open');
    };
    Menu.closeLi = function (li) {
        li.classList.remove('menu-open');
    };
    Menu.prototype.clickHandler = function (ev) {
        var el = ev.target;
        var classList = el.classList;
        if (!classList.contains('title')) {
            return;
        }
        Menu.toggleLi(el.parentNode);
    };
    Menu.prototype.generateMenu = function (menuList) {
        var content = "<ul>";
        for (var _i = 0, menuList_1 = menuList; _i < menuList_1.length; _i++) {
            var a = menuList_1[_i];
            content += "<li><a " + (a.items ? 'class=title' : '') + " \n" + (a.link ? 'href=' + a.link : '') + ">" + a.title + "</a>";
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
var testGetElem = document.getElementById('testGetElem');
testGetElem.addEventListener('click', function () {
    console.log(nav.getElem());
});
var testToggleLi = document.getElementById('testToggleLi');
testToggleLi.addEventListener('click', function () {
    Menu.toggleLi(document.querySelector('.menu li:first-child'));
});
var testOpenLi = document.getElementById('testOpenLi');
testOpenLi.addEventListener('click', function () {
    Menu.openLi(document.querySelector('.menu li:first-child'));
});
var testCloseLi = document.getElementById('testCloseLi');
testCloseLi.addEventListener('click', function () {
    Menu.closeLi(document.querySelector('.menu li:first-child'));
});
