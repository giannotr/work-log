import hasOwnProp from 'has-own-prop';

const hasOwnProps = (obj, propsArray) => {
	return propsArray.reduce(
		(acc, curr) => acc && hasOwnProp(obj, curr),
		true
	);
}

const isStrings = array => {
	return array.reduce(
		(acc, curr) => acc && typeof curr === 'string',
		true
	);
}

const validateObjectSchema = obj => {
	let _return = false;

	if(typeof obj === 'object' && !Array.isArray(obj)) {
		if(hasOwnProps(obj, ['title', 'date', 'time'])) {
			_return = isStrings([obj.title, obj.date, obj.time]);
		}
	}

	return _return;
}

export const validateDataSchema = data => {
	let _return = true;

	if(Array.isArray(data) && data.length > 0) {
		for(const obj of data) {
			if(!validateObjectSchema(obj)) {
				_return = false;
				break;
			}
		}
	} else {
		_return = false;
	}

	return _return;
}
