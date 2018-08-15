/*
 * @jest-environment node
*/
/* eslint-env jest */
/* eslint-disable global-require */
import express from 'express';
import request from 'supertest';
import healthAPI from './health';
import { healthMock } from './mock';

jest.mock('os', () => require('./mock/').healthMock.osMock);

const app = express();

app.use('/', healthAPI);

describe('Health Route', () => {
	it('Should return health', (done) => {
		const result = { host: healthMock.hostName };

		request(app)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(200)
			.then((response) => {
				expect(response.body).toEqual(result);
				done();
			});
	});
});
