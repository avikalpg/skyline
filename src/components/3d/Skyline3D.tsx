import React, { useRef, useState } from "react";
import { GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Group, Scene } from "three";
import { BasePlatform } from "./BasePlatform";
import { material, SCALE } from "src/utils/3dUtils";
interface Skyline3DProps extends GroupProps {
	data: number[][],
	username: string,
	dateRange?: string,
	setScene?: (scene: Scene) => void,
	color?: string,
}

function Skyline3d(props: Skyline3DProps) {
	const { data, username, dateRange, ...groupProps } = props;
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef<Group>(null);
	// Hold state for hovered and clicked events
	const [rotation, toggleRot] = useState(true);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (ref.current && rotation) ? (ref.current.rotation.y -= 0.002) : null);
	// Return the view, these are regular Threejs elements expressed in JSX

	const scene = useThree(({ scene }) => scene);
	if (props.setScene) props.setScene(scene);

	return (
		<>
			<group
				castShadow
				receiveShadow
				position={[0, -1, 0]}
				{...groupProps}
				ref={ref as React.RefObject<Group>}
				onClick={(event) => toggleRot(!rotation)}
			>
				<BasePlatform username={username} dateRange={dateRange} color={props.color} />
				{props.data.map((row, i) => row.map((bar, j) => {
					if (bar === 0) return null;
					const barHeight = bar * 20 * SCALE;
					const barPosition = [SCALE * (i - Math.floor(data.length / 2)), SCALE * (j - 3)]
					return (
						<mesh key={`[${i},${j}]`}
							position={[barPosition[0], barHeight / 2, barPosition[1]]}
							castShadow
							receiveShadow
							material={material(bar / 8, props.color)}
						>
							<boxGeometry args={[SCALE, barHeight, SCALE]} />
						</mesh>
					)
				}
				))}
			</group>
		</>
	);
}

export default Skyline3d;