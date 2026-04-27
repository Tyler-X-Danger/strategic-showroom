import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ExternalLink,
  Zap,
  Shield,
  Globe,
  Eye,
  ChevronRight,
  Activity,
  Database,
  Layers,
  Clock,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? scrolled / total : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

// Wraps any child and fades/slides in when entering the viewport,
// fades/slides back out when leaving — works in both scroll directions.
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const VERSIONS = [
  {
    label: "V1",
    badge: "Initial Prototype",
    interview: "Interview 1",
    title: "FHA Compliance Checker",
    url: "https://intelligencehub-three.vercel.app/",
    description:
      "Reactive single-task audit tool. Accepts listing text, flags Fair Housing Act violations, and suggests compliant rewrites. Manual trigger, no orchestration layer.",
    tags: ["Single-Task", "Reactive", "Manual Trigger", "Text-Only"],
    icon: Shield,
    muted: true,
  },
  {
    label: "V2",
    badge: "Strategic Intelligence Hub",
    interview: "Interview 2",
    title: "Agentic Intelligence Hub",
    url: "https://intelligenceapp.streamlit.app/",
    description:
      "Multi-agent orchestration platform. LHS Performance Auditor, FHA Compliance Guard, and Affordability Engine run in parallel. RESO v2.0 data mapping, DPA stacking analysis via Gemini Flash, SimplyRETS MLS push.",
    tags: ["Multi-Agent", "RESO v2.0", "Agentic Watchers", "Runtype-Ready", "MLS Push"],
    icon: Layers,
    muted: false,
  },
];

const PORTFOLIO = [
  {
    title: "Nomadsync",
    url: "https://nomadsync.vercel.app/",
    tagline: "Cross-border workflow automation at global scale.",
    description:
      "Real-time data synchronization across jurisdictions. Designed for distributed teams operating across multiple time zones and compliance frameworks.",
    tag: "Workflow Automation",
    icon: Globe,
    accent: "#06b6d4",
    accentBg: "rgba(6, 182, 212, 0.08)",
    accentBorder: "rgba(6, 182, 212, 0.25)",
    accentGlow: "rgba(6, 182, 212, 0.15)",
  },
  {
    title: "Pur-cision Vision",
    url: "https://aegis-clean.vercel.app/",
    tagline: "Computer vision for physical asset compliance.",
    description:
      "AI-powered quality auditing engine. High-accuracy defect detection and compliance scoring for physical spaces — built for enterprise inspection workflows.",
    tag: "Computer Vision",
    icon: Eye,
    accent: "#a855f7",
    accentBg: "rgba(168, 85, 247, 0.08)",
    accentBorder: "rgba(168, 85, 247, 0.25)",
    accentGlow: "rgba(168, 85, 247, 0.15)",
  },
];

const STATS = [
  { value: "7", unit: "Days", label: "Prototype → Platform" },
  { value: "4", unit: "Agents", label: "Orchestrated in Hub" },
  { value: "60", unit: "DPA", label: "Programs Mapped" },
  { value: "v2.0", unit: "RESO", label: "Compliance Standard" },
];

// ─── Components ──────────────────────────────────────────────────────────────

function ScrollProgressBar({ progress }) {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-[2px] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-400"
        style={{ width: `${progress * 100}%`, transition: "width 0.1s linear" }}
      />
    </div>
  );
}

function NavBar({ scrolled }) {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10,10,10,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        className="glass glass-hover rounded-full px-4 py-2 flex items-center gap-3"
      >
        {/* X Diamond logomark */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="xgrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="3" fill="url(#xgrad)" transform="rotate(45 12 12)" />
          <line x1="9" y1="9" x2="15" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="15" y1="9" x2="9" y2="15" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {/* Divider */}
        <div className="w-px h-3 bg-white/20" />
        {/* Wordmark */}
        <span className="text-xs font-light text-white/60 tracking-[0.2em] uppercase">
          Tyler Danger
        </span>
      </a>
      <a
        href="https://intelligenceapp.streamlit.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="glass glass-hover rounded-full px-5 py-2 text-sm font-medium text-white/80 hover:text-white flex items-center gap-2"
      >
        Live Demo <ExternalLink size={13} />
      </a>
    </nav>
  );
}

// Animated mouse/chevron scroll cue — hides once user has scrolled
function ScrollCue({ visible }) {
  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      style={{ opacity: visible ? 0.45 : 0, transition: "opacity 0.6s ease" }}
    >
      {/* Mouse outline */}
      <div className="w-6 h-10 rounded-full border border-white/30 flex items-start justify-center pt-2">
        <div
          className="w-1 h-2 rounded-full bg-white/60"
          style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
        />
      </div>
      {/* Two staggered chevrons */}
      <div className="flex flex-col items-center -gap-1">
        <ChevronRight
          size={12}
          className="rotate-90 text-white/40"
          style={{ animation: "chevronFade 1.8s ease-in-out infinite" }}
        />
        <ChevronRight
          size={12}
          className="rotate-90 text-white/20 -mt-1"
          style={{ animation: "chevronFade 1.8s ease-in-out 0.2s infinite" }}
        />
      </div>
    </div>
  );
}

function HeroBlob({ className, color, parallaxY = 0 }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        background: color,
        transform: `translateY(${parallaxY}px)`,
        transition: "transform 0.05s linear",
        willChange: "transform",
      }}
    />
  );
}

function StatBadge({ value, unit, label }) {
  return (
    <div className="glass rounded-2xl px-5 py-4 flex flex-col gap-0.5 min-w-[110px]">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white">{value}</span>
        <span className="text-sm font-semibold text-blue-400">{unit}</span>
      </div>
      <span className="text-xs text-white/40 font-medium">{label}</span>
    </div>
  );
}

function HeroSection({ scrollY }) {
  // Parallax: each blob moves at a different rate
  const blob1Y = scrollY * 0.25;
  const blob2Y = scrollY * 0.15;
  const blob3Y = scrollY * 0.35;
  // Hero content compresses slightly upward
  const contentY = scrollY * 0.12;
  const showCue = scrollY < 80;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pb-24 overflow-hidden">
      <HeroBlob
        className="w-[700px] h-[700px] -top-48 -left-48 opacity-20"
        color="radial-gradient(circle, #3b82f6 0%, transparent 70%)"
        parallaxY={blob1Y}
      />
      <HeroBlob
        className="w-[500px] h-[500px] top-1/3 -right-32 opacity-15"
        color="radial-gradient(circle, #6366f1 0%, transparent 70%)"
        parallaxY={-blob2Y}
      />
      <HeroBlob
        className="w-[400px] h-[400px] bottom-0 left-1/3 opacity-10"
        color="radial-gradient(circle, #06b6d4 0%, transparent 70%)"
        parallaxY={blob3Y}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-8"
        style={{ transform: `translateY(${-contentY}px)` }}
      >
        {/* Badge */}
        <Reveal>
          <div className="glass rounded-full px-5 py-2 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-semibold text-white/70 tracking-wider uppercase">
              Final Round Interview &nbsp;·&nbsp; Mickey Neuberger, CMO — Realtor.com
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight">
            <span className="gradient-text">Architecting Agentic ROI</span>
            <br />
            <span className="text-white/90">for Enterprise Real Estate.</span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl leading-relaxed font-light">
            Transforming manual bottlenecks into{" "}
            <span className="text-white/80 font-medium">autonomous, RESO-compliant revenue engines</span>{" "}
            — from FHA audit to full agentic platform in a single feedback loop.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="https://intelligenceapp.streamlit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] text-sm"
            >
              View V2 Intelligence Hub
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="https://intelligencehub-three.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover flex items-center gap-2 text-white/70 hover:text-white font-medium px-7 py-3.5 rounded-full text-sm"
            >
              View V1 Prototype <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            {STATS.map((s) => (
              <StatBadge key={s.unit} {...s} />
            ))}
          </div>
        </Reveal>
      </div>

      <ScrollCue visible={showCue} />
    </section>
  );
}

function VersionCard({ version }) {
  const Icon = version.icon;
  return (
    <div
      className={`glass rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500 ${
        version.muted ? "opacity-70 hover:opacity-90" : "glow-blue-border glow-blue"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                version.muted
                  ? "bg-white/5 text-white/40"
                  : "bg-blue-500/15 text-blue-400 border border-blue-500/30"
              }`}
            >
              {version.label}
            </span>
            <span className="text-xs text-white/30">{version.interview}</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">
              {version.badge}
            </p>
            <h3 className="text-xl font-bold text-white">{version.title}</h3>
          </div>
        </div>
        <div
          className={`p-3 rounded-2xl ${
            version.muted ? "bg-white/5" : "bg-blue-500/10 border border-blue-500/20"
          }`}
        >
          <Icon size={22} className={version.muted ? "text-white/30" : "text-blue-400"} />
        </div>
      </div>

      <p className="text-sm text-white/50 leading-relaxed">{version.description}</p>

      <div className="flex flex-wrap gap-2">
        {version.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              version.muted
                ? "bg-white/5 text-white/30"
                : "bg-blue-500/10 text-blue-300 border border-blue-500/20"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={version.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group mt-auto flex items-center gap-2 text-sm font-semibold transition-colors ${
          version.muted ? "text-white/30 hover:text-white/60" : "text-blue-400 hover:text-blue-300"
        }`}
      >
        {version.muted ? "View Prototype" : "Launch Intelligence Hub"}
        <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
}

function VelocitySection() {
  return (
    <section className="relative px-6 md:px-12 py-28 max-w-7xl mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-blue-500" />
          <span className="text-xs font-semibold text-blue-400 tracking-widest uppercase">
            The 7-Day Sprint
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          From Feedback to Infrastructure.
        </h2>
        <p className="text-white/40 text-lg mb-16 max-w-xl">
          One Chief of Staff feedback loop. Seven days. A production-ready agentic platform.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <Reveal delay={0}>
          <VersionCard version={VERSIONS[0]} />
        </Reveal>

        <Reveal delay={120}>
          <div className="flex flex-col items-center gap-3 px-2">
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent md:hidden" />
            <div className="glass rounded-2xl px-4 py-3 flex flex-col items-center gap-1">
              <Clock size={16} className="text-blue-400" />
              <span className="text-lg font-black text-white">7</span>
              <span className="text-[10px] font-semibold text-white/40 tracking-wider uppercase">Days</span>
            </div>
            <ArrowRight size={18} className="text-blue-500/60 hidden md:block" />
            <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent md:hidden" />
          </div>
        </Reveal>

        <Reveal delay={240}>
          <VersionCard version={VERSIONS[1]} />
        </Reveal>
      </div>

      <Reveal delay={100}>
        <div className="mt-10 glass rounded-2xl p-6 md:p-8 border-l-4 border-l-blue-500 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-500/10 shrink-0">
            <TrendingUp size={22} className="text-blue-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-lg leading-snug">
              "One week. One feedback loop. An entire architecture evolution."
            </p>
            <p className="text-white/40 text-sm mt-1">
              V1 → V2 represents the operational thesis: enterprise-grade AI is built through rapid, structured iteration — not extended planning cycles.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:ml-auto shrink-0">
            {["FHA Audit → Agentic Hub", "Manual → RESO-Compliant", "Single Model → 3-Engine Orchestration"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-white/50">
                <CheckCircle2 size={12} className="text-blue-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PortfolioCard({ project }) {
  const Icon = project.icon;
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="glass glass-hover rounded-3xl p-8 flex flex-col gap-6 group cursor-pointer"
      style={{
        background: project.accentBg,
        borderColor: project.accentBorder,
        boxShadow: `0 0 40px ${project.accentGlow}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div
          className="p-3 rounded-2xl"
          style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}30` }}
        >
          <Icon size={24} style={{ color: project.accent }} />
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: `${project.accent}15`, color: project.accent, border: `1px solid ${project.accent}30` }}
        >
          {project.tag}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-sm font-medium" style={{ color: project.accent }}>{project.tagline}</p>
        <p className="text-sm text-white/40 leading-relaxed mt-1">{project.description}</p>
      </div>
      <div
        className="mt-auto flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all"
        style={{ color: project.accent }}
      >
        Visit Project <ExternalLink size={14} />
      </div>
    </a>
  );
}

function PortfolioSection() {
  return (
    <section className="relative px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-violet-500" />
          <span className="text-xs font-semibold text-violet-400 tracking-widest uppercase">
            Strategic Portfolio
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Personal Innovation Lab.
        </h2>
        <p className="text-white/40 text-lg mb-14 max-w-xl">
          Independent ventures exploring the frontier of AI-native product design.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PORTFOLIO.map((project, i) => (
          <Reveal key={project.title} delay={i * 150}>
            <PortfolioCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const capabilities = [
    { icon: Activity, title: "Agentic Orchestration", description: "Multi-agent pipeline design with parallel execution and graceful fallback chains." },
    { icon: Database, title: "RESO v2.0 Compliance", description: "Full data dictionary mapping for MLS push with DPA namespace preservation." },
    { icon: Zap, title: "Velocity of Iteration", description: "Production-grade platform evolution in 7 days from a single feedback session." },
    { icon: Shield, title: "Regulatory Intelligence", description: "FHA/Fair Housing compliance detection with GPT-4o-mini at temperature 0.1." },
  ];

  return (
    <section className="relative px-6 md:px-12 py-20 max-w-7xl mx-auto">
      <Reveal>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-emerald-500" />
          <span className="text-xs font-semibold text-emerald-400 tracking-widest uppercase">
            Core Capabilities
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-14 tracking-tight">
          The Operating Thesis.
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {capabilities.map((cap, i) => {
          const Icon = cap.icon;
          return (
            <Reveal key={cap.title} delay={i * 80}>
              <div className="glass glass-hover rounded-2xl p-6 flex flex-col gap-4 h-full">
                <div className="p-2.5 rounded-xl bg-white/5 w-fit">
                  <Icon size={20} className="text-white/60" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">{cap.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative px-6 md:px-12 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Reveal>
          <div className="flex flex-col gap-1">
            <p className="text-white font-semibold">AI Strategy Operations Director</p>
            <p className="text-white/30 text-sm">
              Prepared for <span className="text-white/60">Mickey Neuberger, CMO — Realtor.com</span>
            </p>
          </div>
        </Reveal>
        <div className="flex items-center gap-6">
          {[
            { label: "Intelligence Hub", url: "https://intelligenceapp.streamlit.app/" },
            { label: "FHA Prototype", url: "https://intelligencehub-three.vercel.app/" },
            { label: "Nomadsync", url: "https://nomadsync.vercel.app/" },
            { label: "Pur-cision", url: "https://aegis-clean.vercel.app/" },
          ].map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-white/70 transition-colors flex items-center gap-1.5"
            >
              {label} <ExternalLink size={11} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const scrollY = useScrollY();
  const progress = useScrollProgress();
  const navScrolled = scrollY > 60;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <ScrollProgressBar progress={progress} />
      <NavBar scrolled={navScrolled} />
      <HeroSection scrollY={scrollY} />
      <VelocitySection />
      <CapabilitiesSection />
      <PortfolioSection />
      <Footer />
    </div>
  );
}
