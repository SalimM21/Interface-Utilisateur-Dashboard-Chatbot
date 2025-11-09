// theme.js
// Configuration des thèmes clair/sombre

export const lightTheme = {
    '--font-family': "'Inter', sans-serif",
    '--text-primary': '#111827',
    '--text-secondary': '#6b7280',
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f9fafb',
    '--border': '#e5e7eb',
    '--accent': '#3b82f6',
    '--accent-hover': '#2563eb',
    '--error': '#ef4444',
    '--success': '#22c55e',
    '--warning': '#f59e0b',
};

export const darkTheme = {
    '--font-family': "'Inter', sans-serif", 
    '--text-primary': '#f3f4f6',
    '--text-secondary': '#9ca3af',
    '--bg-primary': '#111827',
    '--bg-secondary': '#1f2937',
    '--border': '#374151',
    '--accent': '#3b82f6',
    '--accent-hover': '#60a5fa',
    '--error': '#f87171',
    '--success': '#34d399',
    '--warning': '#fbbf24',
};

// Appliquer un thème
export const applyTheme = (theme) => {
    Object.keys(theme).forEach(key => {
        document.documentElement.style.setProperty(key, theme[key]);
    });
};

// Basculer entre les thèmes
export const toggleTheme = (currentTheme) => {
    return currentTheme === 'light' ? 'dark' : 'light';
};