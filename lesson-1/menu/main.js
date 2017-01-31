var MENULIST = [
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
var htmlMenuList = document.createElement('ul');
function createMenu(list, htmlMenuList) {
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var item = list_1[_i];
        var htmlMenuItem = document.createElement('li');
        htmlMenuItem.innerHTML = item.title;
        htmlMenuItem.classList.add('title');
        htmlMenuList.appendChild(htmlMenuItem);
        if (item.items) {
            var htmlMenuList1 = document.createElement('ul');
            htmlMenuItem.appendChild(htmlMenuList1);
            createMenu(item.items, htmlMenuList1);
        }
    }
    return htmlMenuList;
}
var navMenuList = document.querySelector('.menu');
navMenuList.appendChild(createMenu(MENULIST, htmlMenuList));
navMenuList.onclick = function (ev) {
    var el = ev.target;
    var classList = el.classList;
    if (!classList.contains('title')) {
        return;
    }
    el.classList.toggle('menu-open');
};
