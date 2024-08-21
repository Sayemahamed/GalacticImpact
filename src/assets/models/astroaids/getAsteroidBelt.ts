import * as THREE from "three";
import astroid1 from "./rocks/Rock1.obj";
import astroid2 from "./rocks/Rock2.obj";
import astroid3 from "./rocks/Rock3.obj";

const loader = new THREE.ObjectLoader();

function getInstanced(distance: number, mesh: THREE.Mesh, size: number) {
  const numObjs = 100 + Math.floor(Math.random() * 200);
  const instaMesh = new THREE.InstancedMesh(
    mesh.geometry,
    mesh.material,
    numObjs
  );
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < numObjs; i += 1) {
    const radius = distance + Math.random() * 10 - 0.05;
    const angle = Math.random() * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const position = new THREE.Vector3(x, 0, z);
    const quaternion = new THREE.Quaternion();
    quaternion.random();
    const currentSize = size + Math.random() * 0.05 - 0.025;
    const scale = new THREE.Vector3().setScalar(currentSize);
    matrix.compose(position, quaternion, scale);
    instaMesh.setMatrixAt(i, matrix);
  }
  return instaMesh;
}
function getAsteroidBelt() {
  const group = new THREE.Group();
  group.add(getInstanced(30, loader.load(astroid1), 0.035));
  group.add(getInstanced(30, loader.load(astroid2), 0.035));
  group.add(getInstanced(30, loader.load(astroid3), 0.035));
  return group;
}

export default getAsteroidBelt;
