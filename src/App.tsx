import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import sun from "./assets/models/sun/sun";
import mercuryMesh from "./assets/models/mercury/mercury";
import venusMesh from "./assets/models/venus/venus";
import marsMesh from "./assets/models/mars/mars";
import earth from "./assets/models/earth/earth";
import moonMesh from "./assets/models/moon/moon";
import jupiterMesh from "./assets/models/jupiter/jupiter";
import saturnMesh from "./assets/models/saturn/saturn";
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
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", handleWindowResize, false);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    new OrbitControls(camera, renderer.domElement);
    // <-- Add Elements -->
    //<< Solar System >>
    const solarGroup = new THREE.Group();
    // << Sun >>
    solarGroup.add(sun.sunMesh);
    solarGroup.add(sun.glowMesh);
    // << Mercury >>
    mercuryMesh.position.set(0, 10, 0);
    solarGroup.add(mercuryMesh);
    // << Venus >>
    venusMesh.position.set(0, -10, 0);
    solarGroup.add(venusMesh);
    //<< Earth Group >>
    const earthGroup = new THREE.Group();
    // Moon
    const moonGroup = new THREE.Group();
    moonGroup.add(moonMesh);
    earthGroup.add(moonGroup);
    // Earth
    earthGroup.rotation.z = (-23.4 * Math.PI) / 180;
    earthGroup.add(earth.earthMesh);
    earthGroup.add(earth.lightsMesh);
    earthGroup.add(earth.cloudsMesh);
    earthGroup.add(earth.glowMesh);
    earthGroup.position.set(10, 0, 0);
    solarGroup.add(earthGroup);
    // << Mars >>
    marsMesh.position.set(-10, 0, 0);
    solarGroup.add(marsMesh);
    // << Jupiter >>
    jupiterMesh.position.set(0, 0, 10);
    solarGroup.add(jupiterMesh);
    // << Saturn >>
    saturnMesh.position.set(0, 0, -10);
    solarGroup.add(saturnMesh);
    // << Stars >>
    const stars = getStarfield({ numStars: 3000 });
    scene.add(stars);
    scene.add(solarGroup);
    // <-- Add light Source -->
    function animate() {
      earth.earthMesh.rotation.y += 0.002;
      earth.lightsMesh.rotation.y += 0.002;
      earth.cloudsMesh.rotation.y += 0.0031;
      moonMesh.rotation.y -= 0.005;
      moonGroup.rotation.y -= 0.01;
      stars.rotation.y -= 0.0002;
      sun.sunMesh.rotation.y += 0.009;
      solarGroup.rotateY(0.005);
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
