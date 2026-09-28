const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=<>/\\";

function scrambleIn(el: HTMLElement, duration = 700) {
  if (el.dataset.scrambling === "1") return;
  const text = el.dataset.text ?? el.textContent ?? "";
  if (!text.trim()) return;
  el.dataset.text = text;
  el.dataset.scrambling = "1";
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1);
    const reveal = Math.floor(text.length * p);
    let out = text.slice(0, reveal);
    for (let i = reveal; i < text.length; i++) {
      out += text[i] === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = text;
      delete el.dataset.scrambling;
    }
  };
  requestAnimationFrame(tick);
}

/** Scramble-decodes every [data-scramble] element as it scrolls into view. */
export function useTextScramble(rootRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-scramble]"));

    let io: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              scrambleIn(e.target as HTMLElement);
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      els.forEach((el) => io?.observe(el));
    }

    return () => io?.disconnect();
  }, [rootRef]);
}
