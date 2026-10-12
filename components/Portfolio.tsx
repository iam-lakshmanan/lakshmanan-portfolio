"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Box, Braces, Cloud, Code2, Mail, Menu, Phone, Radio, Rocket, Server, TestTube2, X } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { Reveal, SiteMotion, useSiteMotion } from "./SiteMotion";
import { ExperienceTimeline, HeroArtwork, ScrollHeading } from "./ScrollVisuals";

const Github = Code2;
const Linkedin = Braces;

const contactMethods = [
  { name: "Phone", value: "9384272748", href: "tel:9384272748", action: "Let’s talk", icon: Phone, tone: "mint", external: false },
  { name: "Email", value: "lakshmanan02731@gmail.com", href: "mailto:lakshmanan02731@gmail.com", action: "Send an email", icon: Mail, tone: "blue", external: false },
  { name: "LinkedIn", value: "linkedin.com/in/iam-lakshmanan", href: "https://linkedin.com/in/iam-lakshmanan/", action: "Let’s connect", icon: Linkedin, tone: "violet", external: true },
  { name: "GitHub", value: "github.com/iam-lakshmanan", href: "https://github.com/iam-lakshmanan", action: "Explore my code", icon: Github, tone: "amber", external: true },
];

const nav = ["Home","About","Skills","Experience","Projects","DevOps","Certifications","Contact"];
const skillGroups = {
  Frontend:["React.js","Next.js","JavaScript","TypeScript","Tailwind CSS","Responsive UI","PWA"],
  Backend:["Node.js","Express.js","REST APIs","Authentication","JWT","API Integration"],
  Data:["PostgreSQL","MySQL","Database Design","Queries","CRUD Operations"],
  "Cloud & Deployment":["AWS","DigitalOcean","Docker","Docker Compose","Nginx","PM2","SSL / HTTPS"],
  "DevOps Practice":["GitHub Actions","CI/CD","Linux","Jenkins","Terraform","Kubernetes","Ansible","Monitoring"],
  "Tools & Integrations":["Git","Postman","Cloudinary","Firebase","Google Maps APIs","OpenAI Codex","Claude"],
};
const projects = [
  {name:"Fingerprint Smart Lock",desc:"Improved an existing smart-lock app with a responsive interface, complete user workflow, and dedicated admin panel.",tech:["Next.js","TypeScript","Node.js","MySQL","MQTT"],mark:"IoT platform",live:"https://lockuser.magnic.in/"},
  {name:"GymHack",desc:"Built an integrated storefront, backend, and admin panel, with Docker-based deployment.",tech:["Next.js","Node.js","Cloudinary","Docker","Docker Compose"],mark:"E-commerce + containers",live:"https://gymhack.in/"},
  {name:"KGF Lottery Agency",desc:"Built a results and promotions platform with admin publishing tools and cloud file storage.",tech:["Next.js","Tailwind CSS","Node.js","DigitalOcean Spaces"],mark:"Content platform",live:"https://kgflottery.com"},
  {name:"PurpleDropTaxi",desc:"Built a taxi-booking PWA with location search, fare estimates, route maps, and Telegram enquiries.",tech:["Next.js","Google Maps APIs","Telegram Bot API","PWA","Hostinger"],mark:"Booking + location",live:"https://purpledroptaxi.com/"},
  {name:"Mangal and Mangal E-commerce",desc:"Collaborated on a full-stack store with product management, reviews, regional shipping, and an admin dashboard.",tech:["Next.js","Node.js","PostgreSQL","Tailwind CSS"],mark:"Team-built commerce",live:"https://stores.mangalandmangal.com/"},
  {name:"Intercity One-Way Drop Taxis",desc:"Developed an intercity one-way drop taxi website, deployed with Docker and CI/CD pipelines to automate builds and deployments.",tech:["Docker","CI/CD"],mark:"Taxi service website",live:"https://intercitydroptaxis.com/"},
];
const experiences = [
  {
    role:"Full Stack Developer",
    company:"Magnic Technologies Pvt Ltd",
    period:"Nov 2025 - Present",
    summary:"Building and maintaining production web applications and IoT platforms across frontend, backend, databases, and deployment.",
    points:["Build React.js and Node.js applications backed by PostgreSQL","Connect live IoT device data to admin dashboards through MQTT","Implement authentication, authorization, and data encryption","Deploy with Docker and CI/CD, resolve production bugs, and improve reliability"],
    tags:["React.js","Node.js","PostgreSQL","MQTT","Docker","CI/CD"],
  },
  {
    role:"Freelance Full Stack Developer",
    company:"wexoraa",
    period:"Jan 2026 - Present",
    summary:"Delivered 7+ client projects spanning full-stack products, business websites, e-commerce, and taxi-booking experiences.",
    points:["Design REST APIs, database schemas, authentication flows, and payment integrations","Implement SEO, sitemaps, robots.txt, PWA features, and Google Maps integrations","Configure DigitalOcean servers, domains, deployments, and long-term maintenance","Deliver responsive interfaces and admin workflows for real business use"],
    tags:["Next.js","Express.js","DigitalOcean","Google Maps","PWA","SEO"],
  },
];

function SectionHead({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return <div className="section-heading"><Reveal><div className="eyebrow">{kicker}</div></Reveal><ScrollHeading title={title} />{copy && <Reveal delay={0.06}><p className="section-copy">{copy}</p></Reveal>}</div>;
}

const aboutCards = [
  { Icon: Code2, title: "7+ delivered projects", copy: "Client and production work across commerce, business, and booking platforms." },
  { Icon: Radio, title: "Real-time systems", copy: "MQTT-powered IoT data, admin dashboards, and location-based experiences." },
  { Icon: Rocket, title: "Production ownership", copy: "Docker, DigitalOcean, AWS, Nginx, PM2, domains, SSL, and maintenance." },
];
const devCards = [
  { Icon: Cloud, title: "AWS", copy: "EC2 • S3 • RDS • IAM • VPC • CloudWatch" },
  { Icon: Box, title: "Containers", copy: "Docker • Docker Compose • Deployment" },
  { Icon: TestTube2, title: "Automation", copy: "GitHub Actions • Jenkins • Terraform • Ansible" },
  { Icon: Server, title: "Operations", copy: "Linux • Nginx • PM2 • SSL • Monitoring" },
];
const education = [
  { label: "2023 - 2025", title: "M.Sc. Statistics", copy: "PSG College of Arts and Science, Coimbatore", value: "76.6%" },
  { label: "2020 - 2023", title: "B.Sc. Mathematics", copy: "Sri Ramakrishna Mission Vidyalaya College of Arts and Science, Coimbatore", value: "80.2%" },
];
const certifications = [
  { title: "Certified Full Stack Development", type: "Certification", issuer: null, credentialId: "PT/GP/MERN/153/2025", completed: null, Icon: Code2 },
  { title: "DevOps Engineering", type: "Certification", issuer: "Revamp Academy", credentialId: null, completed: "July 2026", Icon: Server },
  { title: "AWS Cloud Computing Training", type: "Training", issuer: "Revamp Academy", credentialId: null, completed: "July 2026", Icon: Cloud },
  { title: "Infrastructure Automation & Monitoring Training", type: "Training", issuer: "Revamp Academy", credentialId: null, completed: "July 2026", Icon: Box },
];

function DeploymentPipeline() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const { enabled } = useSiteMotion();
  return (
    <ol ref={ref} className="pipeline" data-running={inView && enabled} aria-label="Deployment workflow">
      {["GitHub", "CI/CD", "Build & Test", "Docker", "AWS / DO", "Nginx", "Production"].map((label, index) => (
        <li key={label} style={{ "--flow-delay": `${index * 0.65}s` } as CSSProperties}>
          <Reveal delay={index * 0.05}><div className="pipe-node"><span className="pipe-number">{String(index + 1).padStart(2, "0")}</span><span>{label}</span></div></Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Portfolio() {
  return <SiteMotion><PortfolioContent /></SiteMotion>;
}

function PortfolioContent() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { enabled, systemReduced, toggle } = useSiteMotion();
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", value => {
    setScrolled(value > 20);
    const boundary = (headerRef.current?.querySelector(".navin")?.getBoundingClientRect().height ?? 76) + 24;
    const current = [...nav].reverse().find(label => {
      const section = document.getElementById(label.toLowerCase());
      return section && section.getBoundingClientRect().top <= boundary;
    });
    if (current) setActive(current);
  });

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 20);
      const boundary = (headerRef.current?.querySelector(".navin")?.getBoundingClientRect().height ?? 76) + 24;
      const current = [...nav].reverse().find(label => {
        const section = document.getElementById(label.toLowerCase());
        return section && section.getBoundingClientRect().top <= boundary;
      });
      if (current) setActive(current);
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuRef.current?.focus(); }
    };
    const onOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    const onResize = () => { if (window.innerWidth > 1100) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  function scrollToSection(event: MouseEvent<HTMLAnchorElement>, sectionId: string) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const target = document.getElementById(sectionId);
    if (!target) return;
    event.preventDefault();
    const navHeight = headerRef.current?.querySelector(".navin")?.getBoundingClientRect().height ?? 76;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
    setOpen(false);
    target.focus({ preventScroll: true });
    window.scrollTo({ top, behavior: enabled ? "smooth" : "instant" });
    window.history.replaceState(null, "", `#${sectionId}`);
  }

  const links = (mobile = false) => nav.map(label => (
    <a key={label} href={`#${label.toLowerCase()}`} className={active === label ? "active" : ""}
      aria-current={active === label ? "location" : undefined}
      onClick={event => scrollToSection(event, label.toLowerCase())}>
      {label}
      {!mobile && active === label && <motion.span className="nav-indicator" layoutId="nav-indicator" transition={{ duration: enabled ? 0.25 : 0 }} />}
    </a>
  ));

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header ref={headerRef} className={`nav ${scrolled ? "scrolled" : ""}`}>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <div className="wrap navin">
        <a href="#home" className="logo" aria-label="</Lakshmanan> Home" onClick={event => scrollToSection(event, "home")}><span aria-hidden="true">&lt;/Lakshmanan&gt;</span></a>
        <nav className="links" aria-label="Main navigation">{links()}</nav>
        <div className="nav-controls">
          <button className="motion-toggle" type="button" onClick={toggle} disabled={systemReduced}
            aria-label={systemReduced ? "Motion off: animations disabled by your system preference" : enabled ? "Motion on: pause animations" : "Motion off: enable animations"}
            title={systemReduced ? "Reduced motion is enabled on your device" : undefined}>
            <span className="motion-bars" aria-hidden="true"><i /><i /><i /></span><span>Motion {enabled ? "on" : "off"}</span>
          </button>
          <button ref={menuRef} className="menu" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(value => !value)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && <motion.nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation"
          initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}
          transition={{ duration: enabled ? 0.22 : 0 }}>
          <div className="mobile-nav-inner">{links(true)}</div>
        </motion.nav>}
      </AnimatePresence>
    </header>

    <main id="main-content" tabIndex={-1}>
      <section ref={heroRef} id="home" tabIndex={-1} className="hero">
        <HeroArtwork target={heroRef} />
        <div className="wrap hero-grid">
          <div className="hero-content">
            <Reveal eager><div className="status">Full Stack • Cloud • DevOps</div></Reveal>
            <Reveal eager delay={0.07}><h1>Hi, I&apos;m <span>Lakshmanan.</span></h1></Reveal>
            <Reveal eager delay={0.14}><p className="hero-copy">I build web applications, connected systems, and cloud infrastructure. From the first interface to production.</p></Reveal>
            <Reveal eager delay={0.28}><div className="actions"><a className="btn primary" href="#projects" onClick={event => scrollToSection(event, "projects")}>View my work</a><a className="btn" href="#contact" onClick={event => scrollToSection(event, "contact")}>Let&apos;s connect</a></div></Reveal>
          </div>
        </div>
      </section>

      <section id="about" tabIndex={-1} className="section"><div className="wrap">
        <SectionHead kicker="About" title="Full stack, from interface to infrastructure" copy="I’m a Full Stack Developer in Coimbatore with hands-on experience across business websites, e-commerce products, IoT platforms, and taxi-booking systems. My work covers responsive interfaces, REST APIs, database design, authentication, payments, third-party integrations, and production deployment. I’m strengthening that foundation with AWS, Docker, Linux, CI/CD, Nginx, and practical cloud-native engineering." />
        <div className="three">{aboutCards.map(({ Icon, title, copy }, index) => <Reveal className="card mini" key={title} delay={index * 0.07}><Icon size={23} /><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </div></section>

      <section id="skills" tabIndex={-1} className="section"><div className="wrap">
        <SectionHead kicker="Toolkit" title="Technologies I work with" copy="A practical toolkit shaped by building across the browser, server, database, devices and deployment." />
        <div className="skills">{Object.entries(skillGroups).map(([group, items], index) => <Reveal className="card skill" key={group} delay={(index % 3) * 0.06}><h3>{group}</h3><div className="tags">{items.map(item => <span className="tag" key={item}>{item}</span>)}</div></Reveal>)}</div>
      </div></section>

      <section id="experience" tabIndex={-1} className="section"><div className="wrap">
        <SectionHead kicker="Experience" title="Production work and client delivery" copy="Current roles across product engineering, IoT, freelance delivery, and cloud deployment." />
        <ExperienceTimeline>{experiences.map((item, index) => <Reveal className="card experience" key={item.company} delay={index * 0.07}>
          <div className="role-head"><div><h3>{item.role}</h3><div className="company">{item.company}</div></div><span className="tag">{item.period}</span></div>
          <p className="section-copy">{item.summary}</p><ul className="responsibilities">{item.points.map(point => <li key={point}>{point}</li>)}</ul>
          <div className="tags">{item.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
        </Reveal>)}</ExperienceTimeline>
      </div></section>

      <section id="projects" tabIndex={-1} className="section"><div className="wrap">
        <div className="projects-heading"><SectionHead kicker="Selected work" title="These are my key projects" copy="From connected devices to customer-facing products. Projects built for real use." /><Reveal><span className="project-count">{String(projects.length).padStart(2, "0")} <span>projects</span></span></Reveal></div>
        <div className="projects">{projects.map((project, index) => <ProjectCard project={project} index={index} total={projects.length} key={project.name} />)}</div>
      </div></section>

      <section id="devops" tabIndex={-1} className="section"><div className="wrap">
        <SectionHead kicker="Cloud & DevOps" title="From code to reliable production" copy="I deploy and maintain applications on DigitalOcean and AWS using Docker, Linux, Nginx, PM2, SSL, and automated delivery workflows. I also have intermediate understanding and hands-on practice with Jenkins, Terraform, Kubernetes, and monitoring." />
        <DeploymentPipeline />
        <div className="devcards">{devCards.map(({ Icon, title, copy }, index) => <Reveal className="card devcard" key={title} delay={index * 0.06}><Icon size={21} /><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </div></section>

      <section className="section"><div className="wrap">
        <SectionHead kicker="Process" title="How I approach development" />
        <div className="steps">{[["01", "Understand", "Understand the requirement and problem before writing code."], ["02", "Build", "Create clean, reusable frontend and backend components."], ["03", "Test & Debug", "Find the root cause and improve reliability."], ["04", "Deploy & Improve", "Ship, observe real usage and keep improving."]].map(([number, title, copy], index) => <Reveal className="step" key={number} delay={index * 0.08}><b>{number}</b><h3>{title}</h3><p>{copy}</p></Reveal>)}</div>
      </div></section>

      <section className="section"><div className="wrap">
        <SectionHead kicker="Growing deeper" title="Cloud-native engineering in practice" copy="Building on production experience through focused hands-on learning and AI-assisted development." />
        <div className="learning">{["AWS Architecture", "Jenkins", "Terraform", "Kubernetes", "Monitoring", "Scalable Backends", "Application Security", "AI-assisted Development"].map((label, index) => <Reveal className="card learn" key={label} delay={(index % 4) * 0.05}><Braces size={17} /><span>{label}</span></Reveal>)}</div>
      </div></section>

      <section className="section"><div className="wrap">
        <SectionHead kicker="Education" title="A quantitative foundation for software engineering" />
        <div className="credentials">{education.map((credential, index) => <Reveal className="card credential" key={credential.title} delay={(index % 2) * 0.08}><div className="credential-year">{credential.label}</div><h3>{credential.title}</h3><p>{credential.copy}</p><strong>{credential.value}</strong></Reveal>)}</div>
      </div></section>

      <section id="certifications" tabIndex={-1} className="section"><div className="wrap">
        <SectionHead kicker="Certifications" title="Certifications & professional training" copy="Structured learning in full-stack development, DevOps, cloud computing, and infrastructure automation." />
        <div className="credentials">{certifications.map(({ title, type, issuer, credentialId, completed, Icon }, index) => (
          <Reveal className="card credential certification-card" key={title} delay={(index % 2) * 0.08}>
            <div className="certification-top"><span className="certification-icon"><Icon size={24} aria-hidden="true" /></span><span className="certification-type">{type}</span></div>
            <h3>{title}</h3>
            {issuer && <p className="certification-issuer">{issuer}</p>}
            <div className="certification-meta">
              {credentialId && <><span>Credential ID</span><strong>{credentialId}</strong></>}
              {completed && <span className="certification-completed"><BadgeCheck size={17} aria-hidden="true" />Completed <time dateTime="2026-07">{completed}</time></span>}
            </div>
          </Reveal>
        ))}</div>
      </div></section>

      <section className="section"><div className="wrap">
        <Reveal className="card github-box"><div><div className="eyebrow">Open source</div><h2>Code, experiments & projects</h2><p className="section-copy">Most of my learning happens by building. See the projects, experiments and ideas I’m currently working on.</p></div><a className="btn primary" href="https://github.com/iam-lakshmanan" target="_blank" rel="noreferrer"><Github size={17} /> Visit GitHub</a></Reveal>
      </div></section>

      <section id="contact" tabIndex={-1} className="section contact-section"><div className="wrap">
        <SectionHead kicker="Contact" title="Let’s build something useful" copy="I’m open to full-stack, cloud, DevOps, and product engineering opportunities, as well as thoughtful freelance projects." />
        <div className="contact-details">
          <Reveal><p className="section-copy">Based in Coimbatore, Tamil Nadu. Available to discuss roles, collaborations, and production-focused development work.</p></Reveal>
          <div className="contact-list">
            {contactMethods.map(({ name, value, href, action, icon: Icon, tone, external }, index) => (
              <Reveal key={name} delay={index * 0.06}>
                <a className={`contact-link contact-${tone}`} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
                  <span className="contact-card-top"><span className="contact-icon" aria-hidden="true">{name === "LinkedIn" ? <span className="linkedin-mark">in</span> : <Icon size={22} />}</span><span className="contact-label">{name}</span><ArrowUpRight className="contact-arrow" size={20} aria-hidden="true" /></span>
                  <span className="contact-value">{value}</span>
                  <span className="contact-action">{action}<span aria-hidden="true"> →</span></span>
                  {external && <span className="contact-sr-only"> (opens in a new tab)</span>}
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div></section>
    </main>
    <footer className="footer"><Reveal className="wrap footer-in"><span>© 2026 Lakshmanan. Built with Next.js & Tailwind CSS.</span><span>Built with curiosity and lots of debugging.</span></Reveal></footer>
  </>;
}
