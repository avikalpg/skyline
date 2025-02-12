export type GitHubContributionCalendar = {
	totalContributions: number,
	weeks: Array<{
		contributionDays: Array<{
			date: string,
			contributionCount: number
		}>
	}>
}