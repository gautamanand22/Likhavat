"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";

/**
 * Buttery smooth scrolling on desktop. Off under prefers-reduced-motion and
 * on touch / small screens, where native momentum scrolling performs better.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(!coarse && !reduce && window.innerWidth >= 1024);
  }, []);

  if (!enabled) return <>{children}</>;
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.15,
        smoothWheel: true,
        wheelMultiplier: 1,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      }}
    >
      {children}
    </ReactLenis>
  );
}
