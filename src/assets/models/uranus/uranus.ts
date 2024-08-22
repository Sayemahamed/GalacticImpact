import * as THREE from "three";
import uranus from "./uranus.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
    map: loader.load(uranus),
});
const uranusMesh = new THREE.Mesh(geometry, material);
export default uranusMesh;