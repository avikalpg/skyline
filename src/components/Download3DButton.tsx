import { SaveAlt } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/joy";
import { Scene } from "three";
import { useState } from "react";
import { exportGLTFModel, exportSTLModel } from "src/utils/3dExport";

export function Download3DButton({ scene, username, dateRange, setError }: { scene?: Scene, username: string, dateRange: string, setError?: (error: string) => void }) {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		if (anchorEl) {
			setAnchorEl(null);
		} else {
			setAnchorEl(event.currentTarget);
		}
		if (setError) setError("");
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	async function downloadGLTFModel() {
		try {
			if (!scene) {
				throw new Error('No 3D scene available for export');
			}
			exportGLTFModel(scene, `github-${username}-${dateRange}.gltf`);
			if (setError) setError("");
		} catch (error) {
			console.error('Failed to export GLTF model:', error);
			if (setError) setError("Failed to export GLTF model")
		} finally {
			handleClose();
		}
	}

	async function downloadSTLModel() {
		try {
			if (!scene) {
				throw new Error('No 3D scene available for export');
			}
			exportSTLModel(scene, `github-${username}-${dateRange}.stl`);
			if (setError) setError("");
		} catch (error) {
			console.error('Failed to export STL model:', error);
			if (setError) setError("Failed to export STL model")
		} finally {
			handleClose();
		}
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