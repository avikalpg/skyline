# skyline
A 3D visualization of your GitHub contributions, inspired by the GitHub skyline project.

## How to use
Visit [https://skyline3d.in](https://skyline3d.in) to use the application directly.

### Embedding the Skyline in Your Website

You can embed the Skyline webpage into your own web page using an `iframe`. This allows you to customize options such as disabling zoom and pan, adding a base, changing colors, adjusting lighting (sunlight and indoor lights), and setting the end date of the skyline. The embedded page will not include the header or footer.

> Example: [My homepage with the embedding](https://avikalpg.github.io/)

To embed the skyline, click on the "Embed Page" button on the Skyline website. This will take you to a page with the 3D model alone. Use the URL of this page in an `iframe` on your website.

```html
<iframe
  src="https://skyline3d.in/avikalpg/embed?endDate=2023-12-31&color=white&enableZoom=false"
  width="100%"
  height="100%"
  frameborder="0"
></iframe>
```

Customization Options
By default, the model enables `sunlight`, `indoorLights`, `damping`, `panning`, and `zoom` interactions, disables the `base` flooring, and uses a "grey" `color` for the 3D model. You can customize these settings using URL parameters.

Available Parameters:
- `endDate`: Set the end date of your 1 year skyline (format: `YYYY-MM-DD`)
- `color`: Set the color of the 3D model (e.g. `white`, `red` or `%239be9a8` for "#9be9a8" or `%2340c463` for "#40c463")
- `sunlight`: Enable sunlight (based on your time of day - on equator)
- `indoorLights`: Enable indoor lights
- `enableZoom`: Enable zoom interaction
- `enablePan`: Enable pan interaction
- `enableDamping`: Enable damping interaction
- `base`: Enable the base flooring

Example URL with Parameters:
```html
<iframe
  src="https://skyline3d.in/avikalpg/embed?endDate=2023-12-31&color=%2340c463&sunlight=false&indoorLights=true&enableZoom=false&enablePan=false&enableDamping=false&base=true"
  width="100%"
  height="100%"
  frameborder="0"
></iframe>
```

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
