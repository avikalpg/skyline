import { SCALE } from './Skyline3D';

export function BasePlatform() {
	return (
		<mesh receiveShadow position={[-0.5 * SCALE, -0.5 * SCALE, 0]} rotation={[-Math.PI / 2, 0, 0]}>
			<boxGeometry args={[52 * SCALE, 7 * SCALE, 1 * SCALE]} />
			<meshStandardMaterial color="grey" />
		</mesh>
	)
}
