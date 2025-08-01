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

const dataShoes = [
  {
    name: "Nike Journey Run",
    price: 120,
    position: { x: 1.1, y: -1.4, z: -0.6 },
    rotation: { x: 0.753, y: -1.05, z: 0.56 },
    scale: { x: 1.15, y: 1.15, z: 1.15 },
    light: 4,
  },
  {
    name: "Nike Air Max 90",
    price: 245,
    position: { x: 0.8, y: -1.3, z: 0 },
    rotation: { x: -2.01, y: -2.06, z: -2.26 },
    scale: { x: 23, y: 23, z: 23 },
    light: 4,
  },
  {
    name: "Nike Air Zoom Pegasus 36",
    price: 180,
    position: { x: -0.25, y: 0, z: 0 },
    rotation: { x: 0.942, y: -0.992, z: 0.879 },
    scale: { x: 4, y: 4, z: -4 },
    light: 4,
  },
  {
    name: "Nike Air Zoom Citizen",
    price: 150,
    position: { x: 0.7, y: -1.6, z: 0 },
    rotation: { x: 0, y: 0.251, z: 0.42 },
    scale: { x: 0.265, y: 0.265, z: 0.265 },
    light: 4,
  },
  {
    name: "Nike Air Jordan",
    price: 295,
    position: { x: 0, y: 0.75, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    rotation: { x: 0, y: (-Math.PI * 7) / 8, z: -Math.PI / 8 },
    light: 4,
  },
  {
    name: "Nike TC 7900 Sail",
    price: 225,
    position: { x: -0.5, y: 0.9, z: 0 },
    rotation: { x: 1.05, y: -1.03, z: 0.98 },
    scale: { x: 11.7, y: 11.7, z: 11.7 },
    light: 0.5,
  },
];

function loadShoe(index) {
  document.querySelector(".products").classList.add("loading");
  
  const folder = `/shoe_${index}_gltf/`; // Folder containing .gltf + textures
  const file = "scene.gltf";
  loader.setPath(folder); // Important: sets path for ALL assets (GLTF + textures)
  loader.load(
    file,
    function (gltf) {
      shoe = gltf.scene;
      const dataShoe = dataShoes[index - 1];
      shoe.position.set(
        dataShoe.position.x,
        dataShoe.position.y,
        dataShoe.position.z
      );
      shoe.rotation.set(
        dataShoe.rotation.x,
        dataShoe.rotation.y,
        dataShoe.rotation.z
      );
      shoe.scale.set(dataShoe.scale.x, dataShoe.scale.y, dataShoe.scale.z);
      directionalLight.intensity = dataShoe.light;
      scene.add(shoe);
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
      document.querySelector(".products").classList.remove("loading");
    },
    undefined,
    function (error) {
      document.querySelector(".products").classList.remove("loading");
      console.error(error);
    }
  );
}

loadShoe(1);

const productItems = document.querySelectorAll(".products-list-item");

productItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    scene.remove(shoe);
    loadShoe(event.currentTarget.dataset.index);
  });
});

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
if (window.innerWidth < 640) {
  camera.position.z = 11;
} else {
  camera.position.z = 8;
}
camera.position.x = 0;

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = canvasContainer.clientWidth;
  sizes.height = canvasContainer.clientHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  if (window.innerWidth < 640) {
  camera.position.z = 11;
} else {
  camera.position.z = 8;
}

console.log(camera.position);

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

const updateArrowVisibility = () => {
  const scrollLeft = productsList.scrollLeft;
  const maxScrollLeft = productsList.scrollWidth - productsList.clientWidth;

  if (scrollLeft <= 10) {
    btnLeft.classList.add("hidden");
  } else {
    btnLeft.classList.remove("hidden");
  }

  if (scrollLeft >= maxScrollLeft - 10) {
    btnRight.classList.add("hidden");
  } else {
    btnRight.classList.remove("hidden");
  }
};

const productsList = document.querySelector(".products-list");
const btnLeft = document.querySelector(".products-arrow.left");
const btnRight = document.querySelector(".products-arrow.right");

const scrollAmount = 400; // pixels to scroll per click

let scrollTimeout;
productsList.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(updateArrowVisibility, 100);
});
window.addEventListener("resize", updateArrowVisibility);
updateArrowVisibility(); // Run once at load

btnLeft.addEventListener("click", () => {
  productsList.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

btnRight.addEventListener("click", () => {
  productsList.scrollBy({ left: scrollAmount, behavior: "smooth" });
});
