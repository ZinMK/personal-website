import { useState } from "react";

export function AboutLaptop() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`zk-laptop${open ? " is-open" : ""}`}
      onClick={() => setOpen((o) => !o)}
      role="button"
      tabIndex={0}
      aria-pressed={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
    >
      <div className="zk-laptop-scene">
        <div className="zk-laptop-lid">
          <span className="zk-laptop-camera" />
          <div className="zk-laptop-screen">
            <span className="zk-laptop-screen-label">about.txt</span>
            <p>
              Hi! I&apos;m Zin. I&apos;m studying CS @ University of St. Thomas. If I
              see a problem I can fix, I will — throughout college that&apos;s all
              I&apos;ve done.
            </p>
            <p>
              I love talking about meditation, philosophy, music, and AI. I make
              music and, more than anything, I want the things I build to connect
              people.
            </p>
          </div>
        </div>
        <div className="zk-laptop-base">
          <span className="zk-laptop-notch" />
        </div>
      </div>
      <span className="zk-laptop-hint">
        {open ? "click to close" : "click to open"}
      </span>
    </div>
  );
}

export default AboutLaptop;
