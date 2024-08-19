import * as THREE from "three";
import uranaus from "./uranus.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
    map: loader.load(uranaus),
});
const uranausMesh = new THREE.Mesh(geometry, material);
export default uranausMesh;