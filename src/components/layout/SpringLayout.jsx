/**
 * @file SpringLayout.jsx
 * @description Page-level layout shell that provides the animated spring
 * canvas background to every section rendered inside it.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO ADD A NEW SECTION
 * ─────────────────────────────────────────────────────────────────────────────
 *  1. Create your section file in src/components/sections/
 *  2. Accept { activeTheme, isDarkMode } as props — that's all you need
 *  3. Open PortfolioPage.jsx and add one line:
 *       <YourSection activeTheme={activeTheme} isDarkMode={isDarkMode} />
 *
 *  Rules for every new section:
 *   ✓  position: relative (or use Tailwind `relative`)
 *   ✓  transparent background — the canvas shows through
 *   ✓  use activeTheme.X for every colour
 *   ✗  never add a SpringCanvas inside a section
 *   ✗  never import useThemeToggle in a section
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Layout tree:
 *   SpringLayout (relative, full width)
 *   ├── SpringCanvas  (absolute inset-0, z-0) — one instance, full height
 *   ├── overlay div   (absolute inset-0, z-1) — shared tint
 *   └── children div  (relative,         z-2) — hero, about, work, …
 */

import { useRef, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// SpringCanvas — animated petal / leaf / pollen scene
// Fades in on mount, auto-pauses after 8 s of inactivity.
// Receives activeTheme so colours flip instantly on dark/light toggle.
// ─────────────────────────────────────────────────────────────────────────────

function SpringCanvas({ activeTheme }) {
  const canvasRef       = useRef(null);
  const activeThemeRef  = useRef(activeTheme);
  const isAnimatingRef  = useRef(true);
  const inactivityTimer = useRef(null);

  // Keep the ref in sync with the latest theme without re-running the effect
  useEffect(() => { activeThemeRef.current = activeTheme; }, [activeTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let rafId, canvasW, canvasH, opacity = 0;

    const petals = [], leaves = [], pollens = [];
    const clouds = [
      { x: 80,  y: 60,  r: 38, spd: 0.12 },
      { x: 300, y: 40,  r: 28, spd: 0.08 },
      { x: 620, y: 75,  r: 50, spd: 0.15 },
      { x: 920, y: 48,  r: 35, spd: 0.10 },
    ];

    // ── Particle factories ──────────────────────────────────────────────────

    function makePetal(fromTop = false) {
      const t = activeThemeRef.current;
      return {
        x:         Math.random() * canvasW,
        y:         fromTop ? -20 - Math.random() * 100 : Math.random() * canvasH,
        radius:    5  + Math.random() * 9,
        ci:        Math.floor(Math.random() * t.petalColors.length),
        alpha:     0.4 + Math.random() * 0.4,
        fallSpd:   0.35 + Math.random() * 1.0,
        drift:     (Math.random() - 0.5) * 0.7,
        rot:       Math.random() * Math.PI * 2,
        rotSpd:    (Math.random() - 0.5) * 0.03,
        wobble:    Math.random() * Math.PI * 2,
        wobbleF:   0.012 + Math.random() * 0.02,
        scaleX:    0.55 + Math.random() * 0.5,
      };
    }

    function makeleaf(fromTop = false) {
      const [r, g, b] = activeThemeRef.current.leafBaseRgb;
      return {
        x:       Math.random() * canvasW,
        y:       fromTop ? -30 : Math.random() * canvasH,
        size:    8  + Math.random() * 12,
        r:       r  + Math.floor(Math.random() * 40),
        g:       g  + Math.floor(Math.random() * 30),
        b:       b  + Math.floor(Math.random() * 30),
        alpha:   0.22 + Math.random() * 0.32,
        fallSpd: 0.25 + Math.random() * 0.7,
        drift:   (Math.random() - 0.5) * 0.45,
        rot:     Math.random() * Math.PI * 2,
        rotSpd:  (Math.random() - 0.5) * 0.02,
        wobble:  Math.random() * Math.PI * 2,
        wobbleF: 0.01 + Math.random() * 0.015,
      };
    }

    function makePollen() {
      return {
        x: Math.random() * canvasW, y: Math.random() * canvasH,
        r: 1.2 + Math.random() * 2.4,
        a: 0.1 + Math.random() * 0.5,
        aDir: (Math.random() > 0.5 ? 1 : -1) * 0.007,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        useA: Math.random() > 0.5,
      };
    }

    // ── Draw helpers ────────────────────────────────────────────────────────

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(p.scaleX, 1);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.radius, p.radius * 1.65, 0, 0, Math.PI * 2);
      ctx.fillStyle = activeThemeRef.current.petalColors[p.ci] + p.alpha + ")";
      ctx.fill();
      ctx.restore();
    }

    function drawLeaf(l) {
      ctx.save();
      ctx.translate(l.x, l.y);
      ctx.rotate(l.rot);
      ctx.beginPath();
      ctx.moveTo(0, -l.size);
      ctx.bezierCurveTo( l.size * 0.8, -l.size * 0.4,  l.size * 0.8, l.size * 0.4, 0,  l.size);
      ctx.bezierCurveTo(-l.size * 0.8,  l.size * 0.4, -l.size * 0.8,-l.size * 0.4, 0, -l.size);
      ctx.fillStyle = `rgba(${l.r},${l.g},${l.b},${l.alpha})`;
      ctx.fill();
      ctx.restore();
    }

    function drawCloud(c) {
      const t  = activeThemeRef.current;
      const wx = (c.x % (canvasW + 120)) - 60;
      ctx.save();
      ctx.globalAlpha = t.cloudOpacity;
      ctx.fillStyle   = t.cloudFill;
      ctx.beginPath();
      ctx.arc(wx,               c.y,               c.r,        0, Math.PI * 2);
      ctx.arc(wx + c.r * 0.8,   c.y - c.r * 0.3,   c.r * 0.75, 0, Math.PI * 2);
      ctx.arc(wx + c.r * 1.5,   c.y,               c.r * 0.6,  0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // ── Lifecycle ───────────────────────────────────────────────────────────

    function populate() {
      canvasW = canvas.width  = canvas.offsetWidth;
      canvasH = canvas.height = canvas.offsetHeight;
      petals.length = 0; leaves.length = 0; pollens.length = 0;
      for (let i = 0; i < 35; i++) petals.push(makePetal());
      for (let i = 0; i < 12; i++) leaves.push(makeleaf());
      for (let i = 0; i < 20; i++) pollens.push(makePollen());
    }

    function resetTimer() {
      isAnimatingRef.current = true;
      clearTimeout(inactivityTimer.current);
      inactivityTimer.current = setTimeout(() => { isAnimatingRef.current = false; }, 8000);
    }

    window.addEventListener("pointermove", resetTimer, { passive: true });
    window.addEventListener("keydown",     resetTimer, { passive: true });
    window.addEventListener("scroll",      resetTimer, { passive: true });
    resetTimer();

    function frame() {
      // Fade-in over ~1.5 s
      if (opacity < 1) { opacity = Math.min(opacity + 0.008, 1); canvas.style.opacity = opacity; }

      if (!isAnimatingRef.current) { rafId = requestAnimationFrame(frame); return; }

      const t = activeThemeRef.current;
      ctx.clearRect(0, 0, canvasW, canvasH);

      // Background gradient
      const bg = ctx.createLinearGradient(0, 0, 0, canvasH);
      bg.addColorStop(0,   t.canvasBgTop);
      bg.addColorStop(0.5, t.canvasBgMid);
      bg.addColorStop(1,   t.canvasBgBot);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvasW, canvasH);

      // Clouds
      clouds.forEach((c) => { c.x += c.spd; if (c.x > canvasW + 120) c.x = -120; drawCloud(c); });

      // Petals
      petals.forEach((p) => {
        p.wobble += p.wobbleF; p.x += p.drift + Math.sin(p.wobble) * 0.55;
        p.y += p.fallSpd; p.rot += p.rotSpd;
        if (p.y > canvasH + 20) Object.assign(p, makePetal(true));
        drawPetal(p);
      });

      // Leaves
      leaves.forEach((l) => {
        l.wobble += l.wobbleF; l.x += l.drift + Math.sin(l.wobble) * 0.35;
        l.y += l.fallSpd; l.rot += l.rotSpd;
        if (l.y > canvasH + 30) Object.assign(l, makeleaf(true));
        drawLeaf(l);
      });

      // Pollen
      pollens.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.a += p.aDir;
        if (p.a > 0.65 || p.a < 0.08) p.aDir *= -1;
        if (p.x < 0 || p.x > canvasW || p.y < 0 || p.y > canvasH) {
          p.x = Math.random() * canvasW; p.y = Math.random() * canvasH;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = (p.useA ? t.pollenColorA : t.pollenColorB) + p.a + ")";
        ctx.fill();
      });

      rafId = requestAnimationFrame(frame);
    }

    canvas.style.opacity = "0";
    populate();
    frame();

    const ro = new ResizeObserver(populate);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      clearTimeout(inactivityTimer.current);
      window.removeEventListener("pointermove", resetTimer);
      window.removeEventListener("keydown",     resetTimer);
      window.removeEventListener("scroll",      resetTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full block"
      style={{ opacity: 0 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SpringLayout — exported layout shell
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wraps all portfolio sections with a single shared spring canvas background.
 * Theme state lives in PortfolioPage and flows down as props.
 *
 * @param {{ children: React.ReactNode, activeTheme: object, isDarkMode: boolean }} props
 */
export function SpringLayout({ children, activeTheme, isDarkMode }) {
  return (
    <div
      className="relative w-full min-h-screen font-sans"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* ── One canvas, spans the full combined height of all sections ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        <SpringCanvas activeTheme={activeTheme} />
      </div>

      {/* ── Single shared overlay tint ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-500"
        style={{ background: activeTheme.overlayBg, zIndex: 1 }}
      />

      {/* ── All sections render here — transparent, canvas visible through ── */}
      <div
      className="relative z-2 sm:pl-20 md:pl-22 lg:pl-24"  
      style={{  position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
