import * as THREE from "three";
import marsMap from "./mars.jpg";
import marsBump from "./mars_1k_topo.jpg";
import { earthSize } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(marsMap),
  bumpMap: loader.load(marsBump),
  bumpScale: 1,
});
const marsMesh = new THREE.Mesh(geometry, material);
marsMesh.scale.setScalar(0.5*earthSize);
export default marsMesh;
