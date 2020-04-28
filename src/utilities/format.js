import TypeInsurance from 'type-insurance';
import hasOwnProp from 'has-own-prop';
import { parseMinutes } from './parse';

export const formatTime = input => {
	const { number } = new TypeInsurance(input);
	const { days, hours, minutes } = parseMinutes(number);
	return `${days ? days + '*' : ''}${hours ? hours + '"' : ''}${minutes}'`;
}

export const formatDate = date => {
	if(date instanceof Date) {
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		return `${day}.${month}.${year}`;
	} else {
		throw new Error(
			`${date} is not an instance of the Date constructor`
		);
	}
}

export const generatePlainText = data => {
	return data.map(
		entry => {
			const { title, date, time } = entry;
			const description = hasOwnProp(entry, 'description') && entry.description ?
				`\n- ${entry.description}`
				:
				'';

			return `# ${title}`
				+ `\n- ${formatDate(new Date(date))}`
				+ `\n- ${formatTime(time)}`
				+ `${description}`;
		}
	).join(`\n\n`);
}
