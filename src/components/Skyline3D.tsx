import React, { useRef, useState } from "react";
import { GroupProps, useFrame } from "@react-three/fiber";
import { Group } from "three";
import { BasePlatform } from "./BasePlatform";

export const SCALE = 0.25

interface Skyline3DProps extends GroupProps {
	data: number[][]
}

function Skyline3d(props: Skyline3DProps) {
	const { data, ...groupProps } = props;
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef<Group>(null);
	// Hold state for hovered and clicked events
	const [rotation, toggleRot] = useState(true);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => (ref.current && rotation) ? (ref.current.rotation.y -= 0.01) : null);
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<>
			<group
				castShadow
				receiveShadow
				position={[0, -1, 0]}
				rotation={[0.2, -0.25, 0]}
				{...groupProps}
				ref={ref as React.RefObject<Group>}
				onClick={(event) => toggleRot(!rotation)}
			>
				<BasePlatform />
				{props.data.map((row, i) => row.map((bar, j) => {
					if (bar === 0) return null;
					const barHeight = bar * 5;
					const barPosition = [SCALE * (i - Math.floor(data.length / 2)), SCALE * (j - 3)]
					return (
						<mesh key={`[${i},${j}]`}
							position={[barPosition[0], barHeight / 2, barPosition[1]]}
							castShadow
							receiveShadow
						>
							<boxGeometry args={[SCALE, barHeight, SCALE]} />
							<meshStandardMaterial
								// wireframe={props.wireframe}
								color="grey"
							/>
						</mesh>
					)
				}
				))}
			</group>
		</>
	);
}

export default Skyline3d;