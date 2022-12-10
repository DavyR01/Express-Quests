require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5002;

const welcome = (req, res) => {
  res.send('Welcome to my express quest');
};

/***************GET MOVIES *********************/

app.get('/', welcome);

const movieHandlers = require('./movieHandlers');

app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);
app.post('/api/movies', movieHandlers.addMovie);
app.put('/api/movies/:id', movieHandlers.updateMovieById);
app.delete('/api/movies/:id', movieHandlers.deleteMovieById);

/***************GET USERS *********************/

const usersHandlers = require('./usersHandlers');
const { hashPassword } = require('./auth.js');

app.get('/api/users', usersHandlers.getUsers);
app.get('/api/users/:id', usersHandlers.getUsersById);
app.post('/api/users', hashPassword, usersHandlers.addUser);
app.put('/api/users/:id', usersHandlers.updateUserById);
app.delete('/api/users/:id', usersHandlers.deleteUserById);

/************************************************/

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
