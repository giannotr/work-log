import {
	parseSeconds,
	parseMinutes,
	getMissingKeys,
} from './parse';

test('parseSeconds', () => {
	expect(parseSeconds(undefined))
		.toEqual({seconds: 0, minutes: 0, hours: 0 });
	expect(parseSeconds(null))
		.toEqual({seconds: 0, minutes: 0, hours: 0 });
	expect(parseSeconds(false))
		.toEqual({seconds: 0, minutes: 0, hours: 0 });
	expect(parseSeconds(''))
		.toEqual({seconds: 0, minutes: 0, hours: 0 });
	expect(parseSeconds('0'))
		.toEqual({seconds: 0, minutes: 0, hours: 0 });
	expect(parseSeconds(0))
		.toEqual({seconds: 0, minutes: 0, hours: 0 });
	expect(parseSeconds(10))
		.toEqual({seconds: 10, minutes: 0, hours: 0 });
	expect(parseSeconds(70))
		.toEqual({seconds: 10, minutes: 1, hours: 0 });
	expect(parseSeconds(60))
		.toEqual({seconds: 0, minutes: 1, hours: 0 });
	expect(parseSeconds(3661))
		.toEqual({seconds: 1, minutes: 1, hours: 1 });
	expect(parseSeconds('3661'))
		.toEqual({seconds: 1, minutes: 1, hours: 1 });
});

test('parseMinutes', () => {
	expect(parseMinutes(undefined))
		.toEqual({minutes: 0, hours: 0, days: 0 });
	expect(parseMinutes(null))
		.toEqual({minutes: 0, hours: 0, days: 0 });
	expect(parseMinutes(false))
		.toEqual({minutes: 0, hours: 0, days: 0 });
	expect(parseMinutes(''))
		.toEqual({minutes: 0, hours: 0, days: 0 });
	expect(parseMinutes('0'))
		.toEqual({minutes: 0, hours: 0, days: 0 });
	expect(parseMinutes(0))
		.toEqual({minutes: 0, hours: 0, days: 0 });
	expect(parseMinutes(10))
		.toEqual({minutes: 10, hours: 0, days: 0 });
	expect(parseMinutes(70))
		.toEqual({minutes: 10, hours: 1, days: 0 });
	expect(parseMinutes(60))
		.toEqual({minutes: 0, hours: 1, days: 0 });
	expect(parseMinutes(1440))
		.toEqual({minutes: 0, hours: 0, days: 1 });
	expect(parseMinutes(1501))
		.toEqual({minutes: 1, hours: 1, days: 1 });
	expect(parseMinutes(4441))
		.toEqual({minutes: 1, hours: 2, days: 3 });
	expect(parseMinutes('4441'))
		.toEqual({minutes: 1, hours: 2, days: 3 });
});

test('validateDataSchema', () => {
	expect(getMissingKeys(undefined, undefined)).toEqual([]);
	expect(getMissingKeys({}, undefined)).toEqual([]);
	expect(getMissingKeys({key: 'value'}, ['key'])).toEqual([]);
	expect(getMissingKeys({key: 0}, ['key'])).toEqual([]);
	expect(getMissingKeys({key: false}, ['key'])).toEqual([]);
	expect(getMissingKeys({key: ''}, ['key'])).toEqual(['key']);
	expect(getMissingKeys({foo: '', bar: ''}, ['foo', 'bar'])).toEqual(['foo', 'bar']);
	expect(getMissingKeys({foo: 'value', bar: ''}, ['foo', 'bar'])).toEqual(['bar']);
});
