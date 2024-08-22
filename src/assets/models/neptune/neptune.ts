import * as THREE from "three";
import neptune from "./neptune.jpg";
import { earthSize } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(neptune),
});
const neptuneMesh = new THREE.Mesh(geometry, material);
neptuneMesh.scale.setScalar(4 * earthSize);
export default neptuneMesh;
