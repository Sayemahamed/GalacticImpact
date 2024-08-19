import * as THREE from "three";
import mercuryMap from "./mercury.jpg";
import mercuryBump from "./mercurybump.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
    map: loader.load(mercuryMap),
    bumpMap: loader.load(mercuryBump),
    bumpScale: 1,
});
const mercuryMesh = new THREE.Mesh(geometry, material);
export default mercuryMesh;