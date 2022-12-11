require('dotenv').config();

const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send('Welcome to my express quest');
};
//Importing the hasing and the verification for our login post
const { hashPassword, verifyPassword, verifyToken } = require('./auth.js');

app.get('/', welcome);

const movieHandlers = require('./movieHandlers');
const usersHandlers = require('./usersHandlers');

/************  LOGIN ATUHENTIFICATION AVEC JWT  ****************************/

// const isItDwight = (req, res) => {
//   if (
//     req.body.email === 'dwight@theoffice.com' &&
//     req.body.password === '123456'
//   ) {
//     res.send('Credentials are valid');
//   } else {
//     res.sendStatus(401);
//   }
// };

// app.post('/api/login', isItDwight);

app.post(
  '/api/login',
  usersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

//GET

app.get('/api/movies', movieHandlers.getMovies);
app.get('/api/movies/:id', movieHandlers.getMovieById);

app.get('/api/users', usersHandlers.getUsers);
app.get('/api/users/:id', usersHandlers.getUsersById);

// POST (without protection)
app.post('/api/users', hashPassword, usersHandlers.addUser);

/********************The routes to protect (verify token) *********************************/
app.use(verifyToken);

app.post('/api/movies', movieHandlers.addMovie);
app.put('/api/movies/:id', movieHandlers.updateMovieById);
app.delete('/api/movies/:id', movieHandlers.deleteMovieById);

/*************** TABLE USERS *********************/

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
