import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import sun from "./assets/models/sun/sun";
// import mercuryMesh from "./assets/models/mercury/mercury";
// import venusMesh from "./assets/models/venus/venus";
// import marsMesh from "./assets/models/mars/mars";
import earth from "./assets/models/earth/earth";
// import moonMesh from "./assets/models/moon/moon";
// import jupiterMesh from "./assets/models/jupiter/jupiter";
// import saturnMesh from "./assets/models/saturn/saturn";
// import uranusMesh from "./assets/models/uranus/uranus";
// import neptuneMesh from "./assets/models/neptune/neptune";
// import plutoMesh from "./assets/models/pluto/pluto";
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
    camera.position.z = 35;
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
    const solarSystem = new THREE.Group();
    // << Sun >>
    solarSystem.add(sun.sun);
    // << Mercury >>
    // << Venus >>
    //<< Earth Group >>
    const earthAxis = new THREE.Group();
    earth.earthGroup.position.set(50, 0, 0);
    earthAxis.add(earth.earthGroup);
    solarSystem.add(earthAxis);
    // Moon
    // Earth
    // << Mars >>
    // << Jupiter >>
    // << Saturn >>
    // << Uranus >>
    // << Neptune >>
    // << Pluto >>
    // << Stars >>
    const stars = getStarfield({ numStars: 5000 });
    scene.add(stars);
    scene.add(solarSystem);
    // <-- Add light Source -->
    function animate() {
      earth.update();
      earthAxis.rotation.y += 0.002;
      sun.update();
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
