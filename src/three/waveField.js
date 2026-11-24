import {
  BufferAttribute,
  BufferGeometry,
  Color,
  PerspectiveCamera,
  Plane,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
  AdditiveBlending,
} from "three";

/*
  Particle wave field for the hero background.

  All motion happens in the vertex shader, so the CPU only updates a handful
  of uniforms per frame no matter how many points there are.
*/

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;     // pointer position on the plane (world x, z)
  uniform float uMouseOn;   // 0..1, eased so the ripple fades in and out
  uniform float uPixelRatio;
  uniform float uSize;

  varying float vHeight;
  varying float vFade;
  varying float vSide;

  void main() {
    vec3 p = position;

    // Two crossing swells
    float wave =
        sin(p.x * 0.28 + uTime * 0.8) * 0.75 +
        cos(p.z * 0.42 + uTime * 0.6) * 0.55 +
        sin((p.x + p.z) * 0.16 + uTime * 0.35) * 0.45;

    // Ripple under the pointer
    float d = distance(p.xz, uMouse);
    float ripple = sin(d * 1.4 - uTime * 3.2) * exp(-d * d * 0.045) * 0.9 * uMouseOn;

    p.y += wave + ripple;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // Perspective-correct point size
    gl_PointSize = uSize * uPixelRatio * (16.0 / -mv.z);

    vHeight = wave + ripple;
    vSide = p.x;
    // Fade the far rows into the background
    vFade = 1.0 - smoothstep(14.0, 34.0, -mv.z);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform float uOpacity;

  varying float vHeight;
  varying float vFade;
  varying float vSide;

  void main() {
    // Round, soft-edged points
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, r);

    // Orange on the crests and to the right, cyan in the troughs and to the left
    float mixer = clamp(0.5 + vHeight * 0.45 + vSide * 0.012, 0.0, 1.0);
    vec3 color = mix(uColorB, uColorA, mixer);

    float alpha = soft * uOpacity * (0.45 + 0.55 * clamp(0.6 + vHeight * 0.5, 0.0, 1.0));
    gl_FragColor = vec4(color, alpha * vFade);
  }
`;

export function createWaveField(container, { reducedMotion = false } = {}) {
  const small = window.matchMedia("(max-width: 768px)").matches;
  const COLS = small ? 100 : 180;
  const ROWS = small ? 60 : 90;
  const WIDTH = 60;
  const DEPTH = 32;

  const renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(55, 1, 0.1, 100);
  const baseCam = new Vector3(0, 4.2, 9);
  const lookAt = new Vector3(0, 0.6, -8);
  camera.position.copy(baseCam);
  camera.lookAt(lookAt);

  // Grid of points on the XZ plane
  const positions = new Float32Array(COLS * ROWS * 3);
  let i = 0;
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      positions[i++] = (col / (COLS - 1) - 0.5) * WIDTH;
      positions[i++] = 0;
      positions[i++] = (row / (ROWS - 1) - 0.5) * DEPTH - 12;
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(positions, 3));

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new Vector2(999, 999) },
    uMouseOn: { value: 0 },
    uPixelRatio: { value: renderer.getPixelRatio() },
    uSize: { value: small ? 8 : 6.5 },
    uColorA: { value: new Color("#f97316") },
    uColorB: { value: new Color("#22d3ee") },
    uOpacity: { value: 0.78 },
  };

  const material = new ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  const points = new Points(geometry, material);
  scene.add(points);

  // Pointer -> plane position for the ripple, and a little camera parallax
  const raycaster = new Raycaster();
  const ndc = new Vector2();
  const plane = new Plane(new Vector3(0, 1, 0), 0);
  const hit = new Vector3();
  const mouseTarget = new Vector2(999, 999);
  const parallax = new Vector2();
  let pointerInside = false;

  const onPointerMove = (event) => {
    const rect = container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    pointerInside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
    if (!pointerInside) return;

    ndc.set(x * 2 - 1, -(y * 2 - 1));
    parallax.set(ndc.x, ndc.y);
    raycaster.setFromCamera(ndc, camera);
    if (raycaster.ray.intersectPlane(plane, hit)) {
      mouseTarget.set(hit.x, hit.z);
    }
  };
  const onPointerLeave = () => {
    pointerInside = false;
  };

  if (!reducedMotion) {
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);
  }

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the field filling the width on tall/narrow screens
    camera.fov = w / h < 1 ? 70 : 55;
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  // Render loop - only runs while the hero is on screen and the tab is visible
  let frame = 0;
  let running = false;
  let last = performance.now();

  const render = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    uniforms.uTime.value += dt;

    const on = pointerInside ? 1 : 0;
    uniforms.uMouseOn.value += (on - uniforms.uMouseOn.value) * Math.min(dt * 3, 1);
    uniforms.uMouse.value.lerp(mouseTarget, Math.min(dt * 6, 1));

    camera.position.x += (baseCam.x + parallax.x * 1.6 - camera.position.x) * Math.min(dt * 2, 1);
    camera.position.y += (baseCam.y + parallax.y * 0.8 - camera.position.y) * Math.min(dt * 2, 1);
    camera.lookAt(lookAt);

    renderer.render(scene, camera);
    if (running) frame = requestAnimationFrame(render);
  };

  const start = () => {
    if (running || reducedMotion) return;
    running = true;
    last = performance.now();
    frame = requestAnimationFrame(render);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };

  if (reducedMotion) {
    // One still frame: the depth and colour without the movement
    uniforms.uTime.value = 2.4;
    renderer.render(scene, camera);
  }

  const visibility = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !document.hidden) start();
    else stop();
  });
  visibility.observe(container);

  const onVisibilityChange = () => {
    if (document.hidden) stop();
    else if (container.getBoundingClientRect().bottom > 0) start();
  };
  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    stop();
    visibility.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerleave", onPointerLeave);
    geometry.dispose();
    material.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
