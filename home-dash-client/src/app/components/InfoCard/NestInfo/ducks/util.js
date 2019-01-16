export const getDeviceId = (store, index) => {
	// console.log('TCL: getDeviceId -> store', store);
	if (store && index >= 0) {
		const key = Object.keys(store)[index];
		// console.log('TCL: getDeviceId -> keys', key);
		const deviceId = key;
		// console.log('TCL: getDeviceId -> deviceId', deviceId);
		return deviceId;
	}

	return '';
};

export const getCurrentTargetTemp = (store) => {
	// console.log('getCurrentTargetTemp STORE: ', store);
	const { nest } = store.value.data;
	// console.log('getCurrentTargetTemp nest: ', nest);
	let result = Number.NaN;
	if (nest) {
		const device1 = Object.keys(nest)[0];
		// console.log('getCurrentTargetTemp device1.target_temperature_f: ', nest[device1].target_temperature_f);
		result = nest[device1].target_temperature_f;
	}

	return result;
};
