import "../../index.css";
import { Suspense } from 'react';
import { getUserContributions } from '../../utils/getUserContributions';
import { GitHubContributionCalendar } from '../../github-types';
import SkylinePage from './SkylinePage';
import { notFound } from 'next/navigation'

export default function Page({ params, searchParams }: { params: { username: string }, searchParams?: { endDate?: string } }) {
	const username = params.username;
	const endDateParam = searchParams?.endDate;
	const endDate = endDateParam ? new Date(endDateParam) : new Date();

	if (!username) {
		notFound();
	}

	return getUserContributions(username, endDate)
		.then((userContributions: GitHubContributionCalendar) => {
			if (!userContributions) {
				return (
					<SkylinePage username={username} endDate={endDate} error="No contributions found for this user in this period." />
				);
			}
			else {
				return (
					<SkylinePage username={username} userContributionCalendar={userContributions} endDate={endDate} />
				);
			}
		})
		.catch((err) => {
			console.error(`Error fetching ${username}'s contributions for ${endDate} :`, err);
			return (
				<SkylinePage username={username} endDate={endDate} error="Error fetching contributions." />
			);
		});
}