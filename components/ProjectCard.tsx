"use client";

import type { CSSProperties } from "react";
import { Car, ExternalLink, Fingerprint, Route, ShoppingBag, Store, Ticket } from "lucide-react";
import { Reveal } from "./SiteMotion";

export type Project = { name: string; desc: string; tech: string[]; mark: string; live: string };
const treatments = [
  { Icon: Fingerprint, color: "#6ee7c7", tint: "rgba(110,231,199,.09)" },
  { Icon: ShoppingBag, color: "#8fbaff", tint: "rgba(143,186,255,.09)" },
  { Icon: Ticket, color: "#f2cb87", tint: "rgba(242,203,135,.09)" },
  { Icon: Car, color: "#bea3ff", tint: "rgba(190,163,255,.09)" },
  { Icon: Store, color: "#f2a9b8", tint: "rgba(242,169,184,.09)" },
  { Icon: Route, color: "#7dd3fc", tint: "rgba(125,211,252,.09)" },
];

export function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const { Icon, color, tint } = treatments[index % treatments.length];
  const domain = new URL(project.live).hostname;
  return (
    <Reveal className="project-reveal" delay={(index % 3) * 0.07}>
      <article className="project-card" style={{ "--project-accent": color, "--project-tint": tint } as CSSProperties}>
        <div className="project-topline">
          <span className="project-icon"><Icon size={24} strokeWidth={1.6} aria-hidden="true" /></span>
          <span className="project-index">{String(index + 1).padStart(2, "0")} <span>/ {String(total).padStart(2, "0")}</span></span>
        </div>
        <div className="project-category">{project.mark}</div>
        <h3>{project.name}</h3>
        <p className="project-description">{project.desc}</p>
        <ul className="project-stack" aria-label={`${project.name} technologies`}>
          {project.tech.map(tech => <li key={tech}>{tech}</li>)}
        </ul>
        <a className="project-visit" href={project.live} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name} (opens in a new tab)`}>
          <span><span className="project-visit-label">View project</span><span className="project-domain">{domain}</span></span>
          <span className="project-launch"><ExternalLink size={17} aria-hidden="true" /></span>
        </a>
      </article>
    </Reveal>
  );
}
