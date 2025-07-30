import "./styles/style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
let shoe = null;

loader.load(
  "/sport_shoe_gltf/scene.gltf",
  function (gltf) {
    shoe = gltf.scene;
    shoe.position.y = 0.75;
    shoe.rotation.y = (-Math.PI * 7) / 8;
    shoe.rotation.z = -Math.PI / 8;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight("#ffffff", 3);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
scene.add(directionalLight);

/**
 * Sizes
 */
const canvasContainer = document.querySelector(".canvas-container");
const sizes = {
  width: canvasContainer.clientWidth,
  height: canvasContainer.clientHeight,
};
console.log(sizes);

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#webgl"),
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// document.body.appendChild(renderer.domElement);

camera.position.z = 8;
camera.position.x = 0;

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = canvasContainer.clientWidth;
  sizes.height = canvasContainer.clientHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.02;

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // const deltaTime = elapsedTime - previousTime;
  //  if (shoe) {
  //   shoe.rotation.y = elapsedTime * 0.5; // Rotate smoothly
  // }
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

