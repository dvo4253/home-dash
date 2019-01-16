import { COOKIE_PREFIX } from '../../constants';

export const VALID_COOKIE1_KEY = `${COOKIE_PREFIX}test1`;
const VALID_COOKIE2_KEY = `${COOKIE_PREFIX}test2`;
const VALID_COOKIE3_KEY = `${COOKIE_PREFIX}test3`;
const INVALID_COOKIE1_KEY = `test1-${COOKIE_PREFIX}`;
const INVALID_COOKIE2_KEY = `tes-${COOKIE_PREFIX}t2`;
const INVALID_COOKIE3_KEY = 'test3';

export const VALID_COOKIE1 = { [VALID_COOKIE1_KEY]: 'test1-value' };
export const VALID_COOKIE2 = { [VALID_COOKIE2_KEY]: 'test2-value' };
export const VALID_COOKIE3 = { [VALID_COOKIE3_KEY]: 'test3-value' };

export const cookiesAllValid = {
	...VALID_COOKIE1,
	...VALID_COOKIE2,
	...VALID_COOKIE3,
};

export const cookiesNoneValid = {
	[INVALID_COOKIE1_KEY]: 'test1-value',
	[INVALID_COOKIE2_KEY]: 'test2-value',
	[INVALID_COOKIE3_KEY]: 'test3-value',
};

export const cookiesOneValid = {
	...VALID_COOKIE1,
	[INVALID_COOKIE2_KEY]: 'test2-value',
	[INVALID_COOKIE3_KEY]: 'test3-value',
};
