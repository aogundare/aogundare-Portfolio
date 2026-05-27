/**
 * @file tokens.js
 * @description Stone & Sakura design tokens — single source of truth.
 *
 * HOW TO RETHEME:
 *   Edit the values in this file only. Every component reads from here
 *   via the activeTheme prop — nothing else needs touching.
 *
 * PALETTE PHILOSOPHY:
 *   Indigo (#6366f1 / #818cf8)  — PRIMARY brand accent. Never replace this
 *                                  without updating nav underlines, rail icons,
 *                                  speech bubble text, and divider start colour.
 *   Terracotta (#c87060 / #d07858) — SECONDARY accent. Used for name line 2,
 *                                  CTA gradient, typewriter text, divider end.
 */

const THEME_TOKENS = {
  light: {
    // ── Canvas ───────────────────────────────────────────────────────────────
    canvasBgTop:  "#f0ece8",
    canvasBgMid:  "#e8ddd6",
    canvasBgBot:  "#e0d4c8",
    cloudFill:    "#d8cfc8",
    cloudOpacity: 0.30,
    petalColors: [
      "rgba(232,168,152,",
      "rgba(216,152,136,",
      "rgba(248,200,184,",
      "rgba(200,112,96,",
      "rgba(240,184,168,",
      "rgba(184,128,112,",
    ],
    leafBaseRgb:  [176, 84, 72],
    pollenColorA: "rgba(200,112,96,",
    pollenColorB: "rgba(160,120,88,",

    // ── UI ────────────────────────────────────────────────────────────────────
    overlayBg:             "rgba(240,236,232,0.12)",
    primaryNameColor:      "#2c1e18",
    accentNameColor:       "#c87060",
    typedRoleColor:        "#c87060",
    bodyTextColor:         "#2c1e18",
    navLinkColor:          "#4a3428",
    navUnderlineColor:     "#6366f1",
    sideRailLinkColor:     "#6366f1",
    sideRailBorderColor:   "rgba(99,102,241,0.18)",
    sideRailLineDivider:   "rgba(99,102,241,0.20)",
    primaryBtnBg:          "linear-gradient(135deg,#c87060,#e8a898)",
    primaryBtnShadow:      "rgba(200,112,96,0.38)",
    badgeBg:               "rgba(240,236,232,0.92)",
    badgeBorderColor:      "#d8c8b8",
    badgeTextColor:        "#4a3428",
    // portraitGlowColor:     "rgba(200,112,96,0.25)",
    portraitGlowColor: "rgba(208,120,88,0.15)",
    portraitPlaceholderBg: "#f0ece8",
    portraitPlaceholderBorder: "rgba(200,112,96,0.30)",
    speechBubbleBg:          "rgba(240,236,232,0.94)",
    speechBubbleTextColor:   "#6366f1",
    speechBubbleBorderColor: "rgba(99,102,241,0.18)",
    dividerGradient:         "linear-gradient(90deg,#6366f1,#c87060)",
  },

  dark: {
    // ── Canvas ───────────────────────────────────────────────────────────────
    canvasBgTop:  "#0c0f14",
    canvasBgMid:  "#100d0a",
    canvasBgBot:  "#080604",
    cloudFill:    "#3a2a18",
    cloudOpacity: 0.18,
    petalColors: [
      "rgba(208,120,88,",
      "rgba(232,152,120,",
      "rgba(200,104,72,",
      "rgba(248,184,152,",
      "rgba(180,96,64,",
      "rgba(240,168,136,",
    ],
    leafBaseRgb:  [200, 104, 72],
    pollenColorA: "rgba(208,120,88,",
    pollenColorB: "rgba(176,136,88,",

    // ── UI ────────────────────────────────────────────────────────────────────
    overlayBg:             "rgba(0,0,0,0.38)",
    primaryNameColor:      "#f0e0c8",
    accentNameColor:       "#d07858",
    typedRoleColor:        "#e89878",
    bodyTextColor:         "#d8c8a8",
    navLinkColor:          "#a89070",
    navUnderlineColor:     "#818cf8",
    sideRailLinkColor:     "#818cf8",
    sideRailBorderColor:   "rgba(129,140,248,0.18)",
    sideRailLineDivider:   "rgba(129,140,248,0.20)",
    primaryBtnBg:          "linear-gradient(135deg,#c86848,#d07858)",
    primaryBtnShadow:      "rgba(200,104,72,0.45)",
    badgeBg:               "rgba(12,15,20,0.85)",
    badgeBorderColor:      "rgba(58,42,24,0.80)",
    badgeTextColor:        "#a89070",
    portraitGlowColor:     "rgba(208,120,88,0.15)",
    portraitPlaceholderBg: "#180e08",
    portraitPlaceholderBorder: "rgba(208,120,88,0.32)",
    speechBubbleBg:          "rgba(12,15,20,0.92)",
    speechBubbleTextColor:   "#818cf8",
    speechBubbleBorderColor: "rgba(129,140,248,0.22)",
    dividerGradient:         "linear-gradient(90deg,#818cf8,#d07858)",
  },
};

export default THEME_TOKENS;
