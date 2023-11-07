export type GithubUserEventObject = {
	id: string,
	created_at: string,
	public: boolean,
	type: string,
	actor: object,
	org: object,
	repo: object,
	payload: object,
}