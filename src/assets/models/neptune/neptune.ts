import * as THREE from "three";
import neptune from "./neptune.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(neptune),
});
const neptuneMesh = new THREE.Mesh(geometry, material);
export default neptuneMesh;
