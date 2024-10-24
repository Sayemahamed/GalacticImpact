import * as THREE from "three";
import moonMap from "./moon.jpg";
import moonBump from "./moonbump1k.jpg";
import { earthSize } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(moonMap),
  bumpMap: loader.load(moonBump),
  bumpScale: 0.7,
});
const moonMesh = new THREE.Mesh(geometry, material);
moonMesh.position.set(4.5, 0, 0);
moonMesh.scale.setScalar(0.27*earthSize);
export default moonMesh;
