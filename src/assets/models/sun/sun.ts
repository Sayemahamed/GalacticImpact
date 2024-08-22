import * as THREE from "three";
import sunMap from "./sun.jpg";
import { getFresnelMat } from "./getFresnelMat";
import { sunSize } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(sunMap),
  lightMap: loader.load(sunMap),
  lightMapIntensity: 5,
  emissive: 0xff0000,
  emissiveIntensity: 0.01,
});

//lights

const sunMesh = new THREE.PointLight(0xffffff, 10, 500, 0.2);
sunMesh.add(new THREE.Mesh(geometry, material));
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.002);
const sun = new THREE.Group();
sun.add(sunMesh);
sun.add(glowMesh);
const update = () => {
  sun.rotation.y -= 0.002;
};
sun.scale.setScalar(sunSize);
export default { sun, update };
