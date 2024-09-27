import { useEffect, useState } from "react";
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
  const observationEntities = [
    "Sun",
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
  ];
  const [ID, setID] = useState<number>(0);
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
    const astroidBelt1 = getAsteroidBelt(earthDistance * 2.3, 100, 0.2);
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
    saturnAxis.rotateY(2 * Math.PI * 1.1);
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
      mercuryAxis.rotation.y -= earthCirculation / 0.2;
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
        if (intersectedObject == mercury.mercuryMesh) setID(1);
        else if (intersectedObject == venus.venusMesh) setID(2);
        else if (intersectedObject == earth.earthGroup) setID(3);
        else if (intersectedObject == mars.marsMesh) setID(4);
        else if (intersectedObject == jupiter.jupiterMesh) setID(5);
        else if (intersectedObject == saturn.saturnMesh) setID(6);
        else if (intersectedObject == uranus.uranusMesh) setID(7);
        else if (intersectedObject == neptune.neptuneMesh) setID(8);
        else if (intersectedObject == pluto.plutoMesh) setID(9);
        else setID(0);
        console.log(position); // Logs the position in the console
      }
    }
  }, []);
  return (
    <div className="bg-transparent w-full h-12 p-3 grid justify-start md:justify-center absolute">
      <div className="flex space-x-4 justify-center items-center">
        <button
          className="flex items-center justify-center shrink-0  w-10 h-10 rounded-full hover:color-white"
          onClick={() =>
            setID((x) => {
              if (x > 0) return x - 1;
              else return observationEntities.length - 1;
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 fill-gray-400"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </button>
        <span className="text-xl w-16 text-center text-white font-bold">
          {observationEntities[ID]}
        </span>
        <button
          className="flex items-center justify-center shrink-0 ml-2  w-10 h-10 rounded-full hover:color-white"
          onClick={() =>
            setID((x) => {
              if (x < observationEntities.length - 1) return x + 1;
              else return 0;
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 fill-gray-400 rotate-180"
            viewBox="0 0 55.753 55.753"
          >
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
