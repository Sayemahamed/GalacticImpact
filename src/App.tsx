import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import sun from "./assets/models/sun/sun";

import mercury from "./assets/models/mercury/mercury";
import venus from "./assets/models/venus/venus";
import earth from "./assets/models/earth/earth";
import mars from "./assets/models/mars/mars";
import getAsteroidBelt from "./assets/models/astroaids/getAsteroidBelt";
import jupiter from "./assets/models/jupiter/jupiter";
import saturn from "./assets/models/saturn/saturn";
import uranus from "./assets/models/uranus/uranus";
import neptune from "./assets/models/neptune/neptune";
import pluto from "./assets/models/pluto/pluto";
import getStarfield from "./assets/models/stars/stars";
import { earthCirculation, earthDistance } from "./assets/Math/Constants";
function App() {
  useEffect(() => {
    let observationObject: THREE.Object3D = sun.sun;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const position = new THREE.Vector3();
    camera.position.z = earthDistance * 3;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
    window.addEventListener("resize", handleWindowResize, false);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const control = new OrbitControls(camera, renderer.domElement);
    // <-- Add Elements -->
    //<< Solar System >>
    const solarSystem = new THREE.Group();
    // << Sun >>
    solarSystem.add(sun.sun);
    // << Mercury >>
    const mercuryAxis = new THREE.Group();
    mercury.mercuryMesh.position.set(earthDistance * 0.5 + 5, 0, 0);
    mercuryAxis.add(mercury.mercuryMesh);
    mercuryAxis.rotateY(2 * Math.PI * 0.1);
    solarSystem.add(mercuryAxis);
    // << Vnus >>
    const venusAxis = new THREE.Group();
    venus.venusMesh.position.set(earthDistance * 1, 0, 0);
    venusAxis.add(venus.venusMesh);
    venusAxis.rotateY(2 * Math.PI * 0.3);
    solarSystem.add(venusAxis);
    //<< Earth >>
    const earthAxis = new THREE.Group();
    earth.earthGroup.position.set(earthDistance * 1.5, 0, 0);
    earthAxis.add(earth.earthGroup);
    earthAxis.rotateY(2 * Math.PI * 0.7);
    solarSystem.add(earthAxis);
    // << Mars >>
    const marsAxis = new THREE.Group();
    mars.marsMesh.position.set(earthDistance * 2, 0, 0);
    marsAxis.add(mars.marsMesh);
    marsAxis.rotateY(2 * Math.PI * 0.6);
    solarSystem.add(marsAxis);
    //<< astroid belt >>
    const astroidBelt1 = getAsteroidBelt(earthDistance * 2.3);
    solarSystem.add(astroidBelt1);
    // << Jupiter >>
    const jupiterAxis = new THREE.Group();
    jupiter.jupiterMesh.position.set(earthDistance * 3.5, 0, 0);
    jupiterAxis.add(jupiter.jupiterMesh);
    jupiterAxis.rotateY(2 * Math.PI * 0.7);
    solarSystem.add(jupiterAxis);
    // << Saturn >>
    const saturnAxis = new THREE.Group();
    saturn.saturnMesh.position.set(earthDistance * 4.5, 0, 0);
    saturnAxis.add(saturn.saturnMesh);
    saturnAxis.rotateY(2 * Math.PI * 0.8);
    solarSystem.add(saturnAxis);
    // << Uranus >>
    const uranusAxis = new THREE.Group();
    uranus.uranusMesh.position.set(earthDistance * 6, 0, 0);
    uranusAxis.add(uranus.uranusMesh);
    uranusAxis.rotateY(2 * Math.PI * 0.9);
    solarSystem.add(uranusAxis);
    // << Neptune >>
    const neptuneAxis = new THREE.Group();
    neptune.neptuneMesh.position.set(earthDistance * 7.5, 0, 0);
    neptuneAxis.add(neptune.neptuneMesh);
    neptuneAxis.rotateY(2 * Math.PI);
    solarSystem.add(neptuneAxis);
    // << Pluto >>
    const plutoAxis = new THREE.Group();
    pluto.plutoMesh.position.set(earthDistance * 8, 0, 0);
    plutoAxis.add(pluto.plutoMesh);
    solarSystem.add(plutoAxis);
    // << Second Asteroid Belt >>
    // const astroidBelt2 = getAsteroidBelt(earthDistance * 7.5);
    // solarSystem.add(astroidBelt2);
    // << Stars >>
    const stars = getStarfield({ numStars: 5000 });
    scene.add(stars);
    scene.add(solarSystem);
    function animate() {
      mercuryAxis.rotation.y += earthCirculation / 0.2;
      venusAxis.rotation.y += earthCirculation / 0.6;
      earthAxis.rotation.y += earthCirculation;
      marsAxis.rotation.y += earthCirculation / 1.9;
      jupiterAxis.rotation.y += earthCirculation / 11.9;
      saturnAxis.rotation.y += earthCirculation / 29.5;
      uranusAxis.rotation.y += earthCirculation / 84;
      neptuneAxis.rotation.y += earthCirculation / 164.8;
      plutoAxis.rotation.y += earthCirculation / 248;
      astroidBelt1.rotation.y -= earthCirculation / 4;
      mercury.update();
      venus.update();
      earth.update();
      mars.update();
      jupiter.update();
      saturn.update();
      uranus.update();
      neptune.update();
      pluto.update();
      sun.update();
      updateCameraProspective();
      stars.rotateY(0.00002);
      renderer.render(scene, camera);
    }
    function updateCameraProspective() {
      observationObject.getWorldPosition(position);
      control.target.set(position.x, position.y, position.z);
      control.update();
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
        const intersectedObject = intersects[0].object;
        observationObject = intersectedObject;
        console.log(position); // Logs the position in the console
      }
    }
  }, []);
  return <></>;
}

export default App;
