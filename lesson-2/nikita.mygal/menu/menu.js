//  5) Улучшите класс с менюшкой добавив публичные методы
//     getElem -возвращает елемент в котором генерится меню;
//      toggle открыть/закрыть элемент меню по метке;
//      close закрыть элемент меню по метке;
//      open открыть элемент меню по метке
var menuList = [{
        title: 'Животные',
        items: [{
                title: 'Млекопитающие',
                items: [{
                        title: 'Коровы'
                    },
                    {
                        title: 'Ослы'
                    },
                    {
                        title: 'Собаки'
                    },
                    {
                        title: 'Тигры'
                    }
                ]
            },
            {
                title: 'Другие',
                items: [{
                        title: 'Змеи'
                    },
                    {
                        title: 'Птицы'
                    },
                    {
                        title: 'Ящерицы'
                    },
                ],
            },
        ]
    },
    {
        title: 'Рыбы',
        items: [{
                title: 'Аквариумные',
                items: [{
                        title: 'Гуппи'
                    },
                    {
                        title: 'Скалярии'
                    }
                ]
            },
            {
                title: 'Форель',
                items: [{
                        title: 'Морская форель'
                    }]
            },
        ]
    }
];
var Menu = (function () {
    function Menu(navMenu, list, liSelector) {
        var _this = this;
        // Nav menu
        this.navMenu = navMenu;
        navMenu.innerHTML = this._generateMenu(list);
        // Element
        var liElement = document.querySelector(liSelector);
        // Controls
        var getElemButton = document.getElementById('getElem');
        var toggleLiButton = document.getElementById('toggleLi');
        var openLiButton = document.getElementById('openLi');
        var closeLiButton = document.getElementById('closeLi');
        // Events
        getElemButton.addEventListener('click', (function () {
            console.log(_this.getElem(liElement));
        }));
        toggleLiButton.addEventListener('click', (function () {
            _this.toggleLi(liElement);
        }));
        openLiButton.addEventListener('click', (function () {
            _this.openLi(liElement);
        }));
        closeLiButton.addEventListener('click', (function () {
            _this.closeLi(liElement);
        }));
        navMenu.addEventListener('click', this.toggleMenu);
    }
    Menu.prototype.getElem = function (liItem) {
        return liItem;
    };
    Menu.prototype.toggleLi = function (liItem) {
        liItem.classList.toggle('menu-open');
    };
    Menu.prototype.openLi = function (liItem) {
        liItem.classList.add('menu-open');
    };
    Menu.prototype.closeLi = function (liItem) {
        liItem.classList.remove('menu-open');
    };
    Menu.prototype._generateMenu = function (data) {
        var html = '';
        html += '<ul>';
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            html += '<li>';
            if (typeof (item.items) === 'object') {
                html += '<a class="title">' + item.title + '</a>';
                html += this._generateMenu(item.items);
            }
            else {
                html += '<a>' + item.title + '</a>';
            }
            html += '</li>';
        }
        html += '</ul>';
        return html;
    };
    Menu.prototype.toggleMenu = function (ev) {
        var el = ev.target;
        var classList = el.classList;
        if (!classList.contains('title')) {
            return;
        }
        var parenLi = el.parentNode;
        parenLi.classList.toggle('menu-open');
    };
    return Menu;
}());
var navMenuList = document.querySelector('.menu');
var firstLiSelector = '.menu ul>li:first-child';
var mainMenu = new Menu(navMenuList, menuList, firstLiSelector);
