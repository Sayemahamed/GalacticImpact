import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import sun from "./assets/models/sun/sun";

import mercuryMesh from "./assets/models/mercury/mercury";
import venusMesh from "./assets/models/venus/venus";
import earth from "./assets/models/earth/earth";
import marsMesh from "./assets/models/mars/mars";
import getAsteroidBelt from "./assets/models/astroaids/getAsteroidBelt";
import jupiterMesh from "./assets/models/jupiter/jupiter";
import saturnMesh from "./assets/models/saturn/saturn";
import uranusMesh from "./assets/models/uranus/uranus";
import neptuneMesh from "./assets/models/neptune/neptune";
import plutoMesh from "./assets/models/pluto/pluto";
import getStarfield from "./assets/models/stars/stars";
import { earthCirculation, earthDistance } from "./assets/Math/Constants";
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
    const mercuryAxis = new THREE.Group();
    mercuryMesh.position.set(earthDistance * 0.5 + 5, 0, 0);
    mercuryAxis.add(mercuryMesh);
    mercuryAxis.rotateY(2 * Math.PI * 0.1);
    solarSystem.add(mercuryAxis);
    // << Vnus >>
    const venusAxis = new THREE.Group();
    venusMesh.position.set(earthDistance * 1, 0, 0);
    venusAxis.add(venusMesh);
    venusAxis.rotateY(2 * Math.PI * 0.3);
    solarSystem.add(venusAxis);
    //<< Earth >>
    const earthAxis = new THREE.Group();
    earth.earthGroup.position.set(earthDistance * 1.5, 0, 0);
    earthAxis.add(earth.earthGroup);
    earthAxis.rotateY(2 * Math.PI * 0.4);
    solarSystem.add(earthAxis);
    // << Mars >>
    const marsAxis = new THREE.Group();
    marsMesh.position.set(earthDistance * 2, 0, 0);
    marsAxis.add(marsMesh);
    marsAxis.rotateY(2 * Math.PI * 0.6);
    solarSystem.add(marsAxis);
    //<< astroid belt >>
    const astroidBelt1 = getAsteroidBelt(earthDistance * 2.3);
    solarSystem.add(astroidBelt1);
    // << Jupiter >>
    const jupiterAxis = new THREE.Group();
    jupiterMesh.position.set(earthDistance * 3.5, 0, 0);
    jupiterAxis.add(jupiterMesh);
    jupiterAxis.rotateY(2 * Math.PI * 0.7);
    solarSystem.add(jupiterAxis);
    // << Saturn >>
    const saturnAxis = new THREE.Group();
    saturnMesh.position.set(earthDistance * 4.5, 0, 0);
    saturnAxis.add(saturnMesh);
    saturnAxis.rotateY(2 * Math.PI * 0.8);
    solarSystem.add(saturnAxis);
    // << Uranus >>
    const uranusAxis = new THREE.Group();
    uranusMesh.position.set(earthDistance * 6, 0, 0);
    uranusAxis.add(uranusMesh);
    uranusAxis.rotateY(2 * Math.PI * 0.9);
    solarSystem.add(uranusAxis);
    // << Neptune >>
    const neptuneAxis = new THREE.Group();
    neptuneMesh.position.set(earthDistance * 7.5, 0, 0);
    neptuneAxis.add(neptuneMesh);
    neptuneAxis.rotateY(2 * Math.PI);
    solarSystem.add(neptuneAxis);
    // << Pluto >>
    const plutoAxis = new THREE.Group();
    plutoMesh.position.set(earthDistance * 8, 0, 0);
    plutoAxis.add(plutoMesh);
    solarSystem.add(plutoAxis);
    // << Second Asteroid Belt >>
    // const astroidBelt2 = getAsteroidBelt(earthDistance * 7.5);
    // solarSystem.add(astroidBelt2);
    // << Stars >>
    const stars = getStarfield({ numStars: 5000 });
    scene.add(stars);
    scene.add(solarSystem);
    function animate() {
      mercuryAxis.rotation.y += earthCirculation/0.2;
      venusAxis.rotation.y += earthCirculation/0.6;
      earthAxis.rotation.y += earthCirculation;
      marsAxis.rotation.y += earthCirculation/1.9;
      jupiterAxis.rotation.y += earthCirculation/11.9;
      saturnAxis.rotation.y += earthCirculation/29.5;
      uranusAxis.rotation.y += earthCirculation/84;
      neptuneAxis.rotation.y += earthCirculation/164.8;
      plutoAxis.rotation.y += earthCirculation;
      // earth.update();
      // earthAxis.rotation.y += 0.002;
      sun.update();
      renderer.render(scene, camera);
    }
    function handleWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Listen for mouse clicks
    window.addEventListener("click", onMouseClick);

    function onMouseClick(event: MouseEvent) {
      // Calculate normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the picking ray
      raycaster.setFromCamera(mouse, camera);

      // Find intersected objects
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        // An object was clicked
        const clickedObject = intersects[0].object;
        console.log("Clicked object:", clickedObject);
        // Add your custom logic here
      }
    }
  }, []);
  return <></>;
}

export default App;
