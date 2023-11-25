import { GitHubContributionCalendar } from "../github-types";

export const structureTimelineByWeek = (dateCountMap: GitHubContributionCalendar) => {
	const timelineByWeek: number[][] = []
	for (const week of dateCountMap.weeks) {
		timelineByWeek.push(week.contributionDays.map(day => day.contributionCount))
	}
	const normalizedTimelineByWeek = normalizeTimeline(timelineByWeek, 'zero-max')
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
			for (const week of timeline) {
				newTimeline.push(week.map(day => day / max))
			}
			return newTimeline;
		}
		case 'min-max': {
			const max = Math.max(...timeline.flat())
			const min = Math.min(...timeline.flat())
			const newTimeline: number[][] = []
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
			for (const week of timeline) {
				newTimeline.push(week.map(day => (day - mean) / std));
			}
			return newTimeline;
		}
		default:
			throw new RangeError(`Normalization type must be one of 'min-max' or 'mean-std'`);
	}
}