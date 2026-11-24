import { useEffect, useRef } from "react";
import styles from "../styles/HeroScene.module.css";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Decorative 3D background for the hero.
 * three.js is loaded with a dynamic import after the page has painted, so it
 * never sits in the main bundle or delays the first screen. Without WebGL the
 * component simply renders an empty layer and the CSS gradient shows through.
 */
export default function HeroScene() {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !supportsWebGL()) return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cleanup = null;
    let cancelled = false;

    const boot = () =>
      import("../three/waveField").then(({ createWaveField }) => {
        if (cancelled) return;
        cleanup = createWaveField(container, { reducedMotion });
        container.dataset.ready = "true";
      });

    // Wait for the browser to be idle so the hero text paints first
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(boot, { timeout: 1200 })
      : window.setTimeout(boot, 300);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cleanup?.();
    };
  }, []);

  return <div ref={ref} className={styles.scene} aria-hidden="true" />;
}
