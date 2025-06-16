// Theme mode handling
function setThemeMode(enabled, save = true) {
    const htmlEl = document.documentElement;
    const toggleButton = document.getElementById('darkModeToggle');
    
    if (enabled) {
        htmlEl.setAttribute('data-theme', 'dark');
        if (toggleButton) {
            toggleButton.setAttribute('aria-checked', 'true');
            toggleButton.classList.add('dark-mode-active');
        }
        if (save) {
            localStorage.setItem('theme', 'dark');
        }
    } else {
        htmlEl.setAttribute('data-theme', 'light');
        if (toggleButton) {
            toggleButton.setAttribute('aria-checked', 'false');
            toggleButton.classList.remove('dark-mode-active');
        }
        if (save) {
            localStorage.setItem('theme', 'light');
        }
    }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setThemeMode(savedTheme === 'dark', false);
    } else {
        setThemeMode(prefersDark, true);
    }

    const themeToggle = document.getElementById('darkModeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setThemeMode(currentTheme !== 'dark');
        });
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setThemeMode(e.matches, false);
        }
    });
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeTheme);
