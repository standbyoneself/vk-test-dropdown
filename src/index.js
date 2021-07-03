var USERS = [
  { id: 1, name: 'Андрей Рогозов', avatar: 'rogozov.jpg' },
  { id: 2, name: 'Екатерина Копылова', avatar: 'kopylova.jpg' },
  { id: 3, name: 'Павел Дуров', avatar: 'durov.jpg' },
  { id: 4, name: 'Лев Левиев', avatar: 'leviev.jpg' },
  { id: 5, name: 'Иван Смирнов', avatar: 'ismirnov.jpg' },
  { id: 6, name: 'Людмила Романченко', avatar: 'romanchenko.jpg' },
  { id: 7, name: 'Андрей Смирнов', avatar: 'asmirnov.jpg' },
  { id: 8, name: 'Андрей Чернышев', avatar: 'chernyshev.jpg' },
];

var IMG_PATH = 'src/assets/img';

var windowHeight = window.innerHeight;

// Make every section height 100vh
var sections = document.querySelectorAll('.section');
for (var i = 0; i < sections.length; i++) {
  sections[i].style.height = windowHeight + 'px';
}

var sectionDropdownSingle = document.getElementById('section-dropdown-single');
var sectionDropdownMultiple = document.getElementById(
  'section-dropdown-multiple'
);
var sectionDropdownWithoutAvatar = document.getElementById(
  'section-dropdown-without-avatar'
);
var sectionDropdownBlock = document.getElementById('section-dropdown-block');
var sectionDropdownAjax = document.getElementById('section-dropdown-ajax');

new Dropdown(new IdService(), sectionDropdownSingle, USERS, 'single', true);
new Dropdown(new IdService(), sectionDropdownMultiple, USERS, 'multiple', true);
new Dropdown(
  new IdService(),
  sectionDropdownWithoutAvatar,
  USERS,
  'multiple',
  false
);
new Dropdown(
  new IdService(),
  sectionDropdownBlock,
  USERS,
  'multiple',
  true,
  true
);
new Dropdown(
  new IdService(),
  sectionDropdownAjax,
  USERS,
  'multiple',
  true,
  false,
  true
);
