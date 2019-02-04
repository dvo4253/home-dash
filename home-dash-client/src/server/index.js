import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import app from './app';

const HTTP_PORT = process.env.HTTP_PORT || 8080;
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;

const httpServer = http.createServer(app).listen(HTTP_PORT, () => {
	console.info(`app is listening at localhost: ${HTTP_PORT}`);
});

const httpsServer = https.createServer({
	key: fs.readFileSync(path.join(process.cwd(), 'ssl/dev.home.local.key')),
	cert: fs.readFileSync(path.join(process.cwd(), 'ssl/dev.home.local.crt')),
}, app).listen(HTTPS_PORT, () => {
	console.info(`app is listening at localhost: ${HTTPS_PORT}`);
});

process.on('SIGTERM', () => {
	httpServer.close(() => {
		console.info('SIGTERM issued...http server is shutting down');
		process.exit(0);
	});

	httpsServer.close(() => {
		console.info('SIGTERM issued...https server is shutting down');
		process.exit(0);
	});
});
