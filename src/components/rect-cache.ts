export interface RectCache {
  readonly current: DOMRect;
  destroy: () => void;
}

export function createRectCache(el: HTMLElement): RectCache {
  let rect = el.getBoundingClientRect();
  let raf = 0;

  const update = () => {
    raf = 0;
    rect = el.getBoundingClientRect();
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", schedule, { capture: true, passive: true });
  window.addEventListener("resize", schedule);

  return {
    get current() {
      return rect;
    },
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule, true as EventListenerOptions);
      window.removeEventListener("resize", schedule);
    },
  };
}
