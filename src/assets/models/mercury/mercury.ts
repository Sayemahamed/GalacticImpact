import * as THREE from "three";
import mercuryMap from "./mercury.jpg";
import mercuryBump from "./mercurybump.jpg";
import { earthRotation, earthSize } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(mercuryMap),
  bumpMap: loader.load(mercuryBump),
  bumpScale: 1,
});
const mercuryMesh = new THREE.Mesh(geometry, material);
mercuryMesh.scale.setScalar(earthSize * 0.5);
const update = () => {
  mercuryMesh.rotation.y += earthRotation * (24 / 58.7);
};
export default { mercuryMesh, update };
