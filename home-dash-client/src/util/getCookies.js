
import R from 'ramda';
import { COOKIE_PREFIX } from '../constants';

const customCookiesReducer = R.curry((cookies, accum, key) => {
	const regexStr = `^${COOKIE_PREFIX}`;
	const regex = new RegExp(regexStr);

	const filterFn = (val, regexFilter) => regexFilter.test(val);

	const result = filterFn(key, regex) ? {
		...accum,
		[key]: cookies[key],
	}
		: accum;

	return result;
});

export default req => R.reduce(
	customCookiesReducer(req.cookies || {}),
	{},
	Object.keys(req.cookies || {}),
); // eslint-disable-line no-return-assign;
