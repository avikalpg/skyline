import axios from 'axios';
import { GitHubContributionCalendar } from '../github-types';
import { getFirstDayOfYearFromLastDay, getPreviousDate, getSaturdayOfWeek, getSundayOfWeek, hasLeapDayInRange } from './generateContributionTimeline';

const axiosInstance = axios.create({
	baseURL: 'https://api.github.com',
	headers: {
		Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
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
	const rangeEndDate = hasLeapDayInRange(endDate) && endDate.getDay() === 0 // if Leap Year and Sunday (FIX FOR: GitHub API does not understand leap years are longer than 365 days)
		? getPreviousDate(endDate) // guaranteed to be Saturday
		: getSaturdayOfWeek(endDate);
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
		if (response.status !== 200) {
			console.error('Error fetching user contributions:', response.status, response.statusText);
			throw new Error(`Failed to fetch user contributions: Response status ${response.status}`);
		}
		const userContributions = response.data.data.user.contributionsCollection.contributionCalendar;
		return userContributions;
	} catch (error) {
		console.error('Error fetching user contributions:', error);
		throw error;
	}
}