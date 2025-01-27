import { BoxGeometry, MeshStandardMaterial, Vector3 } from 'three';
import { SCALE } from 'src/utils/3dUtils';
import { Text3D } from '@react-three/drei';

interface BasePlatformProps {
	username: string;
	dateRange?: string;
}

export function BasePlatform({ username, dateRange }: BasePlatformProps) {
	// Dimensions of the base platform
	const baseWidth = 55 * SCALE;
	const baseHeight = 9 * SCALE;
	const topWidth = 54 * SCALE;
	const topHeight = 8 * SCALE;
	const depth = 3 * SCALE;

	// All the text to be written on the base platform
	const inscriptions: { text?: string, alignment: 'left' | 'center' | 'right' }[] = [
		{
			text: username,
			alignment: 'left',
		},
		{
			text: dateRange,
			alignment: 'right',
		}
	];
	const positionFromAlignment = (alignment: 'left' | 'center' | 'right', textLength: number) => {
		switch (alignment) {
			case 'left':
				return new Vector3(-topWidth / 2 + 2 * SCALE, -depth / 4, topHeight / 2);
			case 'center':
				return new Vector3(-(textLength / 2) * SCALE, -depth / 4, topHeight / 2);
			case 'right':
				return new Vector3(topWidth / 2 - (textLength + 2) * SCALE, -depth / 4, topHeight / 2);
			default:
				break;
		}
	}

	// Create the base platform geometry
	const geometry = new BoxGeometry(baseWidth, depth, baseHeight);
	const positions = geometry.attributes.position.array;
	const centerTop = new Vector3(0, depth / 2, 0);

	const topVertexIndices: number[] = [];
	for (let i = 0; i < positions.length / 3; i++) {
		if (positions[i * 3 + 1] > 0) { // vertex with positive y-coordinate is on the top surface
			topVertexIndices.push(i);
		}
	}

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
		<group receiveShadow position={[0 * SCALE, -depth / 2, 0]} castShadow>
			<mesh receiveShadow position={[0, 0, 0]} geometry={geometry} material={material} />
			{inscriptions.map((textConfig, index) => (
				<Text3D
					key={index}
					font="/helvetiker_regular.typeface.json"
					size={1.5 * SCALE}
					height={1 * SCALE}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.03 * SCALE}
					bevelSize={0.02 * SCALE}
					position={positionFromAlignment(textConfig.alignment, textConfig.text?.length ?? 0)}
					rotation={[-Math.atan((baseHeight - topHeight) / depth), 0, 0]}
					castShadow
					bevelSegments={5}
					material={material}
				>
					{textConfig.text}
				</Text3D>
			))}
		</group>
	);
}