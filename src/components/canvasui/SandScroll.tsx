import { useEffect, useRef, type RefObject } from "react";

interface Grain {
  x: number; // band-local (0..1 across width)
  y: number; // band-local (0..1 across band)
  ox: number;
  oy: number;
  ph: number;
  size: number;
  orange: boolean;
}

/**
 * Cross-browser stand-in for the html-in-canvas ParticleScroll:
 * content dissolves below a "formation line" (68% viewport) via a live
 * CSS mask, and a dense sand cloud fills the transition band. Scrolling
 * up reassembles the page, grain by grain.
 */
export function SandScroll({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const target = targetRef.current;
    if (!canvas || !target) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // effect params (match the demo config)
    const POINT = 0.68;
    const BAND = 420;
    const SPREAD = 220;
    const GRAVITY = 0.35;
    const DRIFT = 0.7;
    const SWIRL = 60;
    const FADE = 0.85;
    const SMOOTHING = 0.35;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let grains: Grain[] = [];
    let raf = 0;
    let smooth = window.scrollY;
    let vel = 0;
    let lastY = window.scrollY;
    let time = 0;
    let last = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      seedGrains();
    };

    const seedGrains = () => {
      const area = w * BAND;
      const count = Math.min(Math.round(area / 2600), 1400);
      grains = [];
      for (let i = 0; i < count; i++) {
        grains.push({
          x: Math.random(),
          y: Math.random(),
          ox: (Math.random() - 0.5) * SPREAD,
          oy:
            (Math.random() - 0.5) * SPREAD * (1 - GRAVITY * 0.5) +
            GRAVITY * SPREAD * 0.25,
          ph: Math.random() * Math.PI * 2,
          size: 1 + Math.random() * 1.6,
          orange: Math.random() < 0.16,
        });
      }
    }

    const setMask = (line: number) => {
      const top = line - BAND * 0.5;
      const bottom = line + BAND * 0.5;
      const g = `linear-gradient(to bottom, #000 ${top}px, transparent ${bottom}px)`;
      target.style.setProperty("-webkit-mask-image", g);
      target.style.setProperty("mask-image", g);
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      time += dt;

      const y = window.scrollY;
      vel = vel * Math.exp(-dt / 0.22) + (y - lastY) * dt * 3;
      lastY = y;
      const k = 1 - Math.exp(-dt / Math.max(SMOOTHING, 1e-4));
      smooth += (y - smooth) * k;

      const line = smooth + POINT * h; // formation line, content coords
      setMask(line);

      // band in viewport coords
      const bandTop = line - smooth - BAND * 0.5;
      const bandBottom = bandTop + BAND;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (bandBottom > 0 && bandTop < h) {
        for (const g of grains) {
          // drift + swirl + scroll push
          const dx = Math.sin(time * (1.3 + (g.ph % 1)) + g.ph) * SWIRL * DRIFT;
          const dy =
            Math.cos(time * (1.1 + (g.ph % 0.7)) + g.ph) * SWIRL * 0.6 * DRIFT +
            vel * 1.5 +
            GRAVITY * 14;
          const px = g.x * w + g.ox + dx;
          const py =
            bandTop + g.y * BAND + g.oy * 0.35 + dy - vel * 0.4;
          if (py < -20 || py > h + 20) continue;
          // fade with distance from band center
          const t = Math.min(
            Math.max((py - (bandTop - 40)) / (BAND + 80), 0),
            1,
          );
          const flicker = 0.55 + 0.45 * Math.sin(time * 9 + g.ph * 7);
          const alpha = FADE * 0.55 * t * flicker;
          if (alpha < 0.02) continue;
          ctx.fillStyle = g.orange
            ? `rgba(255, 85, 0, ${alpha})`
            : `rgba(242, 241, 237, ${alpha * 0.8})`;
          const s = g.size * (0.8 + 0.4 * flicker);
          ctx.fillRect(px, py, s, s);
        }
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
      target.style.removeProperty("-webkit-mask-image");
      target.style.removeProperty("mask-image");
    };
  }, [targetRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 40,
      }}
    />
  );
}

export default SandScroll;
