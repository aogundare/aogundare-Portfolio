/**
 * @file AboutSection.jsx
 * @description Spring-themed timeline About Me section — purely presentational.
 *
 * This component owns NO theme state and NO canvas.
 * Both are provided by SpringLayout via PortfolioPage.
 *
 * TO UPDATE TIMELINE CONTENT:
 *   Edit the TIMELINE array below — no other changes needed.
 *   Each block has: era, title, leafColor, delay, and entries[].
 *   Each entry has: category, text (string or null), subs[].
 *
 * @param {{ activeTheme, isDarkMode }} props
 */

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function LeafBullet({ color, delay = 0 }) {
  return (
    <span
      className="about-leaf inline-flex items-center justify-center shrink-0"
      style={{ animationDelay: `${delay}s`, width: 28, height: 28 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 28 28" width="28" height="28" fill="none">
        <path d="M14 4 C20 4 24 9 24 14 C24 20 18 25 14 25 C10 25 4 20 4 14 C4 9 8 4 14 4 Z"
          fill={color} opacity="0.88"/>
        <line x1="14" y1="6"  x2="14" y2="23" stroke="rgba(255,255,255,0.45)" strokeWidth="1"   strokeLinecap="round"/>
        <line x1="14" y1="12" x2="19" y2="10" stroke="rgba(255,255,255,0.30)" strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="14" y1="16" x2="9"  y2="14" stroke="rgba(255,255,255,0.30)" strokeWidth="0.8" strokeLinecap="round"/>
        <line x1="14" y1="19" x2="18" y2="17" stroke="rgba(255,255,255,0.30)" strokeWidth="0.8" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

function SmallLeaf({ color }) {
  return (
    <span className="inline-flex items-center justify-center shrink-0 mt-0.5"
      style={{ width: 18, height: 18 }} aria-hidden="true">
      <svg viewBox="0 0 18 18" width="18" height="18" fill="none">
        <path d="M9 2C12.5 2 15.5 5 15.5 9C15.5 12.5 12.5 16 9 16C5.5 16 2.5 12.5 2.5 9C2.5 5 5.5 2 9 2Z"
          fill={color} opacity="0.72"/>
        <line x1="9" y1="3" x2="9" y2="15" stroke="rgba(255,255,255,0.40)" strokeWidth="0.8" strokeLinecap="round"/>
      </svg>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AboutSection — named export
// ─────────────────────────────────────────────────────────────────────────────

export function AboutSection({ activeTheme, isDarkMode }) {
  // ── Derived colours (all from isDarkMode, no extra imports needed) ─────────
  const cardBg       = isDarkMode ? "rgba(12,10,8,0.72)"    : "rgba(255,252,248,0.78)";
  const cardBorder   = isDarkMode ? "rgba(208,120,88,0.22)" : "rgba(200,112,96,0.22)";
  const stemColor    = isDarkMode ? "rgba(208,120,88,0.45)" : "rgba(200,112,96,0.40)";
  const yearBg       = isDarkMode ? "rgba(200,104,72,0.20)" : "rgba(200,112,96,0.14)";
  const yearText     = isDarkMode ? "#e89878"               : "#a05038";
  const dividerColor = isDarkMode ? "rgba(208,120,88,0.18)" : "rgba(200,112,96,0.18)";
  const leafA        = isDarkMode ? "#d07858"               : "#c87060";
  const leafB        = isDarkMode ? "#a05838"               : "#b06050";
  const indigoAccent = isDarkMode ? "#818cf8"               : "#6366f1";

  // ── Timeline content ───────────────────────────────────────────────────────
  // To add a new era: copy one block object and append it to this array.
  // To edit text: change the strings below — layout handles itself.
  const TIMELINE = [
    {
      era: "2023 – Present",
      title: "Advanced Technical Specialization",
      leafColor: leafA,
      delay: 0,
      entries: [
        {
          category: "Systems & Security",
          text: "Built a cloud-based SIEM (Microsoft Sentinel) lab to monitor live brute-force attacks; currently mastering threat hunting and vulnerability management.",
          subs: [],
        },
        {
          category: "Web Development",
          text: "Engineered a high-performance personal portfolio using React, Vite,and JSX with a focus on clean code and SEO.",
          subs: [],
        },
        {
          category: "Professional Certifications",
          text: null,
          subs: [
            { label: "Completed:",      body: "Google Cybersecurity Professional Certificate (Python, SQL, Linux).,Comptia Security+ 701 (May 2026)" },
            { label: "Active Pursuit:", body: "CompTIA CySA+ (August 2026)." },
          ],
        },
      ],
    },
    {
      era: "2019 – 2022",
      title: "Academic Foundation & Leadership",
      leafColor: leafB,
      delay: 0.1,
      entries: [
        {
          category: "Education",
          text: "B.A. in Computer Science | University of Colorado (Colorado) | Dec 2022.",
          subs: [],
        },
        {
          category: "Core Skills",
          text: "Networking (TCP/IP), Data Structures, Algorithms, and Software Engineering.",
          subs: [],
        },
        {
          category: "Leadership",
          text:"Managed residential security and crisis response as a Community Assistant for CU Boulder Housing.",
          subs: [],
        },
      ],
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full py-28 px-5
                 sm:px-10
                 md:px-16
                 lg:px-24"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}
    >
      <div className="max-w-4xl mx-auto">

        {/* ── Section header ── */}
        <div className="mb-16">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: activeTheme.accentNameColor, transition: "color 0.5s" }}>
            The journey
          </p>
          <h2
            id="about-heading"
            className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl leading-none"
            style={{ fontFamily: "'Playfair Display', serif", color: activeTheme.primaryNameColor, transition: "color 0.5s" }}
          >
            About{" "}<span style={{ color: activeTheme.accentNameColor }}>Me</span>
          </h2>
          <div className="w-48 h-0.5 rounded-full mt-5" aria-hidden="true"
            style={{ background: activeTheme.dividerGradient }} />
        </div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Vertical stem */}
          <div
            className="about-line absolute left-3.25 sm:left-4.75 -top-2 bottom-2 w-0.5 rounded-full mt-7 -ml-1.5"
            style={{ background: stemColor, transformOrigin: "top" }}
            aria-hidden="true"
          />

          {TIMELINE.map((block) => (
            <div
              key={block.era}
              className="about-entry relative pl-12 sm:pl-16 mb-20 last:mb-0"
              style={{ animationDelay: `${block.delay + 0.2}s` }}
            >
              {/* Leaf on stem */}
              <div className="absolute left-0 top-0" aria-hidden="true">
                <LeafBullet color={block.leafColor} delay={block.delay + 0.1} />
              </div>

              {/* Era badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4
                           text-xs font-bold tracking-widest uppercase backdrop-blur-sm"
                style={{ background: yearBg, color: yearText, border: `0.5px solid ${cardBorder}`, transition: "background 0.5s, color 0.5s" }}
              >
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" aria-hidden="true">
                  <path d="M6 1C9 1 11 3.5 11 6C11 9 8.5 11.5 6 11.5C3.5 11.5 1 9 1 6C1 3.5 3 1 6 1Z"
                    fill={yearText} opacity="0.7"/>
                  <line x1="6" y1="2" x2="6" y2="11" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinecap="round"/>
                </svg>
                {block.era}
              </div>

              {/* Era title */}
              <h3
                className="font-serif font-bold text-2xl sm:text-3xl mb-6 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif", color: activeTheme.primaryNameColor, transition: "color 0.5s" }}
              >
                {block.title}
              </h3>

              {/* Frosted card */}
              <div
                className="rounded-2xl p-6 sm:p-8 backdrop-blur-md"
                style={{
                  background: cardBg,
                  border: `0.5px solid ${cardBorder}`,
                  boxShadow: isDarkMode ? "0 8px 32px rgba(0,0,0,0.45)" : "0 8px 32px rgba(200,112,96,0.08)",
                  transition: "background 0.5s, border 0.5s, box-shadow 0.5s",
                }}
              >
                <ul className="list-none m-0 p-0">
                  {block.entries.map((entry, entryIdx) => (
                    <li key={entry.category} className="mb-7 last:mb-0">

                      <p className="text-xs font-bold tracking-widest uppercase mb-3"
                        style={{ color: indigoAccent, transition: "color 0.5s" }}>
                        {entry.category}
                      </p>

                      {entry.text && (
                        <div className="flex items-start gap-3">
                          <LeafBullet color={block.leafColor} delay={block.delay + 0.12 * (entryIdx + 1)} />
                          <p className="text-sm leading-relaxed pt-1 flex-1"
                            style={{ color: activeTheme.bodyTextColor, transition: "color 0.5s" }}>
                            {entry.text}
                          </p>
                        </div>
                      )}

                      {entry.subs.length > 0 && (
                        <ul className="list-none m-0 p-0 mt-3 ml-1 flex flex-col gap-3">
                          {entry.subs.map((sub) => (
                            <li key={sub.label} className="flex items-start gap-2.5">
                              <SmallLeaf color={block.leafColor} />
                              <p className="text-sm leading-relaxed pt-0.5 flex-1"
                                style={{ color: activeTheme.bodyTextColor, transition: "color 0.5s" }}>
                                <strong style={{ color: activeTheme.accentNameColor }}>{sub.label}</strong>{" "}{sub.body}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}

                      {entryIdx < block.entries.length - 1 && (
                        <div className="mt-7 h-px w-full" aria-hidden="true"
                          style={{ background: dividerColor }} />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
