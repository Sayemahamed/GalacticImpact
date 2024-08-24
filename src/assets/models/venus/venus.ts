import * as THREE from "three";

import venusMap from "./venus.jpg";
import venusBump from "./venusbump.jpg";
import { earthRotation } from "../../Math/Constants";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 10);
const material = new THREE.MeshPhongMaterial({
  map: loader.load(venusMap),
  bumpMap: loader.load(venusBump),
  bumpScale: 1,
});
const venusMesh = new THREE.Mesh(geometry, material);
const update = () => {
  venusMesh.rotation.y += earthRotation * (24 / 243.7);
};
export default { venusMesh, update };
