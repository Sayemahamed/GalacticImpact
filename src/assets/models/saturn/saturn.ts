import * as THREE from "three";
import saturnMap from "./saturn.jpg";
import { earthSize } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(saturnMap),
});
const saturnMesh = new THREE.Mesh(geometry, material);
saturnMesh.scale.setScalar(9.5 * earthSize);
export default saturnMesh;
