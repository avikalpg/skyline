import { GithubUserEventObject } from "../github-types";

export const generateContributionTimeline = (userEvents: GithubUserEventObject[]) => {
	const dateCountMap: Record<string, number> = {};

	userEvents.forEach((userEvent) => {
		// Extract the date from the 'created_at' field
		const dateString = userEvent.created_at.split('T')[0];

		// Check if the date already exists in the map, and if not, initialize it to 1; otherwise, increment the count
		if (dateCountMap[dateString]) {
			dateCountMap[dateString]++;
		} else {
			dateCountMap[dateString] = 1;
		}
	});

	return dateCountMap;
}

export const structureTimelineByWeek = (dateCountMap: Record<string, number>) => {
	const normalizedDateCountMap = normalizeTimeline(dateCountMap, 'zero-max');
	const numRows = 53;
	const numColumns = 7;
	const timelineByWeek: number[][] = Array.from({ length: numRows }, () => Array(numColumns).fill(0));
	const lastDate = getSaturdayOfWeek(new Date());
	console.log("Last date: ", lastDate)
	for (const dateStr in normalizedDateCountMap) {
		const date = new Date(dateStr)
		const daysUntilEnd = Math.ceil(Math.abs(lastDate.valueOf() - date.valueOf()) / (1000 * 60 * 60 * 24));
		const weeksUntilEnd = Math.floor(daysUntilEnd / 6);
		timelineByWeek[52 - weeksUntilEnd][date.getDay()] = normalizedDateCountMap[dateStr];
	}
	return timelineByWeek;
}

const normalizeTimeline = (
	timeline: Record<string, number>,
	type: 'min-max' | 'zero-max' | 'mean-std' = 'zero-max'
): Record<string, number> => {
	switch (type) {
		case 'zero-max': {
			const max = Math.max(...Object.values(timeline))
			const newTimeline: Record<string, number> = {}
			for (const dateStr in timeline) {
				newTimeline[dateStr] = timeline[dateStr] / max;
			}
			return newTimeline;
		}
		case 'min-max': {
			const max = Math.max(...Object.values(timeline))
			const min = Math.min(...Object.values(timeline))
			const newTimeline: Record<string, number> = {}
			for (const dateStr in timeline) {
				newTimeline[dateStr] = (timeline[dateStr] - min) / (max - min);
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

			const mean = calculateMean(Object.values(timeline));
			const std = calculateStandardDeviation(Object.values(timeline), mean);
			const newTimeline: Record<string, number> = {}
			for (const dateStr in timeline) {
				newTimeline[dateStr] = (timeline[dateStr] - mean) / std;
			}
			return newTimeline;
		}
		default:
			throw new RangeError(`Normalization type must be one of 'min-max' or 'mean-std'`);
	}
}

const getSaturdayOfWeek = (date: Date) => {
	if (date.getDay() == 6) return date;
	const daysToAdd = 6 - date.getDay();
	const newDateEpoch = date.valueOf() + (daysToAdd * 1000 * 60 * 60 * 24)
	return new Date(newDateEpoch)
}

// Not used yet. This will be used to create filters in the UI
export const groupEventsByType = (allEventObject: GithubUserEventObject[]) => {
	const type_stat: { [x: string]: GithubUserEventObject[] } = {}
	for (const item of allEventObject) {
		if (!(item.type in type_stat)) {
			type_stat[item.type] = [];
		}
		type_stat[item.type].push(item);
	}
	for (const [k, v] of Object.entries(type_stat)) {
		console.log(`${k} = ${v.length}`, generateContributionTimeline(v));
	}
}