import { hasLeapDayInRange } from '../generateContributionTimeline';

describe('hasLeapDayInRange', () => {
	test('returns true for dates after February 29th in a leap year', () => {
		const date = new Date(2024, 3, 1); // April 1, 2024 (leap year)
		expect(hasLeapDayInRange(date)).toBe(true);
	});

	test('returns false for dates in February of a leap year', () => {
		const date = new Date(2024, 1, 15); // February 15, 2024
		expect(hasLeapDayInRange(date)).toBe(false);
	});

	test('returns false for dates in a non-leap year', () => {
		const date = new Date(2023, 3, 1); // April 1, 2023
		expect(hasLeapDayInRange(date)).toBe(false);
	});

	test('returns false for dates in January of a leap year', () => {
		const date = new Date(2024, 0, 15); // January 15, 2024
		expect(hasLeapDayInRange(date)).toBe(false);
	});

	test('returns true for December in leap year', () => {
		const date = new Date(2020, 11, 31); // December 31, 2020 (leap year)
		expect(hasLeapDayInRange(date)).toBe(true);
	});

	test('returns false for March 1st in non-leap year', () => {
		const date = new Date(2023, 2, 1); // March 1, 2023
		expect(hasLeapDayInRange(date)).toBe(false);
	});

	test('returns true for March 1st in leap year', () => {
		const date = new Date(2024, 2, 1); // March 1, 2024
		expect(hasLeapDayInRange(date)).toBe(true);
	});
});
