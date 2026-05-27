import { useState } from "react";

// ─── Project Data ─────────────────────────────────────────────────────────────
// To add a project: copy one object and fill in your details.
// image: leave "" for fallback icons, or set a path e.g. "/assets/onboarding.png"
// status: "planned" | "in-progress" | "completed"
// filterTags: must match a value in FILTERS below

const PROJECTS = [
  {
    id: 1,
    title: "Employee Onboarding Portal",
    description:
      "A full-stack onboarding web app where new hires log in, complete their profile, track checklist progress, and access company resources.",
    image: "",
    fallbackIcons: ["👤", "📊"],
    status: "planned",
    stackLabel: "React + FastAPI",
    features: [
      "JWT authentication with login & protected routes",
      "FastAPI backend with swappable architecture",
      "Per-user onboarding checklist with progress tracking",
    ],
    tags: ["React", "Vite", "FastAPI", "Python", "JWT Auth"],
    filterTags: ["react", "vite", "python"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 2,
    title: "Active Directory Ticketing System",
    description:
      "An automated IT ticketing system integrated with Active Directory on Linux. Handles ticket creation, user provisioning, and email notifications.",
    image: "",
    fallbackIcons: ["🖥️", "🎫"],
    status: "completed",
    stackLabel: "AD + Linux",
    features: [
      "Automated user provisioning & group assignments",
      "Email notification triggers on ticket events",
      "Python scripts scheduled via Linux cron jobs",
    ],
    tags: ["Python", "Linux", "Active Directory", "Automation"],
    filterTags: ["python", "linux", "automation"],
    liveUrl: "#",
    codeUrl: "#",
  },
  {
    id: 3,
    title: "Technical Documentation Hub",
    description:
      "A searchable documentation site that auto-generates structured docs from code comments and markdown files, with version control and category filtering.",
    image: "",
    fallbackIcons: ["📄", "🔍"],
    status: "in-progress",
    stackLabel: "Docs + Python",
    features: [
      "Auto-generates docs from markdown & code comments",
      "Version control with diff tracking per update",
      "Category filtering & full-text search",
    ],
    tags: ["Python", "Markdown", "Automation", "Static Site"],
    filterTags: ["python", "automation"],
    liveUrl: "#",
    codeUrl: "#",
  },
];

const FILTERS = [
  { label: "All",        value: "all" },
  { label: "React",      value: "react" },
  { label: "Vite",       value: "vite" },
  { label: "Python",     value: "python" },
  { label: "Linux",      value: "linux" },
  { label: "Automation", value: "automation" },
];

// ─── StatusBadge ─────────────────────────────────────────────────────────────
// statusConfig is built inside Projects so it has access to activeTheme
function StatusBadge({ status, statusConfig }) {
  const cfg = statusConfig[status] ?? statusConfig.planned;
  return (
    <span
      role="img"
      aria-label={`Status: ${cfg.label}`}
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 999,
        letterSpacing: "0.02em",
        background: cfg.bg,
        color: cfg.color,
      }}
    >
      <span aria-hidden="true">{cfg.symbol}</span>
      {cfg.label}
    </span>
  );
}

// ─── ProjectCard ──────────────────────────────────────────────────────────────
// activeTheme and statusConfig are passed down from Projects
function ProjectCard({ project, activeTheme, statusConfig }) {
  const [imgFailed, setImgFailed] = useState(false);
  const [hovered,   setHovered]   = useState(false);
  const [liveHovered, setLiveHovered] = useState(false); // ← add
  const [codeHovered, setCodeHovered] = useState(false); // ← add
  const showFallback = !project.image || imgFailed;

  return (
    <article
      aria-label={project.title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${activeTheme.badgeBorderColor}`,
        background: activeTheme.badgeBg,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 12px 32px ${activeTheme.primaryBtnShadow}` : "none",
      }}
    >
      {/* ── Thumbnail ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 150,
          flexShrink: 0,
          overflow: "hidden",
          background: activeTheme.portraitPlaceholderBg,
        }}
      >
        {/* Real screenshot — set project.image to show it */}
        {project.image && !imgFailed && (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            onError={() => setImgFailed(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}

        {/* Fallback icons — decorative, hidden from screen readers */}
        {showFallback && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {project.fallbackIcons.map((icon, i) => (
              <span key={i} style={{ fontSize: i === 0 ? 44 : 32, opacity: i === 0 ? 1 : 0.6 }}>
                {icon}
              </span>
            ))}
          </div>
        )}

        <StatusBadge status={project.status} statusConfig={statusConfig} />

        {/* Stack label — decorative, tags carry the same info for screen readers */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 9px",
            borderRadius: 999,
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            letterSpacing: "0.03em",
          }}
        >
          {project.stackLabel}
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: "1rem 1.25rem", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>

        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: activeTheme.primaryNameColor }}>
          {project.title}
        </h3>

        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: activeTheme.bodyTextColor, flex: 1 }}>
          {project.description}
        </p>

        <hr style={{ border: "none", borderTop: `1px solid ${activeTheme.badgeBorderColor}` }} />

        {/* Key features */}
        <ul
          aria-label="Key features"
          style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}
        >
          {project.features.map((f, i) => (
            <li key={i} style={{ fontSize: 12, color: activeTheme.bodyTextColor, paddingLeft: 14, position: "relative" }}>
              <span aria-hidden="true" style={{ position: "absolute", left: 0, color: activeTheme.accentNameColor }}>
                –
              </span>
              {f}
            </li>
          ))}
        </ul>

        <hr style={{ border: "none", borderTop: `1px solid ${activeTheme.badgeBorderColor}` }} />

        {/* Tech tags */}
        <ul
          aria-label="Technologies used"
          style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 6 }}
        >
          {project.tags.map((tag) => (
            <li
              key={tag}
              style={{
                fontSize: 11,
                fontWeight: 500,
                padding: "3px 10px",
                borderRadius: 999,
                background: activeTheme.overlayBg,
                color: activeTheme.badgeTextColor,
                border: `1px solid ${activeTheme.badgeBorderColor}`,
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>

      {/* ── Links ── */}
      <div style={{ display: "flex", gap: 8, padding: "0 1.25rem 1rem" }}>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} live site`}
          onMouseEnter={() => setLiveHovered(true)}
          onMouseLeave={() => setLiveHovered(false)}
          style={{
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "7px 16px",
            borderRadius: 8,
            background: activeTheme.primaryBtnBg,
            color: "#fff",
            border: "none",
            transform: liveHovered ? "scale(1.06)" : "scale(1)",
            boxShadow: liveHovered
              ? `0 0 16px 4px ${activeTheme.primaryBtnShadow}`
              : `0 4px 14px ${activeTheme.primaryBtnShadow}`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
        >
          ↗ Live
        </a>
        <a
          href={project.codeUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${project.title} source code on GitHub`}
          onMouseEnter={() => setCodeHovered(true)}
          onMouseLeave={() => setCodeHovered(false)}
          style={{
            fontSize: 13,
            fontWeight: 600,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            padding: "7px 16px",
            borderRadius: 8,
            background: "transparent",
            color: codeHovered ? activeTheme.accentNameColor : activeTheme.navLinkColor,
            border: `1px solid ${activeTheme.badgeBorderColor}`,
            transform: codeHovered ? "scale(1.06)" : "scale(1)",
            boxShadow: codeHovered
              ? `0 0 16px 4px ${activeTheme.primaryBtnShadow}`
              : "none",
            transition: "transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease",
          }}
        >
          ⌥ Code
        </a>
      </div>
    </article>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
// Usage in PortfolioPage.jsx:
//   <Projects activeTheme={activeTheme} isDarkMode={isDarkMode} />

export default function Projects({ activeTheme }) {
  const [activeFilter, setActiveFilter] = useState("all");

  // Built inside Projects so badge colors can read from activeTheme
  const STATUS_CONFIG = {
    completed: {
      label: "Completed",
      symbol: "✓",
      bg: activeTheme.speechBubbleBg,
      color: activeTheme.navUnderlineColor,
    },
    "in-progress": {
      label: "In Progress",
      symbol: "◷",
      bg: activeTheme.portraitPlaceholderBorder,
      color: activeTheme.accentNameColor,
    },
    planned: {
      label: "Planned",
      symbol: "◈",
      bg: activeTheme.badgeBg,
      color: activeTheme.badgeTextColor,
    },
  };

  const visible = PROJECTS.filter((p) =>
    activeFilter === "all" ? true : p.filterTags.includes(activeFilter)
  );

  return (
    <section
      aria-labelledby="projects-heading"
      id="work"
      style={{ padding: "4rem 2rem", maxWidth: 1100, margin: "0 auto" }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: activeTheme.navLinkColor,
          marginBottom: 6,
        }}
      >
        Work
      </p>

      <h2
        id="projects-heading"
        style={{ fontSize: 52, fontFamily: "playfair display sans-serif", fontWeight: 700, color: activeTheme.primaryNameColor, marginBottom: "1.5rem" }}
      >
        Projects
      </h2>

      {/* Filter buttons — aria-pressed tells screen readers which is active */}
      <div
        role="group"
        aria-label="Filter projects by technology"
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: "2rem" }}
      >
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              aria-pressed={isActive}
              style={{
                fontSize: 13,
                fontWeight: 500,
                padding: "6px 16px",
                borderRadius: 999,
                cursor: "pointer",
                transition: "all 0.15s",
                background: isActive ? activeTheme.accentNameColor : "transparent",
                color:      isActive ? "#fff"                      : activeTheme.navLinkColor,
                border:     `1px solid ${isActive ? activeTheme.accentNameColor : activeTheme.badgeBorderColor}`,
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* aria-live announces filter changes to screen readers */}
      <div
        aria-live="polite"
        aria-label="Project list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {visible.length > 0 ? (
          visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              activeTheme={activeTheme}
              statusConfig={STATUS_CONFIG}
            />
          ))
        ) : (
          <p style={{ color: activeTheme.navLinkColor, textAlign: "center", padding: "3rem 0", fontSize: 14 }}>
            No projects match this filter.
          </p>
        )}
      </div>
    </section>
  );
}