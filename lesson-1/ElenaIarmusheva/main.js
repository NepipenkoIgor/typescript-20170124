var menuList = [
    {
        title: 'Животные', items: [
            { title: 'Млекопитающие', items: [
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
function generateMenu(list) {
    var content = "<ul>";
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var a = list_1[_i];
        var liClass = a.items ? "title" : "";
        content += "<li><a class=\"" + liClass + "\">" + a.title + "</a>";
        if (a.items) {
            content += generateMenu(a.items);
        }
        content += "</li>";
    }
    content += "</ul>";
    return content;
}
var navMenuList = document.querySelector('.menu');
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = function (ev) {
    var el = ev.target;
    var classList = el.classList;
    if (!classList.contains('title')) {
        return;
    }
    var parenLi = el.parentNode;
    parenLi.classList.toggle('menu-open');
};
