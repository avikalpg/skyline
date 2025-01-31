import "../../../index.css";
import { getUserContributions } from '../../../utils/getUserContributions';
import { GitHubContributionCalendar } from '../../../github-types';
import SkylineEmbed from './SkylineEmbed';
import { notFound } from 'next/navigation';

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
					<SkylineEmbed username={username} endDate={endDate} error={`[git-skyline] No GitHub contributions found for ${username} in this period.`} />
				);
			}
			else {
				return (
					<SkylineEmbed username={username} userContributionCalendar={userContributions} endDate={endDate} />
				);
			}
		})
		.catch((err) => {
			console.error(`Error fetching ${username}'s contributions for ${endDate} :`, err);
			return (
				<SkylineEmbed username={username} endDate={endDate} error={`Error fetching GitHub contributions for ${username} by git-skyline.`} />
			);
		});
}