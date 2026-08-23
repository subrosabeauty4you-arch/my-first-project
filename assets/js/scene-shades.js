/*
  Interactive shade-picker 3D bottle for /shades/. Clicking a swatch in the
  page (content-shades.js) dispatches a "subrosa:selectShade" event on
  document with the hex color; this scene tweens the liquid to match.
*/
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import {
  createRenderer,
  createEnvironment,
  createStudioLighting,
  createComposer,
  createGroundShadow,
  createBottle,
  createStudioBackground,
} from "./three-common.js";

const cfg = SUBROSA_CONFIG;
const container = document.getElementById("shade-scene");
const canvas = document.getElementById("shade-canvas");
if (container && canvas) {
  const renderer = createRenderer(canvas);
  const scene = new THREE.Scene();
  scene.background = createStudioBackground(cfg);
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0.3, 6.4);

  createEnvironment(renderer, scene);
  createStudioLighting(scene, cfg.colors);
  createGroundShadow(scene);

  const bottle = createBottle(THREE, cfg, cfg.shades[0].swatch);
  scene.add(bottle.group);

  const { setSize, composer } = createComposer(renderer, scene, camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.4;
  controls.minPolarAngle = Math.PI / 2 - 0.45;
  controls.maxPolarAngle = Math.PI / 2 + 0.35;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  document.addEventListener("subrosa:selectShade", (e) => {
    bottle.setColor(e.detail.color);
    controls.autoRotate = false;
    gsap.to(bottle.group.rotation, { y: bottle.group.rotation.y + Math.PI * 2, duration: 1.1, ease: "power2.out" });
  });

  function resize() {
    const { clientWidth: w, clientHeight: h } = container;
    renderer.setSize(w, h, false);
    setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  (function animate() {
    requestAnimationFrame(animate);
    controls.update();
    composer.render();
  })();
}
