/**
 * @file PortfolioPage.jsx
 * @description Top-level portfolio page — the ONLY file that owns theme state.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW SECTION (e.g. My Work)
 * ─────────────────────────────────────────────────────────────────────────────
 *  1. Create  src/components/sections/WorkSection.jsx
 *     — export a named function:  export function WorkSection({ activeTheme, isDarkMode }) { ... }
 *     — no canvas, no useThemeToggle, transparent background
 *  2. Import it here:
 *       import { WorkSection } from "./components/sections/WorkSection";
 *  3. Add one line inside <SpringLayout>:
 *       <WorkSection activeTheme={activeTheme} isDarkMode={isDarkMode} />
 *
 *  That is the entire integration. Canvas, theme, overlay — all inherited.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useThemeToggle }   from "../hooks/useThemeToggle";
import { SpringLayout }     from "../components/layout/SpringLayout";
import { HeroSection }      from "../components/sections/HeroSection";
import { AboutSection }     from "../components/sections/AboutSection";
import Projects  from "../components/sections/ProjectSection";
import {FooterSection} from "../components/sections/FooterSection";
export default function PortfolioPage() {
  const { isDarkMode, activeTheme, toggleTheme } = useThemeToggle();

  return (
    <SpringLayout activeTheme={activeTheme} isDarkMode={isDarkMode}>

      <HeroSection
        activeTheme={activeTheme}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      <AboutSection
        activeTheme={activeTheme}
        isDarkMode={isDarkMode}
      />
      <Projects
        activeTheme={activeTheme}
        isDarkMode={isDarkMode}
      />
      <FooterSection
        activeTheme={activeTheme}
        isDarkMode={isDarkMode}
      />
      {/*
        ── Add future sections here ──────────────────────────────────────────
        <WorkSection    activeTheme={activeTheme} isDarkMode={isDarkMode} />
        <ContactSection activeTheme={activeTheme} isDarkMode={isDarkMode} />
        ─────────────────────────────────────────────────────────────────────
      */}

    </SpringLayout>
  );
}
