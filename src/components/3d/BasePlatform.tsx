import { BoxGeometry, Vector3 } from 'three';
import { material, SCALE } from 'src/utils/3dUtils';
import { Text3D } from '@react-three/drei';

interface BasePlatformProps {
	username: string;
	dateRange?: string;
	color?: string;
}

export function BasePlatform({ username, dateRange, color }: BasePlatformProps) {
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
	const creditsText = "git-skyline by avikalpg";

	const positionFromAlignment = (
		alignment: 'left' | 'center' | 'right',
		textLength: number,
		side: 'front' | 'back' = 'front',
		textScale: number = 1.5 * SCALE
	) => {
		const textOffsetUnit = textScale / 1.5;
		let x = 0;

		switch (alignment) {
			case 'left':
				x = -topWidth / 2 + 2 * textOffsetUnit;
				break;
			case 'center':
				x = -(textLength / 2) * textOffsetUnit;
				break;
			case 'right':
				x = topWidth / 2 - (textLength + 2) * textOffsetUnit;
				break;
		}

		if (side === 'back') {
			x *= -1;
		}

		const y = -depth / 4;
		const z = side === 'front' ? topHeight / 2 : -topHeight / 2;

		return new Vector3(x, y, z);
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

	return (
		<group receiveShadow position={[0 * SCALE, -depth / 2, 0]} castShadow>
			<mesh castShadow receiveShadow position={[0, 0, 0]} geometry={geometry} material={material(undefined, color)} />
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
					material={material(0.1, color)}
				>
					{textConfig.text}
				</Text3D>
			))}
			<Text3D
				font="/helvetiker_regular.typeface.json"
				size={1 * SCALE}
				height={0.5 * SCALE}
				curveSegments={12}
				bevelEnabled
				bevelThickness={0.03 * SCALE}
				bevelSize={0.02 * SCALE}
				position={positionFromAlignment('center', creditsText.length, 'back', SCALE)}
				rotation={[Math.atan((baseHeight - topHeight) / depth), Math.PI, 0]}
				castShadow
				bevelSegments={5}
				material={material(0.1, color)}
			>
				{creditsText}
			</Text3D>
		</group >
	);
}