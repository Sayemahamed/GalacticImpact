import * as THREE from "three";
import plutoMap from "./plutomap1k.jpg";
import plutoBump from "./plutobump1k.jpg";
import { earthSize } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(plutoMap),
  bumpMap: loader.load(plutoBump),
  bumpScale: 1,
});
const plutoMesh = new THREE.Mesh(geometry, material);
plutoMesh.scale.setScalar(earthSize);
export default plutoMesh;
