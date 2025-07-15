/*
  ============================================================================
  JEFF MATHEW GARCIA PORTFOLIO - THEME HANDLER
  ============================================================================
  
  Created by: Jeff Mathew Garcia (シン/shin)
  Website: https://shin-da.github.io/jeffmathew-portfolio/
  GitHub: https://github.com/shin-da/jeffmathew-portfolio
  
  This file manages the dark/light theme switching functionality including:
  - Theme toggle button functionality
  - Local storage persistence
  - System preference detection
  - Smooth theme transitions
  - Accessibility considerations
  
  Features:
  - Toggle between dark and light themes
  - Remembers user preference
  - Respects system theme preference
  - Smooth CSS transitions
  - ARIA labels for accessibility
  
  Copyright © 2025 Jeff Mathew Garcia. All rights reserved.
  ============================================================================
*/

// Theme mode handling
function setThemeMode(enabled, save = true) {
    const htmlEl = document.documentElement;
    const desktopToggle = document.getElementById('darkModeToggle');
    const mobileToggle = document.getElementById('darkModeToggleMobile');
    
    if (enabled) {
        htmlEl.setAttribute('data-theme', 'dark');
        if (desktopToggle) {
            desktopToggle.setAttribute('aria-checked', 'true');
            desktopToggle.classList.add('dark-mode-active');
        }
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-checked', 'true');
            mobileToggle.classList.add('dark-mode-active');
        }
        if (save) {
            localStorage.setItem('theme', 'dark');
        }
    } else {
        htmlEl.setAttribute('data-theme', 'light');
        if (desktopToggle) {
            desktopToggle.setAttribute('aria-checked', 'false');
            desktopToggle.classList.remove('dark-mode-active');
        }
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-checked', 'false');
            mobileToggle.classList.remove('dark-mode-active');
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

    // Setup desktop theme toggle
    const desktopToggle = document.getElementById('darkModeToggle');
    if (desktopToggle) {
        desktopToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setThemeMode(currentTheme !== 'dark');
        });
    }

    // Setup mobile theme toggle
    const mobileToggle = document.getElementById('darkModeToggleMobile');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
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
