// const movies = [
//   {
//     id: 1,
//     title: 'Citizen Kane',
//     director: 'Orson Wells',
//     year: '1941',
//     colors: false,
//     duration: 120,
//   },
//   {
//     id: 2,
//     title: 'The Godfather',
//     director: 'Francis Ford Coppola',
//     year: '1972',
//     colors: true,
//     duration: 180,
//   },
//   {
//     id: 3,
//     title: 'Pulp Fiction',
//     director: 'Quentin Tarantino',
//     year: '1994',
//     color: true,
//     duration: 180,
//   },
// ];

// *************** Methode GET **************************

const database = require('./database');

// const getMovies = (req, res) => {
//   database
//     .query('select * from movies')
//     .then(([movies]) => {
//       res.json(movies);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error retrieving data from database');
//     });
// };

// ********************************** Methodes GET EN DETAIL EXPRESS 06*******************************

const getMovies = (req, res) => {
  let sql = 'SELECT * FROM movies';
  const sqlValues = [];

  /********Gestion COLOR ***********/
  // Ne pas oublier de mettre un espace avant WHERE : IMPORTANT sinon erreur

  // if (req.query.color != null) {
  //   sql += ' WHERE color = ?';
  //   sqlValues.push(req.query.color);
  // }

  /********Gestion DURATION ***********/

  // if (req.query.max_duration != null) {
  //   sql += ' WHERE duration <= ?';
  //   sqlValues.push(req.query.max_duration);
  // }

  /********Gestion COLOR & DURATION ***********/

  if (req.query.color != null) {
    sql += ' WHERE color = ?';
    sqlValues.push(req.query.color);

    if (req.query.max_duration != null) {
      sql += ' AND duration <= ?';
      sqlValues.push(req.query.max_duration);
    }
  } else if (req.query.max_duration != null) {
    sql += ' WHERE duration <= ?';
    sqlValues.push(req.query.max_duration);
  }

  database
    .query(sql, sqlValues)
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erreur récupérations data movies from database');
    });
};

// *************************** Methode GET (by ID) ********************************

// const getMovieById = (req, res) => {
//   const id = parseInt(req.params.id);

//   const movie = movies.find((movie) => movie.id === id);

//   if (movie != null) {
//     res.json(movie);
//   } else {
//     res.status(404).send('Not Found');
//   }
// };

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('SELECT * FROM movies WHERE id = ?', [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      res.status(500).send('Erreur de récupération de la database by ID');
    });
};

// *************** Methode POST **************************

// const addMovie = (req, res) => {
//   console.log(req.body);
//   res.send('Post route is working');
// };

const addMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      'INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erreur de sauvegarde du film');
    });
};

// *************** Methode PUT **************************

const updateMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      'UPDATE MOVIES SET title = ?, director = ?, year = ?, color = ?, duration = ? where id = ?',
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erreur d édition du film');
    });
};

// *************** Methode DELETE **************************

const deleteMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('DELETE FROM movies WHERE id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erreur de suppression du film');
    });
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovieById,
  deleteMovieById,
};
