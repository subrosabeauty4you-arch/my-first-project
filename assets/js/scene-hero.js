/*
  Decorative 3D bottle for the Our Story hero. Drag to rotate; auto-rotates
  gently otherwise. See three-common.js for the actual bottle/lighting build.
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
const container = document.getElementById("hero-scene");
const canvas = document.getElementById("gloss-canvas");
if (container && canvas) {
  const renderer = createRenderer(canvas);
  const scene = new THREE.Scene();
  scene.background = createStudioBackground(cfg);
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.set(0, 0.3, 6);

  createEnvironment(renderer, scene);
  createStudioLighting(scene, cfg.colors);
  createGroundShadow(scene);

  const bottle = createBottle(THREE, cfg, cfg.shades[0].swatch);
  scene.add(bottle.group);

  const PARTICLE_COUNT = 140;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeo,
    new THREE.PointsMaterial({
      color: new THREE.Color(cfg.colors.gold),
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    })
  );
  scene.add(particles);

  const { setSize, composer } = createComposer(renderer, scene, camera);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2.2;
  controls.minPolarAngle = Math.PI / 2 - 0.5;
  controls.maxPolarAngle = Math.PI / 2 + 0.4;
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;

  function resize() {
    const { clientWidth: w, clientHeight: h } = container;
    renderer.setSize(w, h, false);
    setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(container);
  resize();

  const clock = new THREE.Clock();
  (function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();
    controls.update();
    particles.rotation.y = t * 0.02;
    particles.position.y = Math.sin(t * 0.15) * 0.15;
    composer.render();
  })();
}
