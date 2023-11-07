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