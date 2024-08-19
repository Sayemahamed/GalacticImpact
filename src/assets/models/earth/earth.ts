import * as THREE from "three";
import { getFresnelMat } from "./getFresnelMat";

import earthMap from "./earth.jpg";
import earthBump from "./earthbump1k.jpg";
import earthSpec from "./earthspec1k.jpg";
import earthClouds from "./cloud.jpg";
import earthCloudsTrans from "./earthcloudmaptrans.jpg";
import earthLights from "./earth_light.jpg";
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(earthMap),
  specularMap: loader.load(earthSpec),
  bumpMap: loader.load(earthBump),
  bumpScale: 1,
});
const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load(earthLights),
  blending: THREE.AdditiveBlending,
});
const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load(earthClouds),
  transparent: true,
  opacity: 2,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load(earthCloudsTrans),
  // alphaTest: 0.3,
});
const earthMesh = new THREE.Mesh(geometry, material);
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.03);
const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.04);

export default { earthMesh, cloudsMesh, lightsMesh, glowMesh };
