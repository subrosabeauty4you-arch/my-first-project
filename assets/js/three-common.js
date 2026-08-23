/*
  Shared Three.js building blocks used by both the Our Story hero scene
  and the interactive Shades page scene, so the "ultra realistic" bottle
  render (glass shell + liquid + cap + soft ground shadow + bloom) only
  has to be built once.
*/
import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

export function createRenderer(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

export function createEnvironment(renderer, scene) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
}

/*
  A soft studio-style radial gradient backdrop (cream -> beige), used as
  scene.background. Post-processing (bloom/OutputPass) forces opaque
  alpha on the canvas, so a transparent canvas isn't an option here —
  this reads as an intentional product-photography backdrop instead.
*/
export function createStudioBackground(cfg) {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 512;
  const ctx = c.getContext("2d");
  const gradient = ctx.createRadialGradient(256, 200, 40, 256, 256, 380);
  gradient.addColorStop(0, cfg.colors.cream);
  gradient.addColorStop(1, cfg.colors.beigeDark);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, c.width, c.height);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createStudioLighting(scene, colors) {
  scene.add(new THREE.AmbientLight(0xfff6e8, 0.5));

  const key = new THREE.DirectionalLight(0xfff1d6, 1.6);
  key.position.set(3, 5, 4);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 1;
  key.shadow.camera.far = 12;
  key.shadow.camera.left = -3;
  key.shadow.camera.right = 3;
  key.shadow.camera.top = 3;
  key.shadow.camera.bottom = -3;
  key.shadow.radius = 4;
  key.shadow.bias = -0.0015;
  scene.add(key);

  const rim = new THREE.PointLight(colors.gold, 5, 12);
  rim.position.set(-3, 1.5, -2);
  scene.add(rim);

  const fill = new THREE.PointLight(colors.goldLight, 2.5, 12);
  fill.position.set(2, -1.5, 2.5);
  scene.add(fill);
}

/* Composer with a light Unreal bloom pass for glossy specular polish. */
export function createComposer(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.32, 0.45, 0.88);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  return {
    composer,
    setSize(w, h) {
      composer.setSize(w, h);
      bloom.setSize(w, h);
    },
  };
}

/* Soft, realistic drop shadow under the bottle via a real shadow-catching plane. */
export function createGroundShadow(scene) {
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(2.4, 64),
    new THREE.ShadowMaterial({ opacity: 0.22 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1.28;
  ground.receiveShadow = true;
  scene.add(ground);
  return ground;
}

function makeLabelTexture(cfg) {
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

/*
  Builds the gloss tube: an outer transmissive glass shell around an inner
  liquid cylinder (so the liquid color reads through the glass like a real
  gloss tube), a metallic cap, and a label. Returns handles for animating
  the liquid color (used by the interactive shade picker).
*/
export function createBottle(THREE_NS, cfg, initialColorHex) {
  const group = new THREE.Group();

  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(initialColorHex),
    transmission: 0,
    roughness: 0.16,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.42, 2.05, 64), liquidMat);
  liquid.castShadow = true;
  group.add(liquid);

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    transmission: 0.95,
    roughness: 0.035,
    thickness: 0.35,
    ior: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    transparent: true,
  });
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.5, 2.3, 64), glassMat);
  glass.castShadow = true;
  group.add(glass);

  const capMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(cfg.colors.gold),
    metalness: 1,
    roughness: 0.22,
  });

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.85, 64), capMat);
  cap.position.y = 1.55;
  cap.castShadow = true;
  group.add(cap);

  const capTop = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2),
    capMat
  );
  capTop.position.y = 1.97;
  capTop.castShadow = true;
  group.add(capTop);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.565, 0.03, 16, 64), capMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 1.12;
  group.add(ring);

  const base = typeof SUBROSA_BASE !== "undefined" ? SUBROSA_BASE : "./";
  let labelMat;
  if (cfg.product.labelImage) {
    labelMat = new THREE.MeshBasicMaterial({ transparent: true });
    new THREE.TextureLoader().load(base + cfg.product.labelImage, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      labelMat.map = tex;
      labelMat.needsUpdate = true;
    });
  } else {
    labelMat = new THREE.MeshBasicMaterial({ map: makeLabelTexture(cfg), transparent: true });
  }
  const label = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.85), labelMat);
  label.position.set(0, 0, 0.57);
  group.add(label);

  group.rotation.x = 0.05;
  group.position.y = -0.15;

  return {
    group,
    liquid,
    setColor(hex, { animate = true } = {}) {
      const target = new THREE.Color(hex);
      if (!animate || typeof gsap === "undefined") {
        liquidMat.color.copy(target);
        return;
      }
      gsap.to(liquidMat.color, {
        r: target.r,
        g: target.g,
        b: target.b,
        duration: 0.7,
        ease: "power2.out",
      });
    },
  };
}
