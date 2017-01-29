type TMenuList = { title: string; items?: TMenuList }[];

!function() {
  const myMenuList: TMenuList = [
    {
      title: 'Животные', items: [
        {
          title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
          ]
        },
        {
          title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
          ],
        },
      ]
    },
    {
      title: 'Рыбы', items: [
        {
          title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
          ]
        },
        {
          title: 'Форель', items: [
            {title: 'Морская форель'}
          ]
        },
      ]
    }
  ];

  function generateMenu(list: TMenuList): string {
    let content: string = '';
    generateContent(list);
    return `<ul>${content}</ul>`;

    function generateContent(list: TMenuList) {
      for (let a of list) {
        if (a.items) {
          content += `<li><a class='title'>${a.title}</a><ul>`;
          generateContent(a.items);
          content += `</ul></li>`;
        } else {
          content += `<li class='leaf'>${a.title}</li>`;
        }
      }
      return content;
    }
  }

  const navMenuList = <HTMLDivElement>document.querySelector('.menu');
  navMenuList.innerHTML = generateMenu(myMenuList);
  navMenuList.onclick = (ev: MouseEvent) => {
    const el = <HTMLAnchorElement>ev.target;
    const classList = el.classList;
    if (!classList.contains('title') || classList.contains('leaf')) {
      return;
    }
    const parentLi = el.parentNode as HTMLLIElement;
    parentLi.classList.toggle('menu-open');
  };
}();