console.log('main.js loaded');
// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Log navbar height for debugging scrollspy offset
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.getElementById('mainNav');
  if (navbar) {
    console.log('Navbar offset height:', navbar.offsetHeight);
  }
});

// Smooth scrolling for navigation links and active state management
document.querySelectorAll('#navbarResponsive a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    // Update active class on click
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(navLink => navLink.classList.remove('active'));
    this.classList.add('active');

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Auto-collapse mobile navbar after clicking a link
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (window.getComputedStyle(navbarToggler).display !== 'none') {
      navbarToggler.click();
    }
  });
});

// Custom Scrollspy to manage active state on scroll
window.addEventListener('scroll', function() {
  const scrollPos = window.scrollY + 85; // Add offset for fixed navbar

  document.querySelectorAll('section, div.container-fluid').forEach(section => {
    const sectionId = section.getAttribute('id');
    if (sectionId) { // Ensure section has an ID
      const navLink = document.querySelector(`#navbarResponsive a[href="#${sectionId}"]`);
      if (navLink) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < (sectionTop + sectionHeight)) {
          // Only add active class if it's not already active to prevent unnecessary re-renders
          if (!navLink.classList.contains('active')) {
            document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
          }
        }
      }
    }
  });
});

// Set initial active link on DOMContentLoaded or page load/refresh
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
  // Check if there's a hash in the URL on load
  const currentHash = window.location.hash;
  let foundActive = false;

  if (currentHash) {
    const initialNavLink = document.querySelector(`#navbarResponsive a[href="${currentHash}"]`);
    if (initialNavLink) {
      initialNavLink.classList.add('active');
      foundActive = true;
    }
  }

  // Fallback: if no hash or hash not found, set the first link (About) as active
  if (!foundActive && navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }

  // Removed Bootstrap ScrollSpy initialization

  // Auto-collapse mobile navbar after clicking a link (already handled in click listener, can remove redundant part here)
  // const navbarToggler = document.querySelector('.navbar-toggler');
  // const navLinksMobile = document.querySelectorAll('#navbarResponsive .nav-link');
  // navLinksMobile.forEach(link => {
  //   link.addEventListener('click', () => {
  //     if (window.getComputedStyle(navbarToggler).display !== 'none') {
  //       navbarToggler.click();
  //     }
  //   });
  // });

  // Back to Top button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.body.classList.add('page-fadein-active');
});

// Project image hover effect
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.querySelector('.project-overlay').style.opacity = '1';
  });
  
  card.addEventListener('mouseleave', function() {
    this.querySelector('.project-overlay').style.opacity = '0';
  });
});

// Art gallery image hover effect
document.querySelectorAll('.art-gallery-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.querySelector('img').style.transform = 'scale(1.1)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.querySelector('img').style.transform = 'scale(1)';
  });
});

// Art gallery image lightbox
const artGalleryItems = document.querySelectorAll('.art-gallery-item img');
const lightbox = document.getElementById('art-lightbox');
const lightboxImg = document.getElementById('art-lightbox-img');
const lightboxClose = document.getElementById('art-lightbox-close');
const lightboxBackdrop = document.querySelector('.art-lightbox-backdrop');

if (artGalleryItems && lightbox && lightboxImg) {
  artGalleryItems.forEach(img => {
    img.addEventListener('click', function() {
      lightboxImg.src = this.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
}

function closeLightbox() {
  if (lightbox) lightbox.style.display = 'none';
  if (lightboxImg) lightboxImg.src = '';
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', function(e) {
  if (lightbox && lightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
    closeLightbox();
  }
});

// IG-Style Art Gallery Filtering
const galleryFilters = document.querySelectorAll('.ig-gallery-filter');
const artCards = document.querySelectorAll('.ig-art-card');
galleryFilters.forEach(btn => {
  btn.addEventListener('click', function() {
    galleryFilters.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    artCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// IG-Style Art Gallery Lightbox (simplified for image only)
const igArtCards = document.querySelectorAll('.ig-art-card');
const igArtLightbox = document.getElementById('igArtLightbox');
const igArtLightboxImg = document.getElementById('igArtLightboxImg');
const igArtLightboxClose = document.getElementById('igArtLightboxClose');
const igArtLightboxBackdrop = document.querySelector('.ig-art-lightbox-backdrop');

igArtCards.forEach(card => {
  card.addEventListener('click', function() {
    const img = card.querySelector('img');
    igArtLightboxImg.src = img.src;
    igArtLightboxImg.alt = img.alt;
    igArtLightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});
function closeIgArtLightbox() {
  igArtLightbox.style.display = 'none';
  igArtLightboxImg.src = '';
  document.body.style.overflow = '';
}
if (igArtLightboxClose) igArtLightboxClose.addEventListener('click', closeIgArtLightbox);
if (igArtLightboxBackdrop) igArtLightboxBackdrop.addEventListener('click', closeIgArtLightbox);
document.addEventListener('keydown', function(e) {
  if (igArtLightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
    closeIgArtLightbox();
  }
});

// IG-Style Story Highlights Click functionality
document.querySelectorAll('.ig-highlight-card').forEach(card => {
  card.addEventListener('click', function() {
    const targetId = this.getAttribute('data-highlight');
    const targetSection = document.getElementById(targetId);
    const aboutDetailsCollapse = document.getElementById('aboutDetails');

    if (targetSection) {
      // Check if the target section is inside the aboutDetails collapse
      if (aboutDetailsCollapse && aboutDetailsCollapse.contains(targetSection)) {
        // Ensure the collapse is shown if it's not already
        if (!aboutDetailsCollapse.classList.contains('show')) {
          const bsCollapse = new bootstrap.Collapse(aboutDetailsCollapse, { toggle: false });
          bsCollapse.show();

          // Wait for the collapse transition to complete before scrolling
          aboutDetailsCollapse.addEventListener('shown.bs.collapse', () => {
            scrollToTarget(targetSection);
          }, { once: true });
        } else {
          // If already open, just scroll
          scrollToTarget(targetSection);
        }
      } else {
        // For sections not in aboutDetails (like #about itself)
        scrollToTarget(targetSection);
      }

      // Update active class for highlights
      document.querySelectorAll('.ig-highlight-card').forEach(hCard => hCard.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

function scrollToTarget(targetSection) {
  const navbarHeight = document.getElementById('mainNav').offsetHeight || 80;
  const scrollPosition = targetSection.offsetTop - navbarHeight;

  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth'
  });
}

// IG-Style Story Highlights Card Click (visual feedback, ready for modal/expand)
const igHighlightCards = document.querySelectorAll('.ig-highlight-card');
const igHighlightModal = document.getElementById('igHighlightModal');
const igHighlightModalBody = document.getElementById('igHighlightModalBody');
const igHighlightModalClose = document.getElementById('igHighlightModalClose');
const igHighlightModalBackdrop = document.querySelector('.ig-highlight-modal-backdrop');

const highlightContent = {
  about: `
    <h2 class="modal-section-title">About Me</h2>
    <p>I am Jeff Mathew Garcia, an IT graduate student who combines technical expertise with artistic vision. As a developer and artist, I bring creativity to everything I build, from websites to digital art. I'm passionate about creating beautiful, functional solutions that make an impact.</p>
    <p class="modal-item-subtitle" style="margin-top: 1rem;">"I believe in the perfect blend of technology and creativity."</p>
  `,
  skills: `
    <h2 class="modal-section-title">Tech Stack</h2>
    <div class="modal-grid-container">
      <div class="modal-item-container">
        <h3 class="modal-item-title"><i class="fas fa-code"></i> Frontend</h3>
        <ul class="modal-list">
          <li class="modal-list-item"><i class="fab fa-html5"></i> HTML5</li>
          <li class="modal-list-item"><i class="fab fa-css3-alt"></i> CSS3/Bootstrap</li>
          <li class="modal-list-item"><i class="fab fa-js-square"></i> JavaScript</li>
        </ul>
      </div>
      <div class="modal-item-container">
        <h3 class="modal-item-title"><i class="fas fa-server"></i> Backend</h3>
        <ul class="modal-list">
          <li class="modal-list-item"><i class="fab fa-php"></i> PHP</li>
          <li class="modal-list-item"><i class="fab fa-python"></i> Python</li>
          <li class="modal-list-item"><i class="fas fa-database"></i> MySQL</li>
        </ul>
      </div>
      <div class="modal-item-container">
        <h3 class="modal-item-title"><i class="fas fa-tools"></i> Tools</h3>
        <ul class="modal-list">
          <li class="modal-list-item"><i class="fab fa-git-alt"></i> Git & GitHub</li>
          <li class="modal-list-item"><i class="fas fa-server"></i> XAMPP</li>
          <li class="modal-list-item"><i class="fas fa-draw-polygon"></i> Graphic Design</li>
        </ul>
      </div>
    </div>
  `,
  services: `
    <h2 class="modal-section-title">Services</h2>
    <div class="modal-grid-container" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
      <div class="modal-item-container">
        <h3 class="modal-item-title"><i class="fas fa-laptop-code"></i> Web Development</h3>
        <ul class="modal-list">
          <li class="modal-list-item">Portfolio Websites</li>
          <li class="modal-list-item">Business Websites</li>
          <li class="modal-list-item">E-commerce Solutions</li>
        </ul>
      </div>
      <div class="modal-item-container">
        <h3 class="modal-item-title"><i class="fas fa-paint-brush"></i> Digital Art</h3>
        <ul class="modal-list">
          <li class="modal-list-item">Portraits</li>
          <li class="modal-list-item">Concept Art</li>
          <li class="modal-list-item">Illustrations</li>
        </ul>
      </div>
      <div class="modal-item-container">
        <h3 class="modal-item-title"><i class="fas fa-chalkboard-teacher"></i> Tutoring</h3>
        <ul class="modal-list">
          <li class="modal-list-item">Programming Help</li>
          <li class="modal-list-item">Web Development</li>
          <li class="modal-list-item">IT Concepts</li>
        </ul>
      </div>
    </div>
  `,
  experience: `
    <h2 class="modal-section-title">Experience</h2>
    <div style="margin-top: 1rem;">
      <div class="modal-item-container">
        <h3 class="modal-item-title">
          <i class="fas fa-building"></i> SP Madrid & Associates Law Firm
        </h3>
        <p class="modal-item-subtitle">Developer and AI Prompt Engineer (Internship)</p>
        <ul class="modal-list">
          <li class="modal-list-item">• Developed and maintained web applications</li>
          <li class="modal-list-item">• Implemented AI solutions for document processing</li>
          <li class="modal-list-item">• Collaborated with the legal team on tech solutions</li>
        </ul>
      </div>
      <div class="modal-item-container">
        <h3 class="modal-item-title">
          <i class="fas fa-graduation-cap"></i> Thesis Project
        </h3>
        <ul class="modal-list">
          <li class="modal-list-item">• Led frontend and backend development</li>
          <li class="modal-list-item">• Designed and implemented project features</li>
          <li class="modal-list-item">• Managed version control with GitHub</li>
        </ul>
      </div>
    </div>
  `,
  education: `
    <h2 class="modal-section-title">Education</h2>
    <div style="margin-top: 1rem;">
      <div class="modal-item-container">
        <h3 class="modal-item-title">
          <i class="fas fa-university"></i> Pamantasan ng Lungsod ng Muntinlupa
        </h3>
        <p class="modal-item-subtitle">BS Information Technology (2025 - Present)</p>
        <ul class="modal-list">
          <li class="modal-list-item">• Focus on Web Development</li>
          <li class="modal-list-item">• System Development</li>
          <li class="modal-list-item">• Database Management</li>
        </ul>
      </div>
      <div class="modal-item-container">
        <h3 class="modal-item-title">
          <i class="fas fa-school"></i> San Pedro Relocation Center National High School
        </h3>
        <p class="modal-item-subtitle">CHS - Computer Hardware Servicing Strand (2020-2021)</p>
        <ul class="modal-list">
          <li class="modal-list-item">• Computer Hardware Maintenance</li>
          <li class="modal-list-item">• Basic Networking</li>
          <li class="modal-list-item">• Technical Support</li>
        </ul>
      </div>
    </div>
  `
};

// Instagram-style story highlights functionality
document.addEventListener('DOMContentLoaded', function() {
    const highlightCards = document.querySelectorAll('.ig-highlight-card');
    const modal = document.createElement('div');
    modal.className = 'ig-highlight-modal';
    modal.style.display = 'none';
    document.body.appendChild(modal);

    highlightCards.forEach(card => {
        card.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const content = highlightContent[type];
            
            if (content) {
                // Create modal content
                modal.innerHTML = `
                    <div class="ig-highlight-modal-backdrop"></div>
                    <div class="ig-highlight-modal-content">
                        <button class="ig-highlight-modal-close">&times;</button>
                        <div class="ig-highlight-modal-body">
                            ${content}
                        </div>
                    </div>
                `;
                
                // Show modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Add active class to clicked card
                highlightCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Close modal when clicking backdrop or close button
                const backdrop = modal.querySelector('.ig-highlight-modal-backdrop');
                const closeBtn = modal.querySelector('.ig-highlight-modal-close');
                
                backdrop.addEventListener('click', closeModal);
                closeBtn.addEventListener('click', closeModal);
            }
        });
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        highlightCards.forEach(card => card.classList.remove('active'));
    }
});

// --- DARK MODE LOGIC (Instagram-inspired) ---
// Encapsulate theme logic in a self-executing function to prevent global pollution
(function() {
  console.log('Theme script loaded and running.');

  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlEl = document.documentElement; // Targets the <html> element
  const bodyEl = document.body; // Targets the <body> element

  /**
   * Sets the dark mode status and updates local storage.
   * @param {boolean} enabled - True for dark mode, false for light mode.
   * @param {boolean} save - Whether to save the preference to local storage.
   */
  function setDarkMode(enabled, save = true) {
    console.log(`setDarkMode called: enabled=${enabled}, save=${save}`);

    if (enabled) {
      htmlEl.setAttribute('data-theme', 'dark');
      bodyEl.classList.remove('light-mode');
      console.log('Theme: Dark Mode activated');
    } else {
      htmlEl.removeAttribute('data-theme');
      bodyEl.classList.add('light-mode');
      console.log('Theme: Light Mode activated');
    }

    // Update visual state of the toggle button
    if (darkModeToggle) {
      const toggleThumb = darkModeToggle.querySelector('.toggle-thumb');
      if (toggleThumb) {
        // The 'light-mode-active' class on the toggle-thumb visually shifts it for light mode
        if (enabled) {
          darkModeToggle.classList.remove('light-mode-active');
          toggleThumb.classList.remove('light-mode-active');
        } else {
          darkModeToggle.classList.add('light-mode-active');
          toggleThumb.classList.add('light-mode-active');
        }
        console.log('Toggle button visual state updated.');
      }
    }

    if (save) {
      localStorage.setItem('darkMode', enabled ? '1' : '0');
      console.log(`Theme preference saved to localStorage: ${enabled ? '1' : '0'}`);
    }
  }

  /**
   * Checks if the system prefers dark color scheme.
   * @returns {boolean} True if system prefers dark, false otherwise.
   */
  function getSystemDark() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log(`System prefers dark mode: ${prefersDark}`);
    return prefersDark;
  }

  // Initial theme setup on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('darkMode');
    console.log(`Initial load: Saved theme from localStorage: ${savedTheme}`);

    if (savedTheme === '1') {
      setDarkMode(true, false); // Apply dark mode from saved preference
    } else if (savedTheme === '0') {
      setDarkMode(false, false); // Apply light mode from saved preference
    } else {
      setDarkMode(getSystemDark(), false); // Apply system preference if no saved setting
    }

    // Add event listener to the toggle button
    if (darkModeToggle) {
      darkModeToggle.addEventListener('click', function() {
        console.log('Dark mode toggle clicked!');
        const currentThemeIsDark = htmlEl.getAttribute('data-theme') === 'dark';
        setDarkMode(!currentThemeIsDark, true); // Toggle theme and save preference
      });
    }
  });

  // Listen for system preference changes (only if no manual preference is saved)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const saved = localStorage.getItem('darkMode');
    if (saved === null) {
      console.log('System color scheme changed. Applying new system theme.');
      setDarkMode(e.matches, false);
    }
  });
})();

// Page fade-in on load
(function() {
  document.body.classList.add('page-fadein');
  window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.body.classList.add('page-fadein-active');
    }, 10);
  });
})();

// Show contact success message if redirected with #contact-success
if (window.location.hash === '#contact-success') {
  const successMsg = document.getElementById('contactSuccess');
  if (successMsg) successMsg.style.display = 'block';
  window.location.hash = '';
} 