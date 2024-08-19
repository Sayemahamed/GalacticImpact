import * as THREE from "three";

import venusMap from "./venus.jpg";
import venusBump from "./venusbump.jpg";

const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, 16);
const material = new THREE.MeshPhongMaterial({
    map: loader.load(venusMap),
    bumpMap: loader.load(venusBump),
    bumpScale: 1,
});
const venusMesh = new THREE.Mesh(geometry, material);
export default venusMesh;
