import * as THREE from "three";
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshStandardMaterial({
  color: 0xffff00,
  flatShading: true,
});
const earth = new THREE.Mesh(geometry, material);

export default earth;
