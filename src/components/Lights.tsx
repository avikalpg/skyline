import { SCALE } from "src/utils/3dUtils";
import { AmbientLight, DirectionalLight, Vector3 } from "three";

function IndoorLights() {
	return (
		<group>
			<pointLight position={new Vector3(-15 * SCALE, 25 * SCALE, 10 * SCALE)} intensity={1000 * SCALE} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
			<pointLight position={new Vector3(15 * SCALE, 25 * SCALE, 10 * SCALE)} intensity={1000 * SCALE} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
			<pointLight position={new Vector3(-15 * SCALE, 25 * SCALE, -10 * SCALE)} intensity={1000 * SCALE} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
			<pointLight position={new Vector3(15 * SCALE, 25 * SCALE, -10 * SCALE)} intensity={1000 * SCALE} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
		</group>
	);
}

/**
 *
 * @param latitude Latitude in degrees
 * @returns Directional and ambient light based on sun's position
 */
function SunLight({ latitude = 0 }: { latitude: number }) {
	const INTENSITY_MULTIPLIER = 20 * SCALE;
	const light = new DirectionalLight();
	const time = new Date();
	const hours = time.getHours() + time.getMinutes() / 60

	// Get day of year (0-365)
	const start = new Date(time.getFullYear(), 0, 0)
	const diff = time.getTime() - start.getTime();
	const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))

	// Calculate solar declination angle
	const declination = 23.45 * Math.sin((2 * Math.PI / 365) * (dayOfYear - 81))

	// Calculate solar elevation angle
	const solarHour = (hours - 12) * 15
	const elevation = Math.asin(
		Math.sin(latitude * Math.PI / 180) * Math.sin(declination * Math.PI / 180) +
		Math.cos(latitude * Math.PI / 180) * Math.cos(declination * Math.PI / 180) *
		Math.cos(solarHour * Math.PI / 180)
	)

	// Calculate azimuth angle (adjusted for NE viewing direction)
	const azimuth = Math.atan2(
		Math.cos(declination * Math.PI / 180) * Math.sin(solarHour * Math.PI / 180),
		Math.cos(latitude * Math.PI / 180) * Math.sin(declination * Math.PI / 180) -
		Math.sin(latitude * Math.PI / 180) * Math.cos(declination * Math.PI / 180) *
		Math.cos(solarHour * Math.PI / 180)
	) + Math.PI / 4 // Adding 45° for NE orientation

	// Position the sun using spherical coordinates
	const distance = 10
	light.position.x = distance * Math.cos(elevation) * Math.sin(azimuth)
	light.position.z = distance * Math.cos(elevation) * Math.cos(azimuth)
	light.position.y = distance * Math.sin(elevation)

	// Adjust intensity based on elevation angle
	const intensity = Math.sin(elevation) * INTENSITY_MULTIPLIER
	light.intensity = Math.max(0, intensity)

	// Color temperature adjustments based on elevation
	const elevationDegrees = elevation * 180 / Math.PI
	console.log(`Elevation: ${elevationDegrees}, Intensity: ${intensity}`)
	if (elevationDegrees < 0) {
		// Below horizon - night
		light.color.setHSL(0.67, 0.8, 0.2)
	} else if (elevationDegrees < 10) {
		// Low angle - dawn/dusk
		light.color.setHSL(0.07, 0.8, 0.5)
	} else {
		// Higher sun - adjust warmth based on elevation
		const warmth = 0.08 - (elevationDegrees / 90) * 0.02
		light.color.setHSL(warmth, 0.2, 0.5)
	}

	// casting shadows
	light.castShadow = true
	light.shadow.camera.left = -40 * SCALE;
	light.shadow.camera.right = 40 * SCALE;
	light.shadow.camera.top = 40 * SCALE;
	light.shadow.camera.bottom = -40 * SCALE;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 100;
	light.shadow.mapSize.width = 2048;
	light.shadow.mapSize.height = 2048;

	const ambientComponent = new AmbientLight(0x404040, 4 * (1 + intensity / INTENSITY_MULTIPLIER));
	console.log(`ambient intensity: ${ambientComponent.intensity}`)

	return (
		<group>
			<primitive object={light} />
			<primitive object={ambientComponent} />
		</group>
	)
}

interface LightProps {
	indoorLights?: boolean;
	sunlight?: boolean;
	latitude?: number;
}

export function Lights(props: LightProps) {
	return (
		<group>
			{props.indoorLights ? <IndoorLights /> : null}
			{props.sunlight ? <SunLight latitude={0} /> : null}
		</group>
	);
}