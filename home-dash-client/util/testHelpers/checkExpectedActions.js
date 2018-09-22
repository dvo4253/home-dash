export const checkExpectedActions = ({
	expectedActions = [],
	done,
	stub,
}) => {
	let actionIndex = 0;
	const dispatch = (action) => {
		expect(action).toEqual(expectedActions[actionIndex]);

		actionIndex += 1;
		if (actionIndex === expectedActions.length) {
			if (stub) stub.restore();
			done();
		}
	};
	return dispatch;
};

export default {};
