/*
  ============================================================================
  JEFF MATHEW GARCIA PORTFOLIO - NAVIGATION SYSTEM
  ============================================================================
  
  Created by: Jeff Mathew Garcia (シン/shin)
  Website: https://shin-da.github.io/jeffmathew-portfolio/
  GitHub: https://github.com/shin-da/jeffmathew-portfolio
  
  This file handles all navigation-related functionality including:
  - Smooth scrolling to sections
  - Mobile menu toggle and animations
  - Active section highlighting
  - Scroll-based navbar effects
  - Accessibility enhancements
  
  Features:
  - Responsive mobile navigation
  - Smooth scroll behavior
  - Active state management
  - Keyboard navigation support
  - ARIA accessibility compliance
  
  Copyright © 2025 Jeff Mathew Garcia. All rights reserved.
  ============================================================================
*/

// Enhanced Navigation System
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('mainNav');
        this.navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
        this.sections = document.querySelectorAll('section[id], div[id]');
        this.currentPage = this.getCurrentPage();
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }

    init() {
        this.setupNavbarBehavior();
        this.setupSectionNavigation();
        this.setupPageNavigation();
        this.setupMobileNavigation();
        this.setupBreadcrumbs();
        this.setupScrollIndicators();
        this.setupKeyboardNavigation();
        this.setupActiveStateManagement();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path.endsWith('index.html')) return 'home';
        if (path.includes('about.html')) return 'about';
        if (path.includes('projects.html')) return 'projects';
        if (path.includes('gallery.html')) return 'gallery';
        if (path.includes('blog/')) return 'blog';
        return 'home';
    }

    setupNavbarBehavior() {
        // Enhanced navbar scroll behavior
        let lastScrollTop = 0;
        const navbar = this.navbar;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class
            if (scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide/show navbar on scroll (mobile only)
            if (window.innerWidth <= 768) {
                if (scrollTop > lastScrollTop && scrollTop > 100) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
            }
            
            lastScrollTop = scrollTop;
        });

        // Handle brand click for non-homepage navigation
        const brand = document.querySelector('.navbar-brand');
        if (brand && this.currentPage !== 'home') {
            brand.addEventListener('click', (e) => {
                // Brand serves as home link on secondary pages
                // No special handling needed as it's a regular link
            });
        }
    }

    setupSectionNavigation() {
        // Enhanced smooth scrolling for section links
        this.navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const target = document.querySelector(targetId);
                    
                    if (target) {
                        this.smoothScrollTo(targetId);
                        this.updateActiveLink(link);
                        this.closeMobileMenu();
                    }
                });
            }
        });

        // Enhanced scrollspy with better performance
        this.setupScrollspy();
    }

    setupScrollspy() {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.updateActiveSection(sectionId);
                }
            });
        }, observerOptions);

        this.sections.forEach(section => {
            if (section.getAttribute('id')) {
                observer.observe(section);
            }
        });
    }

    updateActiveSection(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    setupPageNavigation() {
        // Enhanced page navigation with loading states
        this.navLinks.forEach(link => {
            if (!link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', (e) => {
                    this.handlePageNavigation(e, link);
                });
            }
        });
    }

    handlePageNavigation(e, link) {
        const href = link.getAttribute('href');
        
        // Add loading state
        link.classList.add('loading');
        
        // Show page transition
        this.showPageTransition(() => {
            window.location.href = href;
        });
    }

    showPageTransition(callback) {
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        
        setTimeout(() => {
            callback();
        }, 300);
    }

    setupMobileNavigation() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            // Enhanced mobile menu behavior
            navbarToggler.addEventListener('click', () => {
                const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
                
                if (!isExpanded) {
                    this.openMobileMenu();
                } else {
                    this.closeMobileMenu();
                }
            });

            // Mobile close button
            const mobileMenuClose = navbarCollapse.querySelector('.mobile-menu-close');
            if (mobileMenuClose) {
                mobileMenuClose.addEventListener('click', () => {
                    this.closeMobileMenu();
                });
            }

            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeMobileMenu();
                }
            });
        }
    }

    openMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navbarToggler.setAttribute('aria-expanded', 'true');
        navbarCollapse.classList.add('show');
        document.body.classList.add('mobile-menu-open');
        
        // Animate menu items
        const menuItems = navbarCollapse.querySelectorAll('.nav-item');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.classList.add('menu-item-enter');
        });
    }

    closeMobileMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navbarToggler.setAttribute('aria-expanded', 'false');
        navbarCollapse.classList.remove('show');
        document.body.classList.remove('mobile-menu-open');
        
        // Remove animation classes
        const menuItems = navbarCollapse.querySelectorAll('.nav-item');
        menuItems.forEach(item => {
            item.classList.remove('menu-item-enter');
        });
    }

    setupBreadcrumbs() {
        // Auto-generate breadcrumbs for pages
        const breadcrumbContainer = document.querySelector('.breadcrumb-container');
        if (breadcrumbContainer && this.currentPage !== 'home') {
            const breadcrumbs = this.generateBreadcrumbs();
            breadcrumbContainer.innerHTML = breadcrumbs;
        }
    }

    generateBreadcrumbs() {
        const breadcrumbs = [
            { text: 'Home', href: this.currentPage === 'blog' ? '../index.html' : 'index.html' }
        ];

        switch (this.currentPage) {
            case 'about':
                breadcrumbs.push({ text: 'About', href: null, active: true });
                break;
            case 'projects':
                breadcrumbs.push({ text: 'Projects', href: null, active: true });
                break;
            case 'gallery':
                breadcrumbs.push({ text: 'Gallery', href: null, active: true });
                break;
            case 'blog':
                breadcrumbs.push({ text: 'Blog', href: 'index.html' });
                // Add current post title if available
                const postTitle = document.querySelector('.blog-post-title');
                if (postTitle) {
                    breadcrumbs.push({ text: postTitle.textContent, href: null, active: true });
                }
                break;
        }

        return this.renderBreadcrumbs(breadcrumbs);
    }

    renderBreadcrumbs(breadcrumbs) {
        return `
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
                <ol class="breadcrumb">
                    ${breadcrumbs.map((crumb, index) => `
                        <li class="breadcrumb-item ${crumb.active ? 'active' : ''}" ${crumb.active ? 'aria-current="page"' : ''}>
                            ${crumb.href ? `<a href="${crumb.href}">${crumb.text}</a>` : crumb.text}
                        </li>
                    `).join('')}
                </ol>
            </nav>
        `;
    }

    setupScrollIndicators() {
        // Add scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    setupKeyboardNavigation() {
        // Keyboard navigation support
        document.addEventListener('keydown', (e) => {
            // Alt + N to focus navigation
            if (e.altKey && e.key === 'n') {
                e.preventDefault();
                const firstNavLink = document.querySelector('.nav-link');
                if (firstNavLink) firstNavLink.focus();
            }

            // Arrow keys for navigation (when nav is focused)
            if (document.activeElement.classList.contains('nav-link')) {
                const navLinks = Array.from(this.navLinks);
                const currentIndex = navLinks.indexOf(document.activeElement);
                
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextIndex = (currentIndex + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = currentIndex === 0 ? navLinks.length - 1 : currentIndex - 1;
                    navLinks[prevIndex].focus();
                }
            }
        });
    }

    setupActiveStateManagement() {
        // Enhanced active state management
        if (this.currentPage === 'home') {
            // Set initial active link based on URL hash or first section
            const hash = window.location.hash;
            if (hash) {
                const targetLink = document.querySelector(`a[href="${hash}"]`);
                if (targetLink) {
                    this.updateActiveLink(targetLink);
                }
            } else {
                // Set first link as active by default
                const firstLink = this.navLinks[0];
                if (firstLink) {
                    this.updateActiveLink(firstLink);
                }
            }
        } else {
            // Set active link based on current page
            this.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes(this.currentPage)) {
                    this.updateActiveLink(link);
                }
            });
        }
    }

    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    smoothScrollTo(target, offset = 80) {
        const targetElement = typeof target === 'string' ? document.querySelector(target) : target;
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

// Export for potential use in other modules
window.NavigationManager = NavigationManager; 