import { Scene } from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { STLExporter } from "three/examples/jsm/exporters/STLExporter.js";

export function save(blob: Blob, filename: string): void {
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;
	link.click();
}

export function saveArrayBuffer(buffer: ArrayBuffer, filename: string): void {
	save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}

export function saveString(text: string, filename: string): void {
	save(new Blob([text], { type: "text/plain" }), filename);
}

export function exportGLTFModel(scene: Scene, filename: string) {
	const exporter = new GLTFExporter();
	// const exporter = new STLExporter();
	exporter.parse(
		scene,
		(gltf) => {
			if (gltf instanceof ArrayBuffer) {
				saveArrayBuffer(gltf, filename);
			} else {
				saveString(JSON.stringify(gltf, null, 2), filename);
			}
		},
		function (error) {
			console.log(error);
		},
		{
			trs: true,
			onlyVisible: true,
			binary: false,
			maxTextureSize: 4096,
		}
	);
}

export function exportSTLModel(scene: Scene, filename: string) {
	const exporter = new STLExporter();
	const stlString = exporter.parse(scene, { binary: false });
	saveString(stlString, filename);
}