var HomeWork = (function () {
    function HomeWork() {
        var _this = this;
        // 1
        this.isInArray = function (arr) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            for (var _a = 0, params_1 = params; _a < params_1.length; _a++) {
                var item = params_1[_a];
                if (arr.indexOf(item) === -1) {
                    return false;
                }
            }
            return true;
        };
        // 2
        // TypeGuard
        this.isString = function (value) {
            return typeof value === 'string';
        };
        this.summator = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var result = 0;
            for (var _a = 0, params_2 = params; _a < params_2.length; _a++) {
                var item = params_2[_a];
                if (_this.isString(item)) {
                    result += parseInt(item);
                    continue;
                }
                result += item;
            }
            return result;
        };
        // 3
        this.getUnique = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var uniqArray = [];
            for (var _a = 0, params_3 = params; _a < params_3.length; _a++) {
                var item = params_3[_a];
                if (uniqArray.indexOf(item) !== -1) {
                    continue;
                }
                uniqArray.push(item);
            }
            return uniqArray;
        };
    }
    return HomeWork;
}());
var menuArray = [
    {
        title: 'Животные', items: [
            {
                title: 'Млекопитающие', items: [
                    { title: 'Коровы' },
                    { title: 'Ослы' },
                    { title: 'Собаки' },
                    { title: 'Тигры' }
                ]
            },
            {
                title: 'Другие', items: [
                    { title: 'Змеи' },
                    { title: 'Птицы' },
                    { title: 'Ящерицы' },
                ],
            },
        ]
    },
    {
        title: 'Рыбы', items: [
            {
                title: 'Аквариумные', items: [
                    { title: 'Гуппи' },
                    { title: 'Скалярии' }
                ]
            },
            {
                title: 'Форель', items: [
                    { title: 'Морская форель' }
                ]
            },
        ]
    }
];
var HIDDEN_CLASS = 'hidden';
var SELECTED_CLASS = 'selected';
var ACTION_CLOSE = 'close';
var ACTION_OPEN = 'open';
var ACTION_TOGGLE = 'toggle';
var ID_MENU = 'menu';
var ID_CONTAINER = 'container';
var Menu = (function () {
    function Menu(elem) {
        var _this = this;
        // public
        this.getElem = function () {
            return _this.elem;
        };
        this.toggle = function (elem) {
            _this.turnElement(elem, ACTION_TOGGLE);
        };
        this.open = function (elem) {
            _this.turnElement(elem, ACTION_OPEN);
        };
        this.close = function (elem) {
            _this.turnElement(elem, ACTION_CLOSE);
        };
        this.turnElement = function (elem, action) {
            var li = elem.closest('li');
            var ul = li.querySelector('ul');
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
        this.createMenu = function (menu) {
            var content = "";
            content += "<a href=\"#\" data-item=\"toggle\">toggle</a>";
            content += "<a href=\"#\" data-item=\"open\">open</a>";
            content += "<a href=\"#\" data-item=\"close\">close</a>";
            content += "<ul id=" + ID_MENU + ">";
            for (var _i = 0, menu_1 = menu; _i < menu_1.length; _i++) {
                var item = menu_1[_i];
                content += _this.createItem(item);
            }
            content += "</ul>";
            return content;
        };
        this.clickHandler = function (ev) {
            ev.preventDefault();
            var target = ev.target;
            var dataItem = target.getAttribute('data-item');
            if (dataItem) {
                var arrayOfSelected = _this.elem.querySelectorAll("." + SELECTED_CLASS);
                switch (dataItem) {
                    case ACTION_TOGGLE:
                        for (var i = 0; i < arrayOfSelected.length; i++) {
                            // ВОПРОС: почему транспайлер не ругается на несоответствие типов?
                            _this.toggle(arrayOfSelected[i]);
                        }
                        break;
                    case ACTION_OPEN:
                        for (var i = 0; i < arrayOfSelected.length; i++) {
                            // ВОПРОС: почему транспайлер не ругается на несоответствие типов?
                            _this.open(arrayOfSelected[i]);
                        }
                        break;
                    case ACTION_CLOSE:
                        for (var i = 0; i < arrayOfSelected.length; i++) {
                            // ВОПРОС: почему транспайлер не ругается на несоответствие типов?
                            _this.close(arrayOfSelected[i]);
                        }
                        break;
                }
            }
            else {
                var span = target.closest('span');
                var li = span.closest('li');
                if (span && li) {
                    var childUl = li.querySelector('ul');
                    if (childUl) {
                        span.classList.toggle(SELECTED_CLASS);
                    }
                }
            }
        };
        this.elem = elem;
        this.elem.innerHTML = this.createMenu(menuArray);
        this.elem.onclick = this.clickHandler;
    }
    Menu.prototype.createItem = function (menuItem) {
        var content = "<li>";
        content += "<span>" + menuItem.title + "</span>";
        if (menuItem.items && menuItem.items.length > 0) {
            content += "<ul class=" + HIDDEN_CLASS + ">";
            for (var _i = 0, _a = menuItem.items; _i < _a.length; _i++) {
                var item = _a[_i];
                content += this.createItem(item);
            }
            content += "</ul>";
        }
        content += "</li>";
        return content;
    };
    return Menu;
}());
///////////////////////////////////////////////
var homeWork = new HomeWork();
// 1
console.log(homeWork.isInArray(['a', 'b', 'c'], 'a', 'b', 'c'));
console.log(homeWork.isInArray(['a', 'b', 'c'], 'a', 'b', 'x'));
// 2
console.log(homeWork.summator(1, '2', 3, '4', '5', 6));
// 3
console.log(homeWork.getUnique(1, 2, 3, 4, 3, 5, 4, 5, 6));
console.log(homeWork.getUnique(1, 2, 3, 4, '3', 5, 4, '5', 6));
// 5
var div = document.getElementById(ID_CONTAINER);
var menu = new Menu(div);
