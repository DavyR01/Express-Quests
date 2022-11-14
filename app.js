require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.APP_PORT ?? 5004;

const welcome = (req, res) => {
  res.send('Welcome to my favourite movie list');
};

/***************GET MOVIES *********************/

app.get('/', welcome);

const movieHandlers = require('./movieHandlers');

app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);

/***************GET USERS *********************/

const usersHandlers = require('./usersHandlers');

app.get('/api/users', usersHandlers.getUsers);
app.get('/api/users/:id', usersHandlers.getUsersById);

/************************************************/

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
