import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import earth from "./models/earth";
function App() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
    new OrbitControls(camera, renderer.domElement);
    // <-- Add Elements -->
    // scene.add(cube);
    scene.add(earth);
    // <-- Add light Source -->
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);
    function animate() {
      earth.rotation.x += 0.01;
      earth.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
  }, []);
  return <></>;
}

export default App;
