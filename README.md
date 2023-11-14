# skyline
Replacement of the GitHub skyline projecct

## How to use
1. Run the following commands:
```sh
git clone https://github.com/avikalpg/skyline.git
cd skyline
echo REACT_APP_GITHUB_TOKEN= > .env.local
```
2. Open the file `.env.local` and paste your access token, which you can get from [here](https://github.com/settings/tokens/new?description=Skyline&scopes=read:user) (make sure to adjust the settings for the access token). <br>
Now your file should look something like this:
```
REACT_APP_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
3. Run the following commands:
```sh
npm install
npm start
```
2. Open [http://localhost:3000](http://localhost:3000) to view it in the browser if it doesn't open automatically.
3. Wait a while for the page to load.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

