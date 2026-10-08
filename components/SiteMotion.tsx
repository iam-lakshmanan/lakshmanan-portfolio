"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { MotionConfig, motion, useAnimationControls, useInView } from "framer-motion";

const MotionPreference = createContext({ enabled: false, systemReduced: false, toggle: () => {} });

function subscribeToMotionPreference(listener: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", listener);
  return () => query.removeEventListener("change", listener);
}
const getMotionPreference = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const getServerMotionPreference = () => false;

export function SiteMotion({ children }: { children: ReactNode }) {
  const systemReduced = useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, getServerMotionPreference);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try { setPaused(localStorage.getItem("portfolio-motion") === "paused"); } catch { /* Storage is optional. */ }
  }, []);
  const enabled = !systemReduced && !paused;
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    return () => { delete document.documentElement.dataset.motion; };
  }, [enabled]);
  function toggle() {
    setPaused(value => {
      try { localStorage.setItem("portfolio-motion", value ? "enabled" : "paused"); } catch { /* Storage is optional. */ }
      return !value;
    });
  }
  return (
    <MotionPreference.Provider value={{ enabled, systemReduced, toggle }}>
      <MotionConfig reducedMotion={enabled ? "user" : "always"}>{children}</MotionConfig>
    </MotionPreference.Provider>
  );
}

export const useSiteMotion = () => useContext(MotionPreference);

export function Reveal({ children, className, delay = 0, style, eager = false }: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
  eager?: boolean;
}) {
  const { enabled } = useSiteMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const controls = useAnimationControls();

  useEffect(() => {
    if (!enabled) {
      controls.stop();
      controls.set({ opacity: 1, y: 0 });
    } else if (eager || inView) {
      void controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
      });
    }
    return () => controls.stop();
  }, [controls, delay, eager, enabled, inView]);

  return (
    <motion.div
      ref={ref}
      className={`motion-reveal ${className ?? ""}`}
      style={style}
      initial={enabled ? { opacity: 0, y: 16 } : false}
      animate={controls}
    >
      {children}
    </motion.div>
  );
}
