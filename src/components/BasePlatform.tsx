import { BoxGeometry, MeshStandardMaterial, Vector3 } from 'three';
import { SCALE } from 'src/utils/3dUtils';
import { Text3D } from '@react-three/drei';

interface BasePlatformProps {
	username: string;
}

export function BasePlatform({ username }: BasePlatformProps) {
	const baseWidth = 54 * SCALE;
	const baseHeight = 9 * SCALE;
	const topWidth = 53 * SCALE;
	const topHeight = 8 * SCALE;
	const depth = 3 * SCALE;

	const geometry = new BoxGeometry(baseWidth, depth, baseHeight);
	const positions = geometry.attributes.position.array;
	const centerTop = new Vector3(0, depth / 2, 0);

	// Dynamically get top vertices indices
	const topVertexIndices: number[] = [];
	for (let i = 0; i < positions.length / 3; i++) {
		if (positions[i * 3 + 1] > 0) {
			topVertexIndices.push(i);
		}
	}

	// Apply scaling to top vertices
	for (const i of topVertexIndices) {
		const vertex = new Vector3().fromArray(positions, i * 3);
		vertex.sub(centerTop);
		vertex.x *= (topWidth / baseWidth);
		vertex.z *= (topHeight / baseHeight);
		vertex.add(centerTop);
		vertex.toArray(positions, i * 3);
	}

	geometry.attributes.position.needsUpdate = true;
	geometry.computeVertexNormals();

	const material = new MeshStandardMaterial({ color: 'grey' });

	return (
		<group receiveShadow position={[-0.5 * SCALE, -depth / 2, 0]} castShadow>
			<mesh receiveShadow position={[0, 0, 0]} geometry={geometry} material={material} />
			<Text3D
				font="/helvetiker_regular.typeface.json" // Path to your font
				size={1.5 * SCALE}
				height={1 * SCALE}
				curveSegments={12}
				bevelEnabled
				bevelThickness={0.03 * SCALE}
				bevelSize={0.02 * SCALE}
				position={[-topWidth / 2 + 2 * SCALE, -depth / 4, topHeight / 2]}
				rotation={[-Math.atan((baseHeight - topHeight) / depth), 0, 0]}
				castShadow
				bevelSegments={5}
				material={material}
			>
				{username}
			</Text3D>
		</group>
	);
}