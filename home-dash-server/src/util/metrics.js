import Prometheus, { Counter, Gauge } from 'prom-client';

export const httpRequestDurationMicroseconds = new Prometheus.Histogram({
	name: 'http_request_duration_ms',
	help: 'Duration of HTTP requests in ms',
	labelNames: ['route'],
	// buckets for response time from 0.1ms to 500ms
	buckets: [0.10, 5, 15, 50, 100, 200, 300, 400, 500, 1000, 2000],
});

export default () => {
	const c = new Counter({
		name: 'test_counter',
		help: 'Example of a counter',
		labelNames: ['code'],
	});

	const g = new Gauge({
		name: 'test_gauge',
		help: 'Example of a gauge',
		labelNames: ['method', 'code'],
	});

	setInterval(() => {
		c.inc({ code: 200 });
	}, 5000);

	setInterval(() => {
		c.inc({ code: 400 });
	}, 2000);

	setInterval(() => {
		c.inc();
	}, 2000);

	setInterval(() => {
		g.set({ method: 'get', code: 200 }, Math.random());
		g.set(Math.random());
		g.labels('post', '300').inc();
	}, 100);
};

export const instrumentResponseTime = (req, res, next) => {
	const startHrTime = process.hrtime();
	res.on('finish', () => {
		const elapsedHrTime = process.hrtime(startHrTime);
		const elapsedTimeInMs = (elapsedHrTime[0] * 1000) + (elapsedHrTime[1] / 1e6);
		console.log('%s : %fms', req.path, elapsedTimeInMs);
		httpRequestDurationMicroseconds
			.labels(req.path)
			.observe(elapsedTimeInMs);
	});

	next();
};
