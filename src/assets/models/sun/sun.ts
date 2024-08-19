import * as THREE from "three";
import sunMap from "./sun.jpg";
import { getFresnelMat } from "./getFresnelMat";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(sunMap),
  lightMap: loader.load(sunMap),
  lightMapIntensity: 5,
  emissive: 0xff0000,
  emissiveIntensity: 0.01,
});

//lights

const sunMesh = new THREE.PointLight(0xffffff, 400);
sunMesh.add(new THREE.Mesh(geometry, material));
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);

export default { sunMesh, glowMesh };
