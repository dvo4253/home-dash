import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import * as loggers from './util/loggers';
import routes from './routes';
import constants from './constants';

const { BASE_ROUTE } = constants;

const app = express();

app.set('views', path.join(process.cwd(), '/dist/public'));

app.use(`dist/public`, express.static('/dist/public', { maxAge: '365d' })); // todo: move assets folder to asset public and add base path
app.use(bodyParser.json());


// Place the express-winston logger before the router.
app.use(loggers.infoConsoleLogger);
app.use(BASE_ROUTE, routes);
// Place the express-winston errorLogger after the router.
app.use(loggers.errorConsoleLogger);

module.exports = app;
