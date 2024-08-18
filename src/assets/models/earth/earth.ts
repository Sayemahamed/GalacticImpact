import * as THREE from "three";
import earthmap from "./earthmap1k.jpg";
import earthbump from "./earthbump1k.jpg";
import earthspec from "./earthspec1k.jpg";
import earthclouds from "./earthcloudmap.jpg";
import earthcloudsTrans from "./earthcloudmaptrans.jpg";
import earthlights from "./earthlights1k.jpg";
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 12);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(earthmap),
  bumpMap: loader.load(earthbump),
  specularMap: loader.load(earthspec),
  bumpScale: 0.04,
});
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load(earthlights),
  blending: THREE.AdditiveBlending,
});
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load(earthclouds),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load(earthcloudsTrans),
  // alphaTest: 0.3,
});
const earthMesh = new THREE.Mesh(geometry, material);
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);

export default { earthMesh, cloudsMesh, lightsMesh };
