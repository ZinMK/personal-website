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
      aria-label={open ? "Close laptop" : "Open laptop to read about"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
    >
      <div className="zk-laptop-scene">
        <div className="zk-laptop-lid">
          <div className="zk-laptop-screen">
            <span className="zk-laptop-screen-label">~/about.txt</span>
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
          <div className="zk-laptop-lidback">
            <span className="zk-laptop-mark">Z</span>
            <span className="zk-laptop-brand">Zin Khant</span>
          </div>
        </div>
        <div className="zk-laptop-base">
          <div className="zk-laptop-keys" />
          <div className="zk-laptop-trackpad" />
          <span className="zk-laptop-monogram">ZK</span>
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
