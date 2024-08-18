import * as THREE from "three";
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshPhongMaterial({
  map: loader.load("src/assets/textures/earth/earthmap1k.jpg"),
  bumpMap: loader.load("src/assets/textures/earth/earthbump1k.jpg"),
  specularMap: loader.load("src/assets/textures/earth/earthspec1k.jpg"),
  bumpScale: 0.04,
});
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("../assets/textures/earth/earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("../assets/textures/earth/earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load("../assets/textures/earth/earthcloudmaptrans.jpg"),
  // alphaTest: 0.3,
});
const earthMesh = new THREE.Mesh(geometry, material);
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);

export default { earthMesh, cloudsMesh, lightsMesh };
