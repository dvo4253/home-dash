import http from 'http';
import app from './app';

const HTTP_PORT = process.env.HTTP_PORT || 8080;
// const HTTPS_PORT = process.env.HTTPS_PORT || 8443;

const httpServer = http.createServer(app).listen(HTTP_PORT, () => {
  console.info(`app is listening at localhost: ${HTTP_PORT}`);
});

process.on('SIGTERM', () => {
  httpServer.close(() => {
    console.info('SIGTERM issued...app is shutting down');
    process.exit(0);
  });
});
