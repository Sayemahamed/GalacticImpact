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
import information from "./informations.json";
interface CelestialBody {
  Name: string;
  Type?: string;
  Position?: number;
  Mass?: string;
  Diameter?: string;
  Gravity?: string;
  OrbitalPeriod?: string;
  MeanTemperature?: string;
  Size?: string;
  CloseApproachDate?: string;
  ChanceOfImpact?: string;
}
function App() {
  const observationEntities = [
    "Sun",
    "Mercury",
    "Venus",
    "Earth",
    "Moon",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
  ];
  const [ID, setID] = useState<number>(0);
  useEffect(() => {
    let objectId = 0;
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
      if (objectId == 0) sun.sun.getWorldPosition(position);
      else if (objectId == 1) mercury.mercuryMesh.getWorldPosition(position);
      else if (objectId == 2) venus.venusMesh.getWorldPosition(position);
      else if (objectId == 3) earth.earthGroup.getWorldPosition(position);
      else if (objectId == 4)
        earth.earthGroup.children[4].children[0].getWorldPosition(position);
      else if (objectId == 5) mars.marsMesh.getWorldPosition(position);
      else if (objectId == 6) jupiter.jupiterMesh.getWorldPosition(position);
      else if (objectId == 7) saturn.saturnMesh.getWorldPosition(position);
      else if (objectId == 8) uranus.uranusMesh.getWorldPosition(position);
      else if (objectId == 9) neptune.neptuneMesh.getWorldPosition(position);
      else if (objectId == 10) pluto.plutoMesh.getWorldPosition(position);
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
    const updateObjectId = (value: number) => {
      objectId = value;
      if (objectId < 0) objectId = 0;
      else if (objectId > observationEntities.length - 1)
        objectId = observationEntities.length - 1;
      setID(objectId);
      console.log(objectId);
    };
    document
      .getElementById("increment")
      ?.addEventListener("click", () => updateObjectId(objectId + 1));
    document
      .getElementById("decrement")
      ?.addEventListener("click", () => updateObjectId(objectId - 1));
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
        if (intersectedObject == mercury.mercuryMesh) {
          updateObjectId(1);
        } else if (intersectedObject == venus.venusMesh) {
          updateObjectId(2);
        } else if (intersectedObject == earth.earthGroup) {
          updateObjectId(3);
        } else if (
          intersectedObject == earth.earthGroup.children[4].children[0]
        ) {
          updateObjectId(4);
        } else if (intersectedObject == mars.marsMesh) {
          updateObjectId(5);
        } else if (intersectedObject == jupiter.jupiterMesh) {
          updateObjectId(6);
        } else if (intersectedObject == saturn.saturnMesh) {
          updateObjectId(7);
        } else if (intersectedObject == uranus.uranusMesh) {
          updateObjectId(8);
        } else if (intersectedObject == neptune.neptuneMesh) {
          updateObjectId(9);
        } else if (intersectedObject == pluto.plutoMesh) {
          updateObjectId(10);
        } else {
          updateObjectId(0);
        }
      }
    }
  }, []);
  return (
    <>
      <div className="bg-transparent w-full h-12 p-3 grid justify-center absolute select-none">
        <div className="flex space-x-4 justify-center items-center">
          <button
            className="flex items-center justify-center shrink-0  w-10 h-10 rounded-full hover:color-white"
            id="decrement"
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
            id="increment"
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
      <div className="select-none">
        {information.map(
          (info: CelestialBody, index) =>
            index === ID && (
              <div className="absolute top-5 text-white left-4 ">
                {Object.keys(info).map((key, keyIndex) => (
                  <div>
                    <span className="font-bold">{key} : </span>
                    {Object.values(info)[keyIndex]}
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </>
  );
}

export default App;
