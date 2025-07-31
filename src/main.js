import "./styles/style.scss";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import GUI from "lil-gui";

// const gui = new GUI();

const loadingManager = new THREE.LoadingManager();
const loader = new GLTFLoader(loadingManager);
loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
  console.log(
    "Loading file: " +
      url +
      ".\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};
let shoe = null;

// loader.load(
//   "/sport_shoe_gltf/scene.gltf",
//   function (gltf) {
//     shoe = gltf.scene;
//     shoe.position.y = 0.75;
//     shoe.rotation.y = (-Math.PI * 7) / 8;
//     shoe.rotation.z = -Math.PI / 8;
//     scene.add(gltf.scene);
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );

// loader.load(
//   "/shoe_1_gltf/scene.gltf",
//   function (gltf) {
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );
// loader.load(
//   "/shoe_2_gltf/scene.gltf",
//   function (gltf) {
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );
// loader.load(
//   "/shoe_3_gltf/scene.gltf",
//   function (gltf) {
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );
// loader.load(
//   "/shoe_4_gltf/scene.gltf",
//   function (gltf) {
//   },
//   undefined,
//   function (error) {
//     console.error(error);
//   }
// );

const dataShoes = [
  {
    position: { x: 1.1, y: -1.4, z: -0.6 },
    rotation: { x: 0.753, y:-1.05, z: 0.56 },
    scale: { x: 1.15, y: 1.15, z: 1.15 },
    light: null,
  },
  {
    position: { x: 0.8, y: -1.3, z: 0 },
    rotation: { x: -2.01, y: -2.06, z: -2.26 },
    scale: { x: 23, y: 23, z: 23 },
    light: null,
  },
  {
    position: { x: -0.25, y: 0, z: 0 },
    rotation: { x: 0.942, y: -0.992, z: 0.879 },
    scale: { x: 4, y: 4, z: -4 },
    light: null,
  },
  {
    position: { x: 0.7, y: -1.6, z: 0 },
    rotation: { x: 0, y: 0.251, z: 0.42 },
    scale: { x: 0.265, y: 0.265, z: 0.265 },
    light: null,
  },
  {
    position: { x: 0, y: 0.75, z: 0 },
    // rotation: { x: 0, y: (-Math.PI * 7) / 8, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: (-Math.PI * 7) / 8, z: -Math.PI / 8 },
    light: null,
  },
  {
    position: { x: -0.5, y: 0.9, z: 0 },
    // rotation: { x: 0, y: -Math.PI * 5 / 12, z: 0 },
    rotation: { x: 1.05, y: -1.03, z: 0.98 },
    scale: { x: 11.7, y: 11.7, z: 11.7 },
    light: 1,
  },
];
function loadShoe(index) {
  const folder = `/shoe_${index}_gltf/`;   // Folder containing .gltf + textures
  const file = 'scene.gltf';
  loader.setPath(folder); // Important: sets path for ALL assets (GLTF + textures)
  
  loader.load(
    file,
    function (gltf) {
      // let shoeGroup = new THREE.Group();
      shoe = gltf.scene;
      console.log(dataShoes[index]);
      shoe.position.set(
        dataShoes[index - 1].position.x,
        dataShoes[index - 1].position.y,
        dataShoes[index - 1].position.z
      );
      shoe.rotation.set(
          dataShoes[index - 1].rotation.x,
          dataShoes[index - 1].rotation.y,
          dataShoes[index - 1].rotation.z
        );
        // shoe.rotateOnWorldAxis(new THREE.Vector3(Math.PI, 0, 0), 0.01);
        shoe.scale.set(
          dataShoes[index - 1].scale.x,
          dataShoes[index - 1].scale.y,
          dataShoes[index - 1].scale.z
        );
        // scene.add(shoe);
        scene.add(shoe);
        // shoeGroup.add(shoe);
        document.querySelector("body").dataset.shoe = index;
        const axesHelper = new THREE.AxesHelper(4); // size = 1 unit
        // shoe.add(axesHelper);

//         const rotationFolder = gui.addFolder('Shoe Rotation');
// rotationFolder.add(shoe.position, 'x', -10, 10, 0.1).name('X Axis');
// rotationFolder.add(shoe.position, 'y', -10, 10, 0.1).name('Y Axis');
// rotationFolder.add(shoe.position, 'z', -10, 10, 0.1).name('Z Axis');
// rotationFolder.add(shoe.rotation, 'x', -Math.PI, Math.PI).name('X Axis');
// rotationFolder.add(shoe.rotation, 'y', -Math.PI, Math.PI).name('Y Axis');
// rotationFolder.add(shoe.rotation, 'z', -Math.PI, Math.PI).name('Z Axis');
// rotationFolder.open();
      },
      undefined,
      function (error) {
        console.error(error);
      }
  );
}

// loadShoe(1);
loadShoe(1);

const productItems = document.querySelectorAll(".products-list-item");

productItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    console.log(event.currentTarget.dataset.index);
    scene.remove(shoe);
    loadShoe(event.currentTarget.dataset.index);
  });
});

const scene = new THREE.Scene();

const ambientLight = new THREE.AmbientLight("#ffffff", 3);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
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
