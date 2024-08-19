import * as THREE from "three";
import jupiterMap from "./jupiter.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(jupiterMap),
});
const jupiterMesh = new THREE.Mesh(geometry, material);
export default jupiterMesh;
