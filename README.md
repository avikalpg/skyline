# skyline
A 3D visualization of your GitHub contributions, inspired by the GitHub skyline project.

## How to use
Visit [https://gitskyline.vercel.app](https://gitskyline.vercel.app) to use the application directly.

## Local Development Setup
If you want to contribute to this project, follow these steps:

1. Run the following commands:
	```sh
	git clone https://github.com/avikalpg/skyline.git
	cd skyline
	echo NEXT_PUBLIC_GITHUB_TOKEN= > .env.local
	```

2. Open the file `.env.local` and paste your access token, which you can get from [here](https://github.com/settings/tokens/new?description=Skyline) (make sure to adjust the settings for the access token). <br>
Now your file should look something like this:
	```sh
	NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
	```
3. Run the following commands:
	```sh
	npm install
	npm run dev
	```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser if it doesn't open automatically.
5. Wait a while for the page to load.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically update if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production.\
It correctly bundles Next.js in production mode and optimizes the build for the best performance.

### `npm start`

Runs the production build locally.\
Use this to test the production build before deploying.

The application is deployed on Vercel and automatically updates when changes are pushed to the main branch.
