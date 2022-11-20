const database = require('./database');

const getUsers = (req, res) => {
  database
    .query('SELECT * FROM users')
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

// const getMovieById = (req, res) => {
//   const id = parseInt(req.params.id);

//   const movie = users.find((movie) => movie.id === id);

//   if (movie != null) {
//     res.json(movie);
//   } else {
//     res.status(404).send('Not Found');
//   }
// };

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('select * from users where id = ?', [id])
    .then(([users]) => {
      //   if (users[0] != null) {
      if (users.length) {
        res.json(users[0]);
        // res.sendStatus(200); cela veut dire que tout est ok donc pas besoin de le mettre
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      res.status(500).send('Error retrieving data from database');
    });
};

module.exports = {
  getUsers,
  getUsersById,
};
