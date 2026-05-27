/**
 * @file useThemeToggle.js
 * @description Custom hook — manages light/dark theme state.
 *
 * Reads OS prefers-color-scheme on first render so there is no
 * flash of the wrong theme before hydration.
 *
 * Returns:
 *   isDarkMode   {boolean}      — true when dark mode is active
 *   activeTheme  {ThemeTokens}  — the correct token set for the current mode
 *   toggleTheme  {Function}     — call this to flip the mode
 *
 * Usage:
 *   const { isDarkMode, activeTheme, toggleTheme } = useThemeToggle();
 */

import { useState, useCallback } from "react";
import THEME_TOKENS from "../theme/tokens";

export function useThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : false
  );

  const toggleTheme = useCallback(() => setIsDarkMode((prev) => !prev), []);
  const activeTheme = isDarkMode ? THEME_TOKENS.dark : THEME_TOKENS.light;

  return { isDarkMode, activeTheme, toggleTheme };
}
