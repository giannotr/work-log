import TypeInsurance from 'type-insurance';

export const parseSeconds = input => {
	const { number} = new TypeInsurance(input);

	const seconds = number % 60,
				minutes = Math.floor(number / 60) % 60,
				hours = Math.floor(number / (60 * 60)) % 24;

	return { hours, minutes, seconds };
}

export const parseMinutes = input => {
	const { number } = new TypeInsurance(input);

	const minutes = number % 60,
				hours = Math.floor(number / 60) % 24,
				days = Math.floor(number / (60 * 24));

	return { days, hours, minutes };
}

export const getMissingKeys = (data, mandatoryKeys) => {
	const { object } = new TypeInsurance(data);
	const { array } = new TypeInsurance(mandatoryKeys);

	console.log(array);

	return Object.entries(object)
		.filter(
			entry => (
				!(entry[1] || entry[1] === 0 || entry[1] === false)
				&& array.includes(entry[0]))
			)
		.map(entry => entry[0]);
}

export const getDateString = date => {
	if(date instanceof Date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();

		if(isNaN(year) || isNaN(month) || isNaN(day)) {
			return null;
		} else {
			return `${year}-${month}-${day}`;
		}
	} else {
		throw new Error(
			`${date} is not an instance of the Date constructor`
		);
	}
}
