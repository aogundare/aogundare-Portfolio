/**
 * @file HeroSection.jsx
 * @description Hero landing section — purely presentational.
 *
 * This component owns NO theme state and NO canvas.
 * Both are provided by SpringLayout via PortfolioPage.
 *
 * ─────────────────────────────────────────────
 *  HOW TO SWAP YOUR PHOTO
 * ─────────────────────────────────────────────
 *  1. Replace /public/abraham.png with your new photo
 *  2. If you rename the file, update PORTRAIT_SRC below
 *  That is the only edit needed.
 * ─────────────────────────────────────────────
 *
 * @param {{ activeTheme, isDarkMode, toggleTheme }} props
 */

import { useState, useEffect } from "react";
import { linkedInURL, githubLink, email, resumeLink } from "../../constants/contact";
// ─────────────────────────────────────────────────────────────────────────────
// ★  PORTRAIT CONFIGURATION  ←  ONLY EDIT THESE LINES TO SWAP YOUR PHOTO
// ─────────────────────────────────────────────────────────────────────────────

const PORTRAIT_SRC           = "./personalPhoto.svg"; // replace with your photo path (keep the quotes)
const PORTRAIT_IS_PLACEHOLDER = false;
const PORTRAIT_ALT           = "Abraham Ogundare — cybersecurity analyst";

// ─────────────────────────────────────────────────────────────────────────────
// Hook: useTypingAnimation
// ─────────────────────────────────────────────────────────────────────────────

function useTypingAnimation(wordList, typeSpeedMs = 75, pauseDurationMs = 2000) {
  const [displayedText,  setDisplayedText]  = useState("");
  const [activeWordIndex,setActiveWordIndex] = useState(0);
  const [charIndex,      setCharIndex]       = useState(0);
  const [isDeleting,     setIsDeleting]      = useState(false);

  useEffect(() => {
    const word = wordList[activeWordIndex];
    let id;
    if (!isDeleting && charIndex < word.length) {
      id = setTimeout(() => setCharIndex((c) => c + 1), typeSpeedMs);
    } else if (!isDeleting && charIndex === word.length) {
      id = setTimeout(() => setIsDeleting(true), pauseDurationMs);
    } else if (isDeleting && charIndex > 0) {
      id = setTimeout(() => setCharIndex((c) => c - 1), typeSpeedMs / 2);
    } else {
      setIsDeleting(false);
      setActiveWordIndex((w) => (w + 1) % wordList.length);
    }
    setDisplayedText(word.slice(0, charIndex));
    return () => clearTimeout(id);
  }, [charIndex, isDeleting, activeWordIndex, wordList, typeSpeedMs, pauseDurationMs]);

  return displayedText;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component: AnimatedNavLink
// ─────────────────────────────────────────────────────────────────────────────

function AnimatedNavLink({ label, href, linkColor, underlineColor, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}       onBlur={() => setHovered(false)}
      style={{ color: hovered ? underlineColor : linkColor }}
      className="relative inline-flex items-center gap-1.5 font-medium text-sm
                 tracking-widest no-underline pb-1 transition-colors duration-200
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                 focus-visible:ring-indigo-500 rounded-sm"
    >
      {icon && (
        <span aria-hidden="true" className="shrink-0" style={{ width: 15, height: 15 }}>
          {icon}
        </span>
      )}
      {label}
      <span
        aria-hidden="true"
        style={{
          background: underlineColor,
          width: hovered ? "100%" : "0%",
          boxShadow: hovered ? `0 0 8px ${underlineColor}` : "none",
        }}
        className="absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300 ease-out block"
      />
    </a>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
// Component: SocialRail
// Edit SOCIAL_LINKS array to add/remove links — nothing else needs changing.
// ─────────────────────────────────────────────────────────────────────────────

function SocialRail({ activeTheme }) {
  const SOCIAL_LINKS = [
    {
      id: "github",
      href: "https://github.com/abrahamogundare",
      label: "GitHub profile (opens in new tab)",
      opensNewTab: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      id: "linkedin",
      href: "https://linkedin.com/in/abrahamogundare",
      label: "LinkedIn profile (opens in new tab)",
      opensNewTab: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      id: "resume",
      href: resumeLink,
      label: "Download resume (PDF)",
      opensNewTab: true,
      isDownload: true,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/>
          <polyline points="9 15 12 18 15 15"/>
        </svg>
      ),
    },
    // {
    //   id: "email",
    //   href: `mailto:${email}`,
    //   label: "Send an email to Abraham",
    //   icon: (
    //     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    //       strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    //       <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    //       <polyline points="22,6 12,13 2,6"/>
    //     </svg>
    //   ),
    // }
  ];

  return (
    <aside
      className="hidden sm:flex flex-col items-center gap-5 fixed left-5 z-30 md:left-6 lg:left-8"
      style={{ bottom: "calc(50% - 80px)", animation: "fadeSlideUp 0.9s ease 1.2s both" }}
      aria-label="Social and contact links"
    >
      <div aria-hidden="true" className="w-px h-14"
        style={{ background: `linear-gradient(to bottom, transparent, ${activeTheme.sideRailLineDivider})`, transition: "background .5s" }} />

      {SOCIAL_LINKS.map(({ id, href, label, icon, isDownload, opensNewTab }) => (
        <a key={id} href={href} aria-label={label}
          {...(isDownload  ? { download: true } : {})}
          {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex items-center justify-center w-9 h-9 rounded-full border
                     hover:scale-110 focus:outline-none focus-visible:ring-2
                     focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
          style={{
            color: activeTheme.sideRailLinkColor,
            borderColor: activeTheme.sideRailBorderColor,
            backdropFilter: "blur(8px)",
            transition: "color .3s, border-color .3s, transform .2s",
          }}
        >
          {icon}
        </a>
      ))}

      <div aria-hidden="true" className="w-px h-14"
        style={{ background: `linear-gradient(to top, transparent, ${activeTheme.sideRailLineDivider})`, transition: "background .5s" }} />
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component: PortraitSlot
// ─────────────────────────────────────────────────────────────────────────────

function PortraitSlot({ activeTheme, isDarkMode }) {
  return (
    <div className="animate-portrait relative flex items-end justify-center">
      <div aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-12 rounded-full z-0"
        style={{ background: activeTheme.portraitGlowColor, filter: "blur(24px)", transition: "background 0.6s" }}
      />
      {PORTRAIT_IS_PLACEHOLDER ? (
        <div
          className="relative z-10 flex flex-col items-center justify-end w-64 sm:w-80 md:w-96 lg:w-105"
          style={{
            aspectRatio: "3/4",
            background: activeTheme.portraitPlaceholderBg,
            border: `2px dashed ${activeTheme.portraitPlaceholderBorder}`,
            borderRadius: "18px", overflow: "hidden",
            transition: "background 0.5s, border 0.5s",
          }}
          role="img"
          aria-label="Portrait placeholder — replace with your photo"
        >
          <svg aria-hidden="true" viewBox="0 0 160 210" fill="none" className="w-full" style={{ marginBottom: "-2px" }}>
            <ellipse cx="80" cy="218" rx="76" ry="52" fill={isDarkMode ? "rgba(99,102,241,0.38)" : "rgba(99,102,241,0.2)"} />
            <rect x="67" y="132" width="26" height="28" rx="8"  fill={isDarkMode ? "rgba(129,140,248,0.42)" : "rgba(99,102,241,0.24)"} />
            <ellipse cx="80" cy="110" rx="39" ry="45"          fill={isDarkMode ? "rgba(129,140,248,0.46)" : "rgba(99,102,241,0.26)"} />
            <ellipse cx="80" cy="70"  rx="39" ry="18"          fill={isDarkMode ? "rgba(79,70,229,0.62)"  : "rgba(79,70,229,0.32)"}  />
            <rect x="41" y="68"  width="11" height="32" rx="5" fill={isDarkMode ? "rgba(79,70,229,0.62)"  : "rgba(79,70,229,0.32)"}  />
            <rect x="108" y="68" width="11" height="32" rx="5" fill={isDarkMode ? "rgba(79,70,229,0.62)"  : "rgba(79,70,229,0.32)"}  />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 opacity-0 hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(0,0,0,0.58)", borderRadius: "16px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span style={{ color: "#fff", fontSize: "0.65rem", fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase" }}>Add your photo</span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.58rem", fontFamily: "monospace" }}>PORTRAIT_SRC</span>
          </div>
        </div>
      ) : (
        <img src={PORTRAIT_SRC} alt={PORTRAIT_ALT}
          className="relative z-10 object-contain object-bottom block w-64 sm:w-80 md:w-96 lg:w-105"
          style={{ 
            filter: `drop-shadow(0 0px 20px ${activeTheme.portraitGlowColor})`,
            transition: "filter 0.6s", 
            maxHeight: "520px",
            maskImage: `
              linear-gradient(to bottom, black 60%, transparent 95%),
              linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)
            `,
            WebkitMaskImage: `
              linear-gradient(to bottom, black 60%, transparent 95%),
              linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)
            `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      )}
    </div>
  );
}

// Lets talk button cooldown logic
// This is about the cool down for the let talk button in the hero section, to prevent spamming the email link. After clicking the button, it becomes disabled for 10 seconds, and then re-enabled. This is done by setting a state variable isButtonDisabled to true when the button is clicked, and then using setTimeout to set it back to false after 10 seconds. The button's disabled attribute is set based on the value of isButtonDisabled, which prevents multiple clicks in quick succession.

// 

// const handleLetsTalkClick = () => {
//   // 1. set cooldown to true
//   // 2. open the mailto link
//   // 3. after 5 seconds set cooldown back to false
//   setisCoolingDown(true);
//   window.location.href = `mailto:${email}`;
//   setTimeout(() => setisCoolingDown(false), 5000);
// };
// HeroSection — named export
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection({ activeTheme, isDarkMode, toggleTheme }) {
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // mobile menu open state

  const handleLetsTalkClick = () => {
    setIsCoolingDown(true);
    window.location.href = `mailto:${email}`;
    setTimeout(() => setIsCoolingDown(false), 10000); // 10 second cooldown
  }
  const ROLE_LIST = [
    "Aspiring /Cybersecurity Analyst.",
    "IT Professional.",
    "Problem Solver.",
  ];

  const currentTypedRole = useTypingAnimation(ROLE_LIST);
  const themeModeLabel   = isDarkMode ? "Switch to light mode" : "Switch to dark mode";
  const themeModeEmoji   = isDarkMode ? "☀️" : "🌙";

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col font-sans"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      aria-label="Portfolio hero"
    >
      {/* Global styles scoped to this section — animations + fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap');

        @keyframes cursorBlink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeSlideUp   { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes badgePop      { 0%{opacity:0;transform:scale(.82) translateY(10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes portraitFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes nameGlowPulse { 0%,100%{text-shadow:0 0 16px rgba(200,112,96,.22)} 50%{text-shadow:0 0 42px rgba(200,112,96,.55),0 0 80px rgba(99,102,241,.15)} }
        @keyframes leafDrift     { 0%{opacity:0;transform:translateY(24px) rotate(-8deg)} 100%{opacity:1;transform:translateY(0) rotate(0deg)} }
        @keyframes leafSway      { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        @keyframes lineGrow      { from{transform:scaleY(0);transform-origin:top} to{transform:scaleY(1);transform-origin:top} }

        .logo-theme-btn:hover .theme-mode-icon { transform:rotate(22deg) scale(1.2); }
        .theme-mode-icon { transition:transform .3s ease; display:inline-block; }
        .cta-round-btn { transition:transform .25s ease, box-shadow .25s ease; }
        .cta-round-btn:hover { transform:scale(1.1) rotate(-4deg); }

        .animate-hero-1 { animation:fadeSlideUp .9s ease .20s both; }
        .animate-hero-2 { animation:fadeSlideUp .9s ease .35s both; }
        .animate-hero-3 { animation:fadeSlideUp .9s ease .50s both; }
        .animate-hero-4 { animation:fadeSlideUp .9s ease .70s both; }
        .animate-hero-5 { animation:fadeSlideUp .9s ease 1.00s both; }
        .animate-badge  { animation:badgePop .7s cubic-bezier(.34,1.56,.64,1) .30s both; }
        .animate-portrait   { animation:portraitFloat 5s ease-in-out infinite; }
        .animate-name-glow  { animation:nameGlowPulse 3.5s ease-in-out infinite; }
        .animate-cursor     { animation:cursorBlink 1s step-end infinite; }
        .about-leaf { animation:leafDrift .6s ease both, leafSway 4s ease-in-out infinite .6s; }
        .about-line { animation:lineGrow .8s ease both; }
        .about-entry{ animation:fadeSlideUp .7s ease both; }

        :focus-visible { outline:2px solid #6366f1; outline-offset:3px; border-radius:4px; }

        @media (prefers-reduced-motion: reduce) {
          .animate-hero-1,.animate-hero-2,.animate-hero-3,.animate-hero-4,.animate-hero-5,
          .animate-badge,.animate-portrait,.animate-name-glow,.animate-cursor,
          .about-leaf,.about-line,.about-entry {
            animation:none !important; opacity:1 !important; transform:none !important;
          }
        }
      `}</style>

      {/* Left social rail */}
      <SocialRail activeTheme={activeTheme} />

      <header className=" sticky top-0 z-20" style={{ animation: "fadeSlideUp 0.8s ease both" }}>
        <nav
          aria-label="Main navigation"
          className="flex justify-between items-center px-5 py-5 sm:pr-8 md:pr-12 lg:pr-16"
        >
          {/* ── Logo / theme toggle ── */}
          <button
            className="logo-theme-btn flex items-center gap-2 bg-transparent border-0 cursor-pointer p-0 focus:outline-none"
            onClick={toggleTheme}
            aria-label={themeModeLabel}
            aria-pressed={isDarkMode}
            title={themeModeLabel}
          >
            <span aria-hidden="true" className="font-serif font-bold text-xl tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              <span style={{ color: activeTheme.primaryNameColor, transition: "color .5s" }}>Abra</span>
              <span style={{ color: activeTheme.accentNameColor,  transition: "color .5s" }}>ham</span>
            </span>
            <span className="theme-mode-icon text-sm opacity-50" aria-hidden="true">{themeModeEmoji}</span>
          </button>
 
          {/* ── Desktop nav links — hidden below 768px ── */}
          <ul className="hidden md:flex items-center gap-6 md:gap-8 list-none m-0 p-0" role="list">
            <li>
              <AnimatedNavLink label="About Me" href="#about"
                linkColor={activeTheme.navLinkColor} underlineColor={activeTheme.navUnderlineColor}
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>}
              />
            </li>
            <li>
              <AnimatedNavLink label="My Work" href="#work"
                linkColor={activeTheme.navLinkColor} underlineColor={activeTheme.navUnderlineColor}
                icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/></svg>}
              />
            </li>
          </ul>
 
          {/* ── Hamburger button — visible below 768px only ── */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-9 h-9 bg-transparent border-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {/* Hamburger lines — animate to X when open */}
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 22,
                height: 2,
                borderRadius: 2,
                background: activeTheme.navLinkColor,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: isOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 22,
                height: 2,
                borderRadius: 2,
                background: activeTheme.navLinkColor,
                transition: "opacity 0.3s ease",
                opacity: isOpen ? 0 : 1,
              }}
            />
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 22,
                height: 2,
                borderRadius: 2,
                background: activeTheme.navLinkColor,
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: isOpen ? "translateY(-7px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </nav>
 
        {/* ── Dropdown menu — slides down below 768px ── */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Mobile navigation menu"
          style={{
            maxHeight: isOpen ? "400px" : "0px",
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
          className="md:hidden"
        >
          <div
            style={{
              background: activeTheme.speechBubbleBg,
              borderTop: `1px solid ${activeTheme.badgeBorderColor}`,
              borderBottom: `1px solid ${activeTheme.badgeBorderColor}`,
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              padding: "1rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {/* About Me */}
            <a
              href="#about"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0.75rem 0.5rem",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: activeTheme.navLinkColor,
                borderBottom: `1px solid ${activeTheme.badgeBorderColor}`,
                transition: "color 0.2s ease",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
              About Me
            </a>
 
            {/* My Work */}
            <a
              href="#work"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0.75rem 0.5rem",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: activeTheme.navLinkColor,
                borderBottom: `1px solid ${activeTheme.badgeBorderColor}`,
                transition: "color 0.2s ease",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/></svg>
              My Work
            </a>
 
            {/* GitHub */}
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0.75rem 0.5rem",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: activeTheme.navLinkColor,
                borderBottom: `1px solid ${activeTheme.badgeBorderColor}`,
                transition: "color 0.2s ease",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
 
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/abraham-ogundare"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0.75rem 0.5rem",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: activeTheme.navLinkColor,
                borderBottom: `1px solid ${activeTheme.badgeBorderColor}`,
                transition: "color 0.2s ease",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
 
            {/* Resume */}
            <a
              href={resumeLink}
              download
              onClick={() => setIsOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0.75rem 0.5rem",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                color: activeTheme.accentNameColor,
                transition: "color 0.2s ease",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
              Download Resume
            </a>
          </div>
        </div>
 
        {/* ── Click outside overlay — closes menu when tapping outside ── */}
        {isOpen && (
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: -1,
            }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </header>

      {/* ── Main hero content ── */}
      <main
        id="main-content"
        className="relative z-10 flex-1 flex items-center
                   px-5 pb-24 pt-6
                   sm:pr-8 sm:pb-16 sm:pt-4
                   md:pr-12 md:pb-20 md:pt-2
                   lg:pr-16 lg:pb-24"
        aria-label="Portfolio introduction"
      >
        <article
          className="flex flex-col items-center gap-6 w-full max-w-5xl mx-auto
                     sm:flex-col sm:gap-8
                     md:flex-row md:items-end md:gap-6
                     lg:gap-10 xl:gap-16"
          aria-labelledby="hero-name-heading"
        >
          {/* LEFT: copy */}
          <section
            className="flex-1 min-w-0 flex flex-col items-center text-center md:items-start md:text-left"
            aria-label="Personal introduction"
          >
            {/* Speech bubble */}
            <div className="animate-hero-1 mb-4 relative inline-block" role="presentation" aria-hidden="true">
              <span
                className="inline-block px-4 py-1.5 rounded-lg text-xs font-bold tracking-widest backdrop-blur-md border"
                style={{ background: activeTheme.speechBubbleBg, borderColor: activeTheme.speechBubbleBorderColor, color: activeTheme.speechBubbleTextColor, transition: "background .5s, color .5s" }}
              >
                It&apos;s me 👋
              </span>
              <span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 md:left-5 md:translate-x-0 w-0 h-0"
                style={{ borderLeft: "8px solid transparent", borderRight: "8px solid transparent", borderTop: `8px solid ${activeTheme.speechBubbleBg}` }}
              />
            </div>

            {/* Name */}
            <h1
              id="hero-name-heading"
              onClick={toggleTheme} title={themeModeLabel}
              className="animate-hero-2 font-serif font-bold leading-none mb-3 cursor-pointer select-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="animate-name-glow block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                style={{ color: activeTheme.primaryNameColor, transition: "color .5s" }}>Abraham</span>
              <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
                style={{ color: activeTheme.accentNameColor, transition: "color .5s" }}>Ogundare</span>
            </h1>

            {/* Typewriter role */}
            <div
              className="animate-hero-3 text-xs font-semibold tracking-widest uppercase mb-4 sm:text-sm"
              style={{ color: activeTheme.typedRoleColor, transition: "color .5s" }}
              aria-live="polite" aria-label={`Current role: ${currentTypedRole}`}
            >
              <span aria-hidden="true">{currentTypedRole}</span>
              <span aria-hidden="true" className="animate-cursor inline-block w-0.5 h-[1em] ml-0.5 align-middle"
                style={{ background: activeTheme.typedRoleColor }} />
            </div>

            {/* Divider */}
            <div aria-hidden="true" className="animate-hero-3 w-11 h-0.5 rounded-full mb-5"
              style={{ background: activeTheme.dividerGradient }} />

            {/* Bio */}
            <p
              className="animate-hero-4 text-sm leading-relaxed w-full max-w-md mb-5 sm:text-base md:text-sm lg:text-base"
              style={{ color: activeTheme.bodyTextColor, textShadow: isDarkMode ? "0 1px 10px rgba(0,0,0,.8)" : "0 1px 5px rgba(255,255,255,.7)", transition: "color .5s" }}
            >
              <strong style={{ color: activeTheme.accentNameColor }}>Developer by training. Defender by instinct.</strong>{" "}
              A Colorado-based Computer Scientist who stopped choosing between building software and securing it — I became both.
              I write applications engineered to last:{" "}
              <em>scalable, secure, and built for the people who depend on them.</em>
            </p>

            {/* Badge */}
            <div
              role="status" aria-label="Currently open to new opportunities"
              className="animate-badge inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border backdrop-blur-md"
              style={{ background: activeTheme.badgeBg, borderColor: activeTheme.badgeBorderColor, transition: "background .5s, border .5s" }}
            >
              <span aria-hidden="true" className="w-2 h-2 rounded-full bg-green-500 inline-block"
                style={{ boxShadow: "0 0 0 3px rgba(34,197,94,.25)" }} />
              <span className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: activeTheme.badgeTextColor, transition: "color .5s" }}>Open to Opportunities</span>
            </div>

            {/* CTA */}
            <div className="animate-hero-5" role="group" aria-label="Primary contact action">
              <button
                onClick={handleLetsTalkClick}
                disabled={isCoolingDown}
                className="cta-round-btn flex flex-col items-center justify-center rounded-full
                          text-white font-bold text-sm tracking-tight text-center
                          w-20 h-20 sm:w-24 sm:h-24
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-400"
                style={{
                  background: activeTheme.primaryBtnBg,
                  boxShadow: isCoolingDown ? "none" : `0 8px 28px ${activeTheme.primaryBtnShadow}`,
                  cursor: isCoolingDown ? "not-allowed" : "pointer",
                  opacity: isCoolingDown ? 0.6 : 1,
                  lineHeight: 1.3,
                  transition: "background .3s, box-shadow .3s, opacity .3s",
                }}
                aria-label={isCoolingDown ? "Email client opening..." : "Send Abraham an email"}
              >
                {isCoolingDown ? (
                  <span aria-hidden="true">sending...</span>
                ) : (
                  <>
                    <span aria-hidden="true">let&apos;s</span>
                    <span aria-hidden="true">talk</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* RIGHT: portrait */}
          <aside
            className="hidden sm:flex shrink-0 items-end justify-center self-end sm:h-100 md:h-120 lg:h-135"
            aria-label="Portrait of Abraham Ogundare"
          >
            <PortraitSlot activeTheme={activeTheme} isDarkMode={isDarkMode} />
          </aside>
        </article>
      </main>
    </section>
  );
}

