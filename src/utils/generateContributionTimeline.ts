import { GitHubContributionCalendar } from "../types/github-types";

export const structureTimelineByWeek = (dateCountMap: GitHubContributionCalendar) => {
	const timelineByWeek: number[][] = []
	for (const week of dateCountMap.weeks) {
		timelineByWeek.push(week.contributionDays.map(day => day.contributionCount))
	}
	const normalizedTimelineByWeek = normalizeTimeline(timelineByWeek, 'zero-max');
	return normalizedTimelineByWeek;
}

const normalizeTimeline = (
	timeline: number[][],
	type: 'min-max' | 'zero-max' | 'mean-std' = 'zero-max'
): number[][] => {
	switch (type) {
		case 'zero-max': {
			const max = Math.max(...timeline.flat())
			const newTimeline: number[][] = []
			if (max === 0) {
				return timeline;
			}
			for (const week of timeline) {
				newTimeline.push(week.map(day => day / max))
			}
			return newTimeline;
		}
		case 'min-max': {
			const max = Math.max(...timeline.flat())
			const min = Math.min(...timeline.flat())
			const newTimeline: number[][] = []
			if (max - min === 0) {
				return timeline;
			}
			for (const week of timeline) {
				newTimeline.push(week.map(day => (day - min) / (max - min)))
			}
			return newTimeline;
		}
		case 'mean-std': {
			const calculateMean = (numbers: number[]): number => {
				const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
				return sum / numbers.length;
			}

			const calculateStandardDeviation = (numbers: number[], mean: number): number => {
				const squaredDifferences = numbers.map((number) => Math.pow(number - mean, 2));
				const variance = squaredDifferences.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / numbers.length;
				return Math.sqrt(variance);
			}

			const mean = calculateMean(timeline.flat());
			const std = calculateStandardDeviation(timeline.flat(), mean);
			const newTimeline: number[][] = []
			if (std === 0) {
				return timeline;
			}
			for (const week of timeline) {
				newTimeline.push(week.map(day => (day - mean) / std));
			}
			return newTimeline;
		}
		default:
			throw new RangeError(`Normalization type must be one of 'min-max' or 'mean-std'`);
	}
}

export const getSaturdayOfWeek = (date: Date) => {
	if (date.getDay() === 6) return date;
	const daysToAdd = 6 - date.getDay();
	const newDateEpoch = date.valueOf() + (daysToAdd * 1000 * 60 * 60 * 24)
	return new Date(newDateEpoch)
}

export const getSundayOfWeek = (date: Date) => {
	if (date.getDay() === 0) return date;
	const newDateEpoch = date.valueOf() - (date.getDay() * 1000 * 60 * 60 * 24)
	return new Date(newDateEpoch)
}

export const getFirstDayOfYearFromLastDay = (lastDay: Date) => {
	const firstDay = new Date(lastDay);
	firstDay.setFullYear(lastDay.getFullYear() - 1);
	firstDay.setDate(firstDay.getDate() + 1);
	return firstDay;
}

/**
 * NOTE: This function only exists because GitHub API does not understand leap years are longer than 365 days (and creates problems with the contribution timeline)
 * @param date current date
 * @returns the date of the previous day (same time)
 */
export const getPreviousDate = (date: Date) => {
	const newDate = new Date(date);
	newDate.setDate(date.getDate() - 1);
	return newDate;
}

/**
 * Identifies if the 1-year period before this date has a leap day (February 29th)
 *
 * NOTE: This function only exists because GitHub API does not understand leap years are longer than 365 days (and creates problems with the contribution timeline)
 * @param endDate last day of the 1-year range
 */
export const hasLeapDayInRange = (endDate: Date) => {
	const febYear = endDate.getMonth() > 1 ? endDate.getFullYear() : endDate.getFullYear() - 1;
	const february = new Date(febYear, 1, 29);
	return february.getMonth() === 1;
}

export const formatDate = (date: Date) => {
	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() is 0-indexed
	const day = date.getDate().toString().padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
}