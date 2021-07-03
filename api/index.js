var USERS = [
  { id: 1, name: 'Андрей Рогозов', avatar: 'rogozov.jpg', domain: 'idrogozov' },
  {
    id: 2,
    name: 'Екатерина Копылова',
    avatar: 'kopylova.jpg',
    domain: 'idkopylova',
  },
  { id: 3, name: 'Павел Дуров', avatar: 'durov.jpg', domain: 'iddurov' },
  { id: 4, name: 'Лев Левиев', avatar: 'leviev.jpg', domain: 'idleviev' },
  { id: 5, name: 'Иван Смирнов', avatar: 'ismirnov.jpg', domain: 'idismirnov' },
  {
    id: 6,
    name: 'Людмила Романченко',
    avatar: 'romanchenko.jpg',
    domain: 'idromanchenko',
  },
  {
    id: 7,
    name: 'Андрей Смирнов',
    avatar: 'asmirnov.jpg',
    domain: 'idasmirnov',
  },
  {
    id: 8,
    name: 'Андрей Чернышев',
    avatar: 'chernyshev.jpg',
    domain: 'idchernyshev',
  },
];

module.exports = (req, res) => {
  res.json({
    body: USERS,
  });
};
