import * as THREE from "three";
import saturnMap from "./saturn.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(saturnMap),
});
const saturnMesh = new THREE.Mesh(geometry, material);
export default saturnMesh;
