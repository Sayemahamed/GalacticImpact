import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";
import { earthDistance } from "../../Math/Constants";

function getAsteroidBelt() {
  const group = new THREE.Group();
  const loader = new OBJLoader();
  ["Rock1.obj", "Rock2.obj", "Rock3.obj"].forEach((path) => {
    loader.load(path, (obj) => {
      const distance = earthDistance * 2.3;
      for (let i = 0; i < 500; i++) {
        const radius = distance + Math.random() * 16 - 0.05;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        obj.scale.setScalar(Math.random() * 0.3);
        const mesh = obj;
        mesh.position.set(x, 0, z);
        group.add(mesh.clone());
      }
    });
  });
  return group;
}

export default getAsteroidBelt;
