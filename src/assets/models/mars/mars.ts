import * as THREE from "three";
import marsMap from "./mars.jpg";
import marsBump from "./mars_1k_topo.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(marsMap),
  bumpMap: loader.load(marsBump),
  bumpScale: 1,
});
const marsMesh = new THREE.Mesh(geometry, material);
export default marsMesh;
