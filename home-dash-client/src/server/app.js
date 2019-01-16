import path from 'path';
import express from 'express';
// import cookieSession from 'cookie-session';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import * as loggers from './util/loggers';
import router from './routes';
import { COOKIE_PREFIX } from '../constants';

const app = express();
const csrfProtection = csrf({ key: `${COOKIE_PREFIX}csrf`, cookie: true });
app.use(helmet());

app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), '/dist/public'));

app.use('/', express.static(path.join(process.cwd(), '/dist/public'), { maxAge: '365d' })); // todo: move assets folder to asset public and add base path

app.use(cookieParser())
	.use(csrfProtection);

app.use(bodyParser.json());
// Place the express-winston logger before the router.
app.use(loggers.infoConsoleLogger);

// CSRF error handler
app.use((err, req, res, next) => {
	if (err.code !== 'EBADCSRFTOKEN') return next(err);

	// handle CSRF token errors here
	res.status(403);
	return res.send('form tampered with');
});

app.use('/', router);

// Place the express-winston errorLogger after the router.
app.use(loggers.errorConsoleLogger);

module.exports = app;
