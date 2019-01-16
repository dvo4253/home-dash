import getCookies from './getCookies';
import {
	cookiesAllValid, cookiesNoneValid, cookiesOneValid, VALID_COOKIE1,
} from './mock';

describe('Get Cookies', () => {
	it('should match all cookies', () => {
		const req = { cookies: cookiesAllValid };
		expect(getCookies(req)).toEqual(cookiesAllValid);
	});

	it('should match no cookies', () => {
		const req = { cookies: cookiesNoneValid };
		expect(getCookies(req)).toEqual({});
	});

	it('should match one cookie', () => {
		const req = { cookies: cookiesOneValid };
		expect(getCookies(req)).toEqual({ ...VALID_COOKIE1 });
	});
});
