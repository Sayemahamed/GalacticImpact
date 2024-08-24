import * as THREE from "three";
import jupiterMap from "./jupiter.jpg";
import { earthRotation, earthSize } from "../../Math/Constants";
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(jupiterMap),
});
const jupiterMesh = new THREE.Mesh(geometry, material);
jupiterMesh.scale.setScalar(earthSize * 11);
const update = () => {
  jupiterMesh.rotation.y += earthRotation * (24 / 9.5);
};
export default { jupiterMesh, update };
