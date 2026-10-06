import { useEffect, useState } from "react";

const MILLISECONDS_PER_YEAR = 365.2425 * 24 * 60 * 60 * 1000;

export function LiveAge({ bornAt }: { bornAt: string }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 100);
    return () => window.clearInterval(timer);
  }, []);

  const age = (now - Date.parse(bornAt)) / MILLISECONDS_PER_YEAR;

  return <span style={{ fontVariantNumeric: "tabular-nums" }}>{age.toFixed(9)}</span>;
}
