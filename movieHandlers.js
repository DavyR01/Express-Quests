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

const database = require('./database');

const getMovies = (req, res) => {
  database
    .query('select * from movies')
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving data from database');
    });
};

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
    .query('select * from movies where id = ?', [id])
    .then(([movies]) => {
      if (movies[0] != null) {
        res.json(movies[0]);
      } else {
        res.status(404).send('Not Found');
      }
    })
    .catch((err) => {
      res.status(500).send('Error retrieving data from database');
    });
};

// const addMovie = (req, res) => {
//   console.log(req.body);
//   res.send('Post route is working');
// };

const addMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;

  database
    .query(
      'INSERT INTO movies(title, director, year, color, duration) VALUES (?,?,?,?,?)'[
        (title, director, year, color, duration)
      ]
    )
    .then(([result]) => {
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erreur de sauvegarde du film');
    });
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
};
