import * as THREE from 'three';
import asteroid1 from '';

function getInstanced( distance: number, mesh: THREE.Mesh, size: number ) {
    const numObjs = 2000 + Math.floor(Math.random() * 4000);
    const instaMesh = new THREE.InstancedMesh(mesh.geometry, mesh.material, numObjs);
    const matrix = new THREE.Matrix4();
    for (let i = 0; i < numObjs; i += 1) {
        const radius = distance + Math.random() * 5 - 0.05;
        const angle = Math.random() * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const position = new THREE.Vector3(x, 0, z);
        const quaternion = new THREE.Quaternion();
        quaternion.random();
        const currentSize = size + Math.random() * 0.5 - 0.025;
        const scale = new THREE.Vector3().setScalar(currentSize);
        matrix.compose(position, quaternion, scale);
        instaMesh.setMatrixAt(i, matrix);
    }
    return instaMesh;
}
function getAsteroidBelt() {
  const loader = new THREE.ObjectLoader();
  loader.load(path, (obj) => {
    obj.traverse((child) => {
      if (child.isMesh) {
        sceneData.objs.push(child);
      }
    });
  });
    const group = new THREE.Group();
    objs.forEach((obj) => {
        const asteroids = getInstanced( 2.5,  obj, 0.035 );
        group.add(asteroids);
    });
    return group;
}

export default getAsteroidBelt;