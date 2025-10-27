/**
 * ---------
 * Gestion des thèmes clair / sombre pour l'application
 */

export const lightTheme = {
  colors: {
    background: "#f9fafb",
    primary: "#3b82f6",
    secondary: "#facc15",
    textPrimary: "#111827",
    textSecondary: "#6b7280",
    cardBackground: "#ffffff",
    border: "#e5e7eb",
  },
  fontFamily: "'Inter', sans-serif",
};

export const darkTheme = {
  colors: {
    background: "#1f2937",
    primary: "#3b82f6",
    secondary: "#fbbf24",
    textPrimary: "#f9fafb",
    textSecondary: "#d1d5db",
    cardBackground: "#374151",
    border: "#4b5563",
  },
  fontFamily: "'Inter', sans-serif",
};

/**
 * Helper pour appliquer le thème en tant que CSS variables
 */
export const applyTheme = (theme) => {
  const root = document.documentElement;
  Object.keys(theme.colors).forEach((key) => {
    root.style.setProperty(`--color-${key}`, theme.colors[key]);
  });
  root.style.setProperty("--font-family", theme.fontFamily);
};

/**
 * Toggle thème clair/sombre
 */
export const toggleTheme = (currentTheme) => {
  const newTheme = currentTheme === "light" ? darkTheme : lightTheme;
  applyTheme(newTheme);
  return currentTheme === "light" ? "dark" : "light";
};
