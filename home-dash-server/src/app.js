import express from 'express';
import helmet from 'helmet';
import path from 'path';
// import '@babel/register';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import client, { register } from 'prom-client';
import * as loggers from './util/loggers';
import * as metrics from './util/metrics';
import { checkTokens } from './util/authorize';
import routes from './routes';
import { BASE_ROUTE } from './constants';

const app = express();
app.use(helmet());
const { collectDefaultMetrics } = client;

// Probe every 5th second.
collectDefaultMetrics({ prefix: 'home_dash_server_' });

app.set('views', path.join(process.cwd(), '/dist/public'));

app.use('dist/public', express.static('/dist/public', { maxAge: '365d' })); // todo: move assets folder to asset public and add base path
app.use(bodyParser.json());
app.use(cookieParser());

// Place the express-winston logger before the router.
app.use(loggers.infoConsoleLogger);
// Record Response time
app.use(metrics.instrumentResponseTime);

app.get(`${BASE_ROUTE}/metrics`, (req, res) => {
	res.set('Content-Type', register.contentType);
	res.end(register.metrics());
});


app.use(checkTokens);

app.use(BASE_ROUTE, routes);

// Place the express-winston errorLogger after the router.
app.use(loggers.errorConsoleLogger);

export default app;
