import { BoxGeometry, Euler, Vector3 } from 'three';
import { material } from 'src/utils/3dUtils';
import { Text3D } from '@react-three/drei';

interface BasePlatformProps {
	username: string;
	dateRange?: string;
	baseMetric?: string;
	color?: string;
	SCALE: number;
	customMessage?: string;
}

interface TextProps {
	text: string;
	alignment: 'left' | 'center' | 'right';
	side: 'front' | 'back';
	textScale?: number;
	thickness?: number;
}

export function BasePlatform({ username, dateRange, baseMetric, color, SCALE, customMessage }: BasePlatformProps) {
	// Dimensions of the base platform
	const baseWidth = 55 * SCALE;
	const baseHeight = 9 * SCALE;
	const topWidth = 54 * SCALE;
	const topHeight = 8 * SCALE;
	const depth = 3 * SCALE;

	// All the text to be written on the base platform
	const creditsText = "skyline3d.in";
	const inscriptions: TextProps[] = [
		{
			text: username,
			alignment: 'left',
			side: 'front',
			textScale: 1.5 * SCALE,
			thickness: 1 * SCALE,
		},
		{
			text: dateRange ?? "",
			alignment: 'right',
			side: 'front',
			textScale: 1.5 * SCALE,
			thickness: 1 * SCALE,
		},
		{
			text: customMessage ?? "",
			alignment: 'center',
			side: 'back',
			textScale: 1.5 * SCALE,
			thickness: 0.75 * SCALE,
		},
		{
			text: baseMetric ?? "",
			alignment: 'left',
			side: 'back',
			textScale: 0.9 * SCALE,
			thickness: 0.5 * SCALE,
		},
		{
			text: creditsText,
			alignment: 'right',
			side: 'back',
			textScale: 1 * SCALE,
			thickness: 0.5 * SCALE,
		}
	];

	const positionFromConfig = (textConfig: TextProps) => {
		const { text, alignment, side = 'front', textScale = 1.5 * SCALE } = textConfig;
		const textOffsetUnit = textScale / 1.5;
		const textLength = text.length;

		// x-coordinate of the text
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

		// y-coordinate of the text
		const numLinesInText = (!text) ? 0 : text.split('\n').length;
		const y = (numLinesInText < 2) ? -depth / 4 : depth / 8;

		const z = side === 'front' ? topHeight / 2 : -topHeight / 2;

		return new Vector3(x, y, z);
	}

	const rotationFromSide = (side: 'front' | 'back') => {
		const rotY = side === 'front' ? 0 : Math.PI;
		const rotX = Math.atan((baseHeight - topHeight) / (2 * depth)) * (side === 'front' ? -1 : 1);
		// return new Vector3(rotX, rotY, 0);
		return new Euler(rotX, rotY, 0);
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
					size={textConfig.textScale ?? 1.5 * SCALE}
					height={textConfig.thickness ?? 1 * SCALE}
					curveSegments={12}
					bevelEnabled
					bevelThickness={0.03 * SCALE}
					bevelSize={0.02 * SCALE}
					position={positionFromConfig(textConfig)}
					rotation={rotationFromSide(textConfig.side)}
					castShadow
					bevelSegments={5}
					material={material(0.1, color)}
				>
					{textConfig.text}
				</Text3D>
			))}
		</group >
	);
}