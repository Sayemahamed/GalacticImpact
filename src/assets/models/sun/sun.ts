import * as THREE from "three";
import sunMap from "./sun.jpg";
import { earthRotation, sunSize } from "../../Math/Constants";
//@ts-ignore
import FakeGlowMaterial from "./FakeGlowMaterial.js";

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

const sunMesh = new THREE.PointLight(0xffffff, 6, 500, 0.05);
sunMesh.add(new THREE.Mesh(geometry, material));
const fakeGlowMaterial = new FakeGlowMaterial({ glowColor: 0xffffff });
const radiationMesh = new THREE.Mesh(geometry, fakeGlowMaterial);
const sun = new THREE.Group();
radiationMesh.scale.setScalar(2);
sun.add(sunMesh);
sun.add(radiationMesh);
const update = () => {
  sun.rotation.y += earthRotation * (24 / 25);
};
sun.scale.setScalar(sunSize);
export default { sun, update };
