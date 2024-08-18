import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import earth from "./assets/models/earth/earth";
import getStarfield from "./assets/models/stars/stars";
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", handleWindowResize, false);
    new OrbitControls(camera, renderer.domElement);
    // <-- Add Elements -->
    //<< Earth Group >>
    const earthGroup = new THREE.Group();
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    earthGroup.add(earth.earthMesh);
    earthGroup.add(earth.lightsMesh);
    earthGroup.add(earth.cloudsMesh);
    scene.add(earthGroup);

    // << Stars >>
    const stars = getStarfield({ numStars: 3000 });
    scene.add(stars);
    // <-- Add light Source -->
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(-2, 0.5, 1.5);
    scene.add(sunLight);
    function animate() {
      earth.earthMesh.rotation.y += 0.002;
      earth.lightsMesh.rotation.y += 0.002;
      earth.cloudsMesh.rotation.y += 0.0023;
      stars.rotation.y -= 0.0002;
      renderer.render(scene, camera);
    }
    function handleWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, []);
  return <></>;
}

export default App;
