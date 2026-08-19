/*
  3D gloss tube built from primitives (no external 3D model needed),
  plus a drifting field of gold particles for ambient motion.

  The label text on the bottle is drawn from config.js — if you later
  add a real product photo/label image, set `product.labelImage` in
  config.js to its path and it will be used instead automatically.
*/
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const cfg = SUBROSA_CONFIG;
const container = document.getElementById("hero-scene");
const canvas = document.getElementById("gloss-canvas");

// ---------- renderer / scene / camera ----------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
camera.position.set(0, 0.3, 6);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

// ---------- lights ----------
scene.add(new THREE.AmbientLight(0xfff6e8, 0.55));

const key = new THREE.DirectionalLight(0xfff1d6, 1.3);
key.position.set(3, 4, 5);
scene.add(key);

const rim = new THREE.PointLight(cfg.colors.gold, 5, 12);
rim.position.set(-3, 1, -2);
scene.add(rim);

const fill = new THREE.PointLight(cfg.colors.goldLight, 3, 12);
fill.position.set(2, -2, 2);
scene.add(fill);

// ---------- label texture (canvas-drawn, from config) ----------
function makeLabelTexture() {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d");

  ctx.clearRect(0, 0, c.width, c.height);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillStyle = cfg.colors.gold;
  ctx.font = "600 60px 'Cormorant Garamond', serif";
  ctx.fillText(cfg.product.labelLine1, c.width / 2, c.height / 2 - 40);

  ctx.fillStyle = cfg.colors.ink;
  ctx.font = "300 26px 'Inter', sans-serif";
  ctx.letterSpacing = "4px";
  ctx.fillText(cfg.product.labelLine2, c.width / 2, c.height / 2 + 30);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildLabelMaterial(onReady) {
  if (cfg.product.labelImage) {
    new THREE.TextureLoader().load(
      cfg.product.labelImage,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        onReady(new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
      },
      undefined,
      () => onReady(new THREE.MeshBasicMaterial({ map: makeLabelTexture(), transparent: true }))
    );
  } else {
    onReady(new THREE.MeshBasicMaterial({ map: makeLabelTexture(), transparent: true }));
  }
}

// ---------- gloss tube group ----------
const gloss = new THREE.Group();
scene.add(gloss);

const bodyMat = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#f3e6d2"),
  transmission: 0.85,
  roughness: 0.12,
  thickness: 0.6,
  ior: 1.4,
  clearcoat: 1,
  clearcoatRoughness: 0.08,
  transparent: true,
});

const body = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.5, 2.3, 64), bodyMat);
gloss.add(body);

const capMat = new THREE.MeshStandardMaterial({
  color: new THREE.Color(cfg.colors.gold),
  metalness: 1,
  roughness: 0.25,
});

const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.85, 64), capMat);
cap.position.y = 1.55;
gloss.add(cap);

const capTop = new THREE.Mesh(new THREE.SphereGeometry(0.6, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2), capMat);
capTop.position.y = 1.97;
gloss.add(capTop);

const ring = new THREE.Mesh(new THREE.TorusGeometry(0.565, 0.03, 16, 64), capMat);
ring.rotation.x = Math.PI / 2;
ring.position.y = 1.12;
gloss.add(ring);

buildLabelMaterial((labelMat) => {
  const label = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.85), labelMat);
  label.position.set(0, 0, 0.57);
  gloss.add(label);
});

gloss.rotation.x = 0.05;

// ---------- drifting gold particles ----------
const PARTICLE_COUNT = 140;
const positions = new Float32Array(PARTICLE_COUNT * 3);
for (let i = 0; i < PARTICLE_COUNT; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 9;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
}
const particleGeo = new THREE.BufferGeometry();
particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
const particleMat = new THREE.PointsMaterial({
  color: new THREE.Color(cfg.colors.gold),
  size: 0.035,
  transparent: true,
  opacity: 0.55,
  sizeAttenuation: true,
});
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

// ---------- controls ----------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2.2;
controls.minPolarAngle = Math.PI / 2 - 0.5;
controls.maxPolarAngle = Math.PI / 2 + 0.4;
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0, 0);

// ---------- resize ----------
function resize() {
  const { clientWidth: w, clientHeight: h } = container;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(container);
resize();

// ---------- animate ----------
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  controls.update();
  particles.rotation.y = t * 0.02;
  particles.position.y = Math.sin(t * 0.15) * 0.15;
  renderer.render(scene, camera);
}
animate();
