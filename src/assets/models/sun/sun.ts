import * as THREE from "three";
import sunMap from "./sun.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(sunMap),
  lightMap: loader.load(sunMap),
  lightMapIntensity: 10,
  emissive: 0xff0000,
  emissiveIntensity: 2,
});

//lights

const sunMesh = new THREE.PointLight(0xffffff, 130);
sunMesh.add(new THREE.Mesh(geometry, material));

export default sunMesh;
