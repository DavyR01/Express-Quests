const { hashPassword } = require('./auth');
const database = require('./database');

const getUsers = (req, res) => {
  let sql = 'SELECT * FROM users';
  const sqlValues = [];

  /*********** Gestion LANGUAGE ****************/

  // if (req.query.language != null) {
  //   sql += ' WHERE language = ?';
  //   sqlValues.push(req.query.language);
  // }

  /*********** Gestion CITY ****************/

  // if (req.query.city != null) {
  //   sql += ' WHERE city = ?';
  //   sqlValues.push(req.query.city);
  // }

  /*********** Gestion LANGUAGE & CITY ****************/

  if (req.query.language != null) {
    sql += ' WHERE language = ?';
    sqlValues.push(req.query.language);

    if (req.query.city != null) {
      sql += ' AND city = ?';
      sqlValues.push(req.query.city);
    }
  } else if (req.query.city != null) {
    sql += ' WHERE city = ?';
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error retrieving datas users from database');
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
      'INSERT INTO users(firstname, lastname, email, city, language, hashedPassword ) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, email, city, language, hashedPassword]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erreur de sauvegarde de l utilisateur');
    });
};

const updateUserById = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      'update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?',
      [firstname, lastname, email, city, language, id]
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
      res.status(500).send('Erreur d édition de l utilisateur');
    });
};

// *************** Methode DELETE **************************

const deleteUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query('DELETE FROM users WHERE id = ?', [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send('Not Found');
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Erreur de suppression de l utilisateur');
    });
};

module.exports = {
  getUsers,
  getUsersById,
  addUser,
  updateUserById,
  deleteUserById,
};
