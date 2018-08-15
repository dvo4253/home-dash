/*
 * @jest-environment node
*/
/* eslint-env jest */
/* eslint-disable global-require */
import express from 'express';
import request from 'supertest';
import fallbackAPI from './fallback';

const app = express();
app.use('/', fallbackAPI);

describe('Fallback Route', () => {
	it('Should return 404', (done) => {
		const result = { msg: 'Not Found' };

		request(app)
			.get('/')
			.expect('Content-Type', /json/)
			.expect(404)
			.then((response) => {
				expect(response.body).toEqual(result);
				done();
			});
	});
});
