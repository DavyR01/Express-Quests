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

// const addUser = (req, res) => {
//   console.log(req.body);
//   res.send('le post route fonctionne correctement');
// };

const addUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      'INSERT INTO users(firstname, lastname, email, city, language ) VALUES (?, ?, ?, ?, ?)',
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error saving the movie');
    });
};

module.exports = {
  getUsers,
  getUsersById,
  addUser,
};
