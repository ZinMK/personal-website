import { useEffect, useRef } from "react";

interface Grain {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  orange: boolean;
}

/**
 * Cross-browser sand effect: scrolling kicks up dust grains along a
 * "formation line" at ~68% of the viewport. No experimental APIs —
 * just a canvas overlay and scroll listeners.
 */
export function SandScroll() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let grains: Grain[] = [];
    let raf = 0;
    let lastScroll = window.scrollY;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    };
    resize();

    const spawn = (delta: number) => {
      const strength = Math.min(Math.abs(delta) / 40, 1);
      if (strength < 0.08) return;
      const count = Math.round(strength * 14);
      const line = window.innerHeight * 0.68;
      for (let i = 0; i < count; i++) {
        const maxLife = 0.6 + Math.random() * 0.9;
        grains.push({
          x: Math.random() * window.innerWidth,
          y: line + (Math.random() - 0.5) * 60,
          vx: (Math.random() - 0.5) * 30 * strength,
          vy: (Math.random() * 40 + 10) * strength,
          life: 0,
          maxLife,
          size: 0.8 + Math.random() * 1.6,
          orange: Math.random() < 0.18,
        });
      }
      if (grains.length > 600) grains = grains.slice(-600);
      if (!raf) raf = requestAnimationFrame(frame);
    };

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      grains = grains.filter((g) => g.life < g.maxLife);
      for (const g of grains) {
        g.life += dt;
        g.vy += 60 * dt; // gravity, sand settles
        g.x += g.vx * dt;
        g.y += g.vy * dt;
        g.vx *= 0.98;
        const t = g.life / g.maxLife;
        const alpha = (1 - t) * 0.5;
        ctx.fillStyle = g.orange
          ? `rgba(255, 85, 0, ${alpha})`
          : `rgba(242, 241, 237, ${alpha * 0.7})`;
        ctx.fillRect(g.x, g.y, g.size, g.size);
      }

      if (grains.length) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      spawn(y - lastScroll);
      lastScroll = y;
    };

    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

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
        zIndex: 50,
      }}
    />
  );
}

export default SandScroll;
