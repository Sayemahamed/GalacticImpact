import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";

function getAsteroidBelt(distance: number) {
  const group = new THREE.Group();
  const loader = new OBJLoader();
  ["Rock1.obj", "Rock2.obj", "Rock3.obj"].forEach((path) => {
    loader.load(path, (obj) => {
      for (let i = 0; i < 600; i++) {
        const radius = distance + Math.random() * 25 - 0.05;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        obj.scale.setScalar(Math.random() * 0.2);
        const mesh = obj;
        mesh.position.set(x, Math.random() * 4 - 2, z);
        group.add(mesh.clone());
      }
    });
  });
  return group;
}

export default getAsteroidBelt;
