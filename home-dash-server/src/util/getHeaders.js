import {
	toPairs, compose, reduce, contains,
} from 'ramda';
import { HEADER_PREFIX } from '../constants/headers';

const HEADER_LIST = ['x-original-uri'];

const customHeaderReducer = (accum, [key, val]) => {
	const headerMatch = new RegExp(`^${HEADER_PREFIX}`);
	return (contains(key, HEADER_LIST) || headerMatch.test(key)) ? { ...accum, [key]: val } : accum;
};

const filterHeaders = compose(reduce(customHeaderReducer, {}), toPairs);

export default req => filterHeaders(req.headers);
