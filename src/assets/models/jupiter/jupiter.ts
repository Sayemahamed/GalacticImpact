import * as THREE from "three";
import jupiterMap from "./jupiter.jpg";
import { earthSize } from "../../Math/Constants";
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(jupiterMap),
});
const jupiterMesh = new THREE.Mesh(geometry, material);
jupiterMesh.scale.setScalar(earthSize * 11);
export default jupiterMesh;
