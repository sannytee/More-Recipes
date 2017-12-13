import dotenv from 'dotenv';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import router from './src/routes';

// Set up the express application
const app = express();
const compiler = webpack(webpackConfig);

dotenv.config();
// Log requests to the console
app.use(logger('dev'));

// Parse incoming request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

router(app);
// set up a default catch-all route
app.get('*', (req, res) => {
  res.status(404).send({ error: 'Resourse not found' });
});


const port = parseInt(process.env.PORT, 10) || 3000;

app.listen(port, () => {
  console.log(`Server starting on port: ${port}`);
});

export default app;
