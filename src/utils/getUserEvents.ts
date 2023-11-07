import axios, { AxiosResponse } from 'axios';
import { GithubUserEventObject } from '../github-types';

const ITEMS_PER_PAGE = 100
const axiosInstance = axios.create({
	baseURL: 'https://api.github.com',
	headers: {
		Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
	},
});

export const getUserEvents = async (username: string) => { // TODO: get date range & implement paginated reponse
	const urlEndPoint = `/users/${username}/events/public?per_page=${ITEMS_PER_PAGE}`;
	const response = await axiosInstance.get<GithubUserEventObject[]>(urlEndPoint);
	const lastPageNo = getLastPageNumber(response);
	const userEvents = response.data;
	const allEventPromises = [];
	for (let i = 2; i <= lastPageNo; i++) {
		allEventPromises.push(axiosInstance.get<GithubUserEventObject[]>(urlEndPoint + `&page=${i}`));
	}
	await Promise.allSettled(allEventPromises).then((results) => {
		results.forEach(result => {
			if (result.status === 'rejected') {
				console.error("[ERROR] Failed to get results for a page.")
				return;
			}
			console.log(result.value.data);
			userEvents.push(...result.value.data);
		})
	})
	return userEvents;
}

const getLastPageNumber = (response: AxiosResponse<GithubUserEventObject[], any>) => {
	const linkHeader: string = response.headers.link;
	if (!linkHeader) {
		return 1;
	}
	const links = linkHeader.split(',');
	const paginationInfo: Record<string, string> = {};

	links.forEach((link) => {
		const [url, rel] = link.split(';');
		const urlMatch = url.match(/<(.*)>/);
		if (urlMatch && rel) {
			const url = urlMatch[1];
			const relValue = rel.trim().replace(/rel="(.*)"/, '$1');
			paginationInfo[relValue] = url;
		}
	});

	const lastUrl = paginationInfo['last'];
	const lastPageNo = parseInt(lastUrl.match(/&page=(\d+)/)![1], 10);
	return lastPageNo;

}