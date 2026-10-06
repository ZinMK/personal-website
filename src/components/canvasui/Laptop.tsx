import { useState, type ReactNode } from "react";

export function Laptop({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="zk-laptop"
      data-open={open ? "true" : "false"}
      role="button"
      tabIndex={0}
      aria-label={open ? "Close laptop" : "Open laptop to read about"}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
    >
      <div className="zk-laptop-scene">
        <div className="zk-laptop-lid">
          <div className="zk-laptop-screen">{children}</div>
        </div>
        <div className="zk-laptop-base">
          <span className="zk-laptop-notch" />
        </div>
      </div>
      {!open && <span className="zk-laptop-hint">Click to open ▾</span>}
    </div>
  );
}

export default Laptop;
