export const buildAuthTokenHeader = tokenVal => ({ Authorization: `Bearer ${tokenVal}` });

export default {
	buildAuthTokenHeader,
};
