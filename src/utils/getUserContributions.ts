import axios from 'axios';
import { GitHubContributionCalendar } from '../github-types';
import { getFirstDayOfYearFromLastDay, getSaturdayOfWeek, getSundayOfWeek } from './generateContributionTimeline';

const axiosInstance = axios.create({
	baseURL: 'https://api.github.com',
	headers: {
		Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
		"Content-Type": 'application/json'
	},
});

type UserContributionsResponseType = {
	data: {
		user: {
			contributionsCollection: {
				contributionCalendar: GitHubContributionCalendar,
				restrictedContributionsCount: number
			}
		}
	}
}

export const getUserContributions = async (username: string, endDate: Date) => {
	const startDate = getFirstDayOfYearFromLastDay(endDate);
	const rangeStartDate = getSundayOfWeek(startDate);
	const rangeEndDate = getSaturdayOfWeek(endDate);
	const query = `
  {
    user(login: "${username}") {
      contributionsCollection(from: "${rangeStartDate.toISOString()}", to: "${rangeEndDate.toISOString()}") {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
        restrictedContributionsCount
      }
    }
  }
`;
	try {
		const response = await axiosInstance.post<UserContributionsResponseType>("/graphql", { query });
		const userContributions = response.data.data.user.contributionsCollection.contributionCalendar;
		return userContributions;
	} catch (error) {
		console.error('Error fetching user contributions:', error);
		throw error;
	}
}