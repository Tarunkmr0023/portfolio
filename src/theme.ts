export type Theme = "dark" | "light";

export const THEME_EVENT = "themechange";

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function toggleTheme(): void {
  const next: Theme = getTheme() === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be blocked; the toggle still works for this session.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}
