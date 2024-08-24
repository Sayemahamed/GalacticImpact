import * as THREE from "three";
import uranus from "./uranus.jpg";
import { earthRotation } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(uranus),
});
const uranusMesh = new THREE.Mesh(geometry, material);
const update = () => {
  uranusMesh.rotation.y += earthRotation * (24 / 17.2);
};
export default { uranusMesh, update };
