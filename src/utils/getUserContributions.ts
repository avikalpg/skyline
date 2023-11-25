import axios from 'axios';
import { GitHubContributionCalendar } from '../github-types';

const axiosInstance = axios.create({
	baseURL: 'https://api.github.com',
	headers: {
		Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
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

export const getUserContributions = async (username: string) => { // TODO: get date range & implement paginated reponse
	const startDate = '2023-01-01T00:00:00Z';
	const endDate = '2023-12-31T23:59:59Z';
	const query = `
  {
    user(login: "${username}") {
      contributionsCollection(from: "${startDate}", to: "${endDate}") {
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