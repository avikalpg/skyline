import { MeshPhongMaterial } from "three";

export const SCALE = 0.25;

export const material = (glow: number = 0.01) => new MeshPhongMaterial({ color: 'grey', emissive: 'grey', emissiveIntensity: glow, shininess: 20 });