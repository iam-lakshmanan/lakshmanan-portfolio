"use client";

import Image from "next/image";
import { memo, useRef, type ReactNode, type RefObject } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useSiteMotion } from "./SiteMotion";

// Motion values update transforms without re-rendering the portfolio on every frame.
export const HeroArtwork = memo(function HeroArtwork({ target }: { target: RefObject<HTMLElement | null> }) {
  const { enabled } = useSiteMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 96]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 4]);
  return <div className="hero-artwork">
    <motion.div className="hero-artwork-surface scroll-art" style={enabled ? { y, scale, rotate } : { y: 0, scale: 1, rotate: 0 }}>
      <Image src="/images/hero-system-sculpture.png" alt="Sculptural graphite frames connected by a teal glass ribbon, representing connected software systems."
        width={1254} height={1254} sizes="(max-width: 560px) calc(100vw - 32px), (max-width: 850px) 480px, (max-width: 1240px) 48vw, 584px" priority fetchPriority="high" className="hero-image" />
    </motion.div>
  </div>;
});

function HeadingWord({ children, progress, start, end }: { children: string; progress: MotionValue<number>; start: number; end: number }) {
  const { enabled } = useSiteMotion();
  const opacity = useTransform(progress, [start, end], [0.42, 1]);
  const y = useTransform(progress, [start, end], [12, 0]);
  return <motion.span className="scroll-word" style={enabled ? { opacity, y } : { opacity: 1, y: 0 }}>{children}</motion.span>;
}

export function ScrollHeading({ title }: { title: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.94", "start 0.55"] });
  const words = title.split(" ");
  return <h2 ref={ref} className="section-title scroll-heading" aria-label={title}>
    <span aria-hidden="true">{words.map((word, index) => <span key={`${word}-${index}`}><HeadingWord progress={scrollYProgress} start={index / (words.length + 2)} end={(index + 3) / (words.length + 2)}>{word}</HeadingWord>{index < words.length - 1 ? " " : ""}</span>)}</span>
  </h2>;
}

export function ExperienceTimeline({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useSiteMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.65"] });
  return <div ref={ref} className="experience-list experience-timeline">
    <div className="experience-rail" aria-hidden="true"><motion.div className="experience-rail-fill" style={{ scaleY: enabled ? scrollYProgress : 1 }} /></div>
    {children}
  </div>;
}
