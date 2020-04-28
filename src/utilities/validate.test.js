import { validateDataSchema } from './validate';

test('validateDataSchema', () => {
	expect(validateDataSchema(undefined)).toBe(false);
	expect(validateDataSchema(false)).toBe(false);
	expect(validateDataSchema(0)).toBe(false);
	expect(validateDataSchema('')).toBe(false);
	expect(validateDataSchema({})).toBe(false);
	expect(validateDataSchema([])).toBe(false);
	expect(validateDataSchema([{}])).toBe(false);
	expect(validateDataSchema([{
		key: 'value'
	}])).toBe(false);
	expect(validateDataSchema([{
		title: 'foo',
		date: '2020-04-23',
	}])).toBe(false);
	expect(validateDataSchema([{
		title: 'bar',
		date: '2020-04-24',
		time: '30'
	}])).toBe(true);
	expect(validateDataSchema([{
		title: 'baz',
		description: 'hello world',
		date: '2020-04-25',
		time: '30'
	}])).toBe(true);
	expect(validateDataSchema([{
		title: 42,
		date: '2020-04-26',
		time: '30'
	}])).toBe(false);
});
