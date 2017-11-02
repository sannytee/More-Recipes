import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './server/routes';

// Set up the express application
const app = express();


// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


routes(app);
// set up a default catch-all route
app.get('*', (req, res) => res.status(400).send({
  message: 'Resource cannot be found'
}));

export default app;
