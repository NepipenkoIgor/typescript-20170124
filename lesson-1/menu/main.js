var MenuList = [
    { title: "javaScript", items: ["React", "Angular2", "Cycle.js"] },
    { title: "Dart", items: ["Flutter", "Angular2", "Polymer"] }
];
function generateMenu(list) {
    var content = "<ul>"; // Создаём переменную с элементом ul
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var a = list_1[_i];
        content += "<li><a class=\"title\">" + a.title + "</a><ul>"; // в переменную content записываем полученные значения
        for (var _a = 0, _b = a.items; _a < _b.length; _a++) {
            var item = _b[_a];
            content += "<li><a class=\"title\">" + item + "</a></li>";
        }
        content += "</li></ul>";
    }
    content += "</ul>";
    return content; // Возвращаем итоговый набор элементов
}
var navMenuList = document.querySelector(".menu");
if (navMenuList) {
    navMenuList.innerHTML = generateMenu(MenuList);
    navMenuList.onclick = function (ev) {
        var el = ev.target;
        var classlist = el.classList;
        if (classlist.contains("active")) {
            return;
        }
        var parenLi = el.parentNode;
        parenLi.classList.toggle('menu-open');
    };
}
// type menuList = {title: string; items?: menuList}[];
//
// const MENULIST: menuList = [
//   {
//     title: 'Животные', items: [
//     {
//       title: 'Млекопитающие', items: [
//       {title: 'Коровы'},
//       {title: 'Ослы'},
//       {title: 'Собаки'},
//       {title: 'Тигры'}
//     ]
//     },
//     {
//       title: 'Другие', items: [
//       {title: 'Змеи'},
//       {title: 'Птицы'},
//       {title: 'Ящерицы'},
//     ],
//     },
//   ]
//   },
//   {
//     title: 'Рыбы', items: [
//     {
//       title: 'Аквариумные', items: [
//       {title: 'Гуппи'},
//       {title: 'Скалярии'}
//     ]
//     },
//     {
//       title: 'Форель', items: [
//       {title: 'Морская форель'}
//     ]
//     },
//   ]
//   }
// ];
//
// let htmlMenuList : HTMLUListElement = document.createElement('ul');
//
// function createMenu(list: menuList, htmlMenuList){
//   for(let item of list){
//     let htmlMenuItem : HTMLLIElement = document.createElement('li');
//     htmlMenuItem.innerHTML = item.title;
//     htmlMenuItem.classList.add('title')
//     htmlMenuList.appendChild(htmlMenuItem);
//     if(item.items){
//       let htmlMenuList1 : HTMLUListElement = document.createElement('ul');
//       htmlMenuItem.appendChild(htmlMenuList1);
//       createMenu(item.items, htmlMenuList1);
//     }
//   }
//   return htmlMenuList;
// }
//
// let navMenuList : HTMLDivElement = document.querySelector('.menu') as HTMLDivElement;
// navMenuList.appendChild( createMenu(MENULIST, htmlMenuList));
//
// navMenuList.onclick = (ev: MouseEvent) => {
//   let el = <HTMLLIElement>ev.target;
//   let classList = el.classList;
//   if (!classList.contains('title')) {
//     return;
//   }
//   el.classList.toggle('menu-open');
// };
