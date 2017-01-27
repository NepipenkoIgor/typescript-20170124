type menuList = {title: string; items: string[]}[];
const menuList: menuList = [
  {title: 'JavaScript', items: ['React', 'Angular2', 'Cycle.js']},
  {title: 'Dart', items: ['Flutter', 'Angular2', 'Polymer']},
];

function generateMenu(list: menuList): string {
  let content: string = `<ul>`;
  for (let a of list) {
    content += `<li><a class="title">${a.title}</a><ul>`;
    for (let item of a.items) {
      content += `<li><a>${item}</a></li>`;
    }
    content += `</li></ul>`;
  }
  content += `</ul>`;
  return content;
}

let navMenuList = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (ev: MouseEvent) => {
  let el = <HTMLAnchorElement>ev.target;
  let classList = el.classList;
  if (!classList.contains('title')) {
    return;
  }
  let parenLi = el.parentNode as HTMLLIElement;
  parenLi.classList.toggle('menu-open');
};

