import R from 'ramda';
import { HEADER_PREFIX } from '../constants/headers';

const customHeaderReducer = (accum, [key, val]) => {
	const headerMatch = new RegExp(`^${HEADER_PREFIX}`);
	return headerMatch.test(key) ? { ...accum, [key]: val } : accum;
};

const filterHeaders = R.compose(R.reduce(customHeaderReducer, {}), R.toPairs);

export default req => filterHeaders(req.headers);
