import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/Addons.js";

function getAsteroidBelt(
  distance: number,
  asteroidCount: number = 100,
  avgSize: number = 0.45
) {
  const group = new THREE.Group();
  const loader = new OBJLoader();
  ["Rock1.obj", "Rock2.obj", "Rock3.obj"].forEach((path) => {
    loader.load(path, (obj) => {
      for (let i = 0; i < asteroidCount; i++) {
        const radius = distance + Math.random() * 15 - 0.05;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        obj.scale.setScalar(Math.random() * avgSize);
        const mesh = obj;
        mesh.position.set(x, Math.random() * 6 - 3, z);
        group.add(mesh.clone());
      }
    });
  });
  return group;
}

export default getAsteroidBelt;
