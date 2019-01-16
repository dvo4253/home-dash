import getHeaders from './getHeaders';
import { HEADER_PREFIX } from '../constants/headers';

describe('Get Custom Headers', () => {
	it('should return empty headers object if no headers', () => {
		const req = { headers: {} };
		const { config } = getHeaders(req, {}, () => {});

		expect(config.headers).toEqual({});
	});

	it('should return empty headers object for non-custom headers', () => {
		const req = { headers: { test_header: 'value' } };
		const headers = getHeaders(req, {}, () => {});

		expect(headers).toEqual({});
	});

	it('should return valid headers object for a custom header (Valid Only)', () => {
		const header1 = { [`${HEADER_PREFIX}-test_header1`]: 'value1' };
		const header2 = { [`${HEADER_PREFIX}-test_header2`]: 'value2' };

		const req = { headers: { ...header1, ...header2 } };
		const headers = getHeaders(req, {}, () => {});

		expect(headers).toEqual({ ...header1, ...header2 });
	});

	it('should return valid headers object for a custom header (Includes invalid)', () => {
		const header1 = { [`${HEADER_PREFIX}-test_header1`]: 'value1' };
		const header2 = { 'SIMPLE-test_header2': 'value2' };

		const req = { headers: { ...header1, ...header2 } };
		const headers = getHeaders(req, {}, () => {});

		expect(headers).toEqual({ ...header1 });
	});
});
