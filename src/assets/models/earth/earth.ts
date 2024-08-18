import * as THREE from "three";
import earthMap from "./earthmap1k.jpg";
import earthBump from "./earthbump1k.jpg";
import earthSpec from "./earthspec1k.jpg";
import earthClouds from "./earthcloudmap.jpg";
import earthCloudsTrans from "./earthcloudmaptrans.jpg";
import earthLights from "./earthlights1k.jpg";
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(earthMap),
  specularMap: loader.load(earthSpec),
  bumpMap: loader.load(earthBump),
  bumpScale: 0.04,
});
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load(earthLights),
  blending: THREE.AdditiveBlending,
});
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load(earthClouds),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load(earthCloudsTrans),
  // alphaTest: 0.3,
});
const earthMesh = new THREE.Mesh(geometry, material);
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);

export default { earthMesh, cloudsMesh, lightsMesh };
