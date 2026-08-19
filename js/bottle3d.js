import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const canvas = document.getElementById("bottle-canvas");
if (canvas) {
  const stage = document.getElementById("bottle-stage");

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0.15, 6.2);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  /* ---------- Lighting ---------- */
  const key = new THREE.DirectionalLight(0xfff2da, 2.2);
  key.position.set(3, 4, 5);
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xffd9b0, 0.5);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const fill = new THREE.HemisphereLight(0xfff4e0, 0x2a1420, 0.55);
  scene.add(fill);

  /* ---------- Brand label texture ---------- */
  function makeLabelTexture() {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 512;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.save();
    ctx.translate(c.width / 2, c.height / 2);
    ctx.fillStyle = "#f0d9a8";
    ctx.font = "42px 'Marcellus', Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.letterSpacing = "6px";
    ctx.fillText("LUEUR", 0, 0);
    ctx.restore();
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  /* ---------- Bottle group ---------- */
  const bottle = new THREE.Group();

  // Glass outer body (tapered tube)
  const bodyGeo = new THREE.CylinderGeometry(0.62, 0.5, 2.5, 48, 1, true);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.04,
    transmission: 0.95,
    thickness: 0.4,
    ior: 1.45,
    transparent: true,
    envMapIntensity: 1.4,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.1;
  bottle.add(body);

  // Glass bottom cap
  const bottomGeo = new THREE.CircleGeometry(0.5, 48);
  const bottomMesh = new THREE.Mesh(bottomGeo, bodyMat);
  bottomMesh.rotation.x = Math.PI / 2;
  bottomMesh.position.y = 0.1 - 1.25;
  bottle.add(bottomMesh);

  // Gloss liquid inside
  const liquidGeo = new THREE.CylinderGeometry(0.54, 0.44, 2.15, 48);
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0xd97a8a,
    metalness: 0,
    roughness: 0.15,
    transmission: 0.55,
    thickness: 1,
    ior: 1.4,
    transparent: true,
    envMapIntensity: 1.2,
  });
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.position.y = 0.02;
  bottle.add(liquid);

  // Label
  const labelMat = new THREE.MeshBasicMaterial({ map: makeLabelTexture(), transparent: true });
  const labelGeo = new THREE.CylinderGeometry(0.635, 0.635, 1, 48, 1, true);
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.scale.set(1, 0.55, 1);
  label.position.y = -0.15;
  bottle.add(label);

  // Gold neck ring
  const goldMat = new THREE.MeshStandardMaterial({ color: 0xcda86a, metalness: 1, roughness: 0.25, envMapIntensity: 1.6 });
  const ringGeo = new THREE.CylinderGeometry(0.64, 0.64, 0.14, 48);
  const ring = new THREE.Mesh(ringGeo, goldMat);
  ring.position.y = 1.35 + 0.07;
  bottle.add(ring);

  // Cap (gold, slightly domed)
  const capGeo = new THREE.CylinderGeometry(0.58, 0.62, 1.35, 48);
  const cap = new THREE.Mesh(capGeo, goldMat);
  cap.position.y = 1.35 + 0.14 + 0.675;
  bottle.add(cap);

  const capTopGeo = new THREE.SphereGeometry(0.58, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2);
  const capTop = new THREE.Mesh(capTopGeo, goldMat);
  capTop.position.y = cap.position.y + 0.675;
  bottle.add(capTop);

  // Thin gold accent line at cap base
  const accentGeo = new THREE.TorusGeometry(0.605, 0.012, 12, 48);
  const accent = new THREE.Mesh(accentGeo, goldMat);
  accent.rotation.x = Math.PI / 2;
  accent.position.y = cap.position.y - 0.675 + 0.1;
  bottle.add(accent);

  bottle.rotation.x = 0.08;
  bottle.position.y = -0.15;
  bottle.scale.setScalar(1.0);
  scene.add(bottle);

  /* ---------- Interaction: rotate toward mouse position ---------- */
  let targetRotY = 0.4;
  let targetRotX = bottle.rotation.x;
  let currentRotY = targetRotY;
  let currentRotX = targetRotX;
  let idleTime = 0;
  let pointerActive = false;

  function onPointerMove(clientX, clientY) {
    const rect = stage.getBoundingClientRect();
    const nx = (clientX - rect.left) / rect.width - 0.5;
    const ny = (clientY - rect.top) / rect.height - 0.5;
    targetRotY = 0.4 + nx * 2.4;
    targetRotX = 0.08 + ny * 0.5;
    idleTime = 0;
    pointerActive = true;
  }

  window.addEventListener("mousemove", (e) => onPointerMove(e.clientX, e.clientY));
  stage.addEventListener(
    "touchmove",
    (e) => {
      if (e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: true }
  );
  stage.addEventListener("mouseleave", () => { pointerActive = false; });

  /* ---------- Resize ---------- */
  function resize() {
    const rect = stage.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / rect.height;
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(stage);
  resize();

  /* ---------- Visibility pause ---------- */
  let isVisible = true;
  const aboutPage = document.getElementById("page-1");
  if (aboutPage) {
    new IntersectionObserver(
      (entries) => entries.forEach((entry) => { isVisible = entry.isIntersecting; }),
      { threshold: 0.1 }
    ).observe(aboutPage);
  }

  /* ---------- Render loop ---------- */
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;
    const dt = clock.getDelta();

    if (!pointerActive) {
      idleTime += dt;
      targetRotY += dt * 0.18; // gentle auto-rotate when idle
    }

    currentRotY += (targetRotY - currentRotY) * Math.min(1, dt * 3.2);
    currentRotX += (targetRotX - currentRotX) * Math.min(1, dt * 3.2);
    bottle.rotation.y = currentRotY;
    bottle.rotation.x = currentRotX;
    bottle.position.y = -0.15 + Math.sin(clock.elapsedTime * 0.8) * 0.03;

    renderer.render(scene, camera);
  }
  animate();
}
