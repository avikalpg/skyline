import { MeshPhongMaterial } from "three";

export const material = (glow: number = 0.01, color: string = 'grey') => new MeshPhongMaterial({ color, emissive: color, emissiveIntensity: glow, shininess: 20 });