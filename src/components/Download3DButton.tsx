import { SaveAlt } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/joy";
import { Scene } from "three";
import { useState } from "react";
import { exportGLTFModel, exportSTLModel } from "src/utils/3dExport";

export function Download3DButton({ scene, username, dateRange }: { scene?: Scene, username: string, dateRange: string }) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		if (anchorEl) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	function downloadGLTFModel() {
		if (scene) {
			exportGLTFModel(scene, `github-${username}-${dateRange}.gltf`);
		}
		handleClose();
	}

	function downloadSTLModel() {
		if (scene) {
			exportSTLModel(scene, `github-${username}-${dateRange}.stl`);
		}
		handleClose();
	}

	return (
		<>
			<IconButton disabled={!scene} onClick={handleClick}>
				<SaveAlt />
			</IconButton>
			<Menu
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<MenuItem onClick={downloadSTLModel}>Save STL</MenuItem>
				<MenuItem onClick={downloadGLTFModel}>Save GLTF</MenuItem>
			</Menu>
		</>
	)
}