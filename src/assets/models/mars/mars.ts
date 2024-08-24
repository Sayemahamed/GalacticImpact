import * as THREE from "three";
import marsMap from "./mars.jpg";
import marsBump from "./mars_1k_topo.jpg";
import { earthRotation, earthSize } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(marsMap),
  bumpMap: loader.load(marsBump),
  bumpScale: 1,
});
const marsMesh = new THREE.Mesh(geometry, material);
marsMesh.scale.setScalar(0.5*earthSize);
const update=() => {
  marsMesh.rotation.y += earthRotation;
}
export default {marsMesh, update}
