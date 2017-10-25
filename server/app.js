import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

// Set up the express application
const app = express();


// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up a default catch-all route
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the More-recipe app'
}));

export default app;
