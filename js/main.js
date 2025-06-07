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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
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

// Scrollspy (Bootstrap 5)
document.addEventListener('DOMContentLoaded', function() {
  if (window.bootstrap && bootstrap.ScrollSpy) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 80
    });
  }

  // Auto-collapse mobile navbar after clicking a link
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navLinks = document.querySelectorAll('#navbarResponsive .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });

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

// IG-Style Art Gallery Lightbox
const igArtCards = document.querySelectorAll('.ig-art-card');
const igArtLightbox = document.getElementById('igArtLightbox');
const igArtLightboxImg = document.getElementById('igArtLightboxImg');
const igArtLightboxTitle = document.getElementById('igArtLightboxTitle');
const igArtLightboxMeta = document.getElementById('igArtLightboxMeta');
const igArtLightboxClose = document.getElementById('igArtLightboxClose');
const igArtLightboxBackdrop = document.querySelector('.ig-art-lightbox-backdrop');

igArtCards.forEach(card => {
  card.addEventListener('click', function() {
    const img = card.querySelector('img');
    const title = card.querySelector('.ig-art-title')?.textContent || '';
    const meta = card.querySelector('.ig-art-meta')?.textContent || '';
    igArtLightboxImg.src = img.src;
    igArtLightboxImg.alt = img.alt;
    igArtLightboxTitle.textContent = title;
    igArtLightboxMeta.textContent = meta;
    igArtLightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});
function closeIgArtLightbox() {
  igArtLightbox.style.display = 'none';
  igArtLightboxImg.src = '';
  igArtLightboxTitle.textContent = '';
  igArtLightboxMeta.textContent = '';
  document.body.style.overflow = '';
}
if (igArtLightboxClose) igArtLightboxClose.addEventListener('click', closeIgArtLightbox);
if (igArtLightboxBackdrop) igArtLightboxBackdrop.addEventListener('click', closeIgArtLightbox);
document.addEventListener('keydown', function(e) {
  if (igArtLightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
    closeIgArtLightbox();
  }
});

// IG-Style Story Highlights Card Click (visual feedback, ready for modal/expand)
const igHighlightCards = document.querySelectorAll('.ig-highlight-card');
const igHighlightModal = document.getElementById('igHighlightModal');
const igHighlightModalBody = document.getElementById('igHighlightModalBody');
const igHighlightModalClose = document.getElementById('igHighlightModalClose');
const igHighlightModalBackdrop = document.querySelector('.ig-highlight-modal-backdrop');

const highlightContent = {
  about: `
    <h2 style="color: var(--header-color); font-family: 'Playfair Display', serif; font-size: 1.5rem;">About Me</h2>
    <p>I am Jeff Mathew Garcia, an IT graduate student who combines technical expertise with artistic vision. As a developer and artist, I bring creativity to everything I build, from websites to digital art. I'm passionate about creating beautiful, functional solutions that make an impact.</p>
  `,
  skills: `
    <h2 style="color: var(--header-color); font-family: 'Playfair Display', serif; font-size: 1.5rem;">Skills</h2>
    <ul style="list-style:none; padding:0; margin:0; display:flex; flex-wrap:wrap; gap:1rem;">
      <li><i class='fab fa-js-square'></i> JavaScript</li>
      <li><i class='fab fa-php'></i> PHP</li>
      <li><i class='fab fa-python'></i> Python</li>
      <li><i class='fas fa-database'></i> MySQL</li>
      <li><i class='fab fa-git-alt'></i> Git & GitHub</li>
      <li><i class='fas fa-server'></i> XAMPP</li>
      <li><i class='fas fa-draw-polygon'></i> Graphic Design</li>
      <li><i class='fab fa-html5'></i> HTML</li>
      <li><i class='fab fa-css3-alt'></i> CSS/Bootstrap</li>
    </ul>
  `,
  services: `
    <h2 style="color: var(--header-color); font-family: 'Playfair Display', serif; font-size: 1.5rem;">Services</h2>
    <ul style="padding-left:1.2em;">
      <li>Web Development (Portfolio, Business, E-commerce)</li>
      <li>System Development (Inventory, Management, Custom Solutions)</li>
      <li>Digital Art Commissions (Portraits, Concept Art, Illustrations)</li>
      <li>Graphic Design (Logos, Posters, Social Media)</li>
      <li>IT Tutoring & Programming Help</li>
    </ul>
  `,
  testimonials: `
    <h2 style="color: var(--header-color); font-family: 'Playfair Display', serif; font-size: 1.5rem;">Testimonials</h2>
    <blockquote style="font-style:italic; color:var(--saddle); border-left:4px solid var(--highlight); padding-left:1em;">"Jeff delivered exactly what I needed—creative, professional, and on time. Highly recommended!"<br><span style='color:var(--coral-tree); font-weight:500;'>— Client Name, Project Type</span></blockquote>
  `
};

igHighlightCards.forEach(card => {
  card.addEventListener('click', function() {
    igHighlightCards.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    const key = this.getAttribute('data-highlight');
    igHighlightModalBody.innerHTML = highlightContent[key] || '';
    igHighlightModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});
function closeIgHighlightModal() {
  igHighlightModal.style.display = 'none';
  igHighlightModalBody.innerHTML = '';
  document.body.style.overflow = '';
  igHighlightCards.forEach(c => c.classList.remove('active'));
}
if (igHighlightModalClose) igHighlightModalClose.addEventListener('click', closeIgHighlightModal);
if (igHighlightModalBackdrop) igHighlightModalBackdrop.addEventListener('click', closeIgHighlightModal);
document.addEventListener('keydown', function(e) {
  if (igHighlightModal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
    closeIgHighlightModal();
  }
});

// --- DARK MODE LOGIC (Instagram-inspired) ---
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, dark mode script running');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const htmlEl = document.documentElement;

  function setDarkMode(enabled, save = true) {
    if (enabled) {
      htmlEl.setAttribute('data-theme', 'dark');
    } else {
      htmlEl.removeAttribute('data-theme');
    }
    if (darkModeToggle) {
      darkModeToggle.classList.toggle('is-dark', enabled);
    }
    if (save) localStorage.setItem('darkMode', enabled ? '1' : '0');
  }

  function getSystemDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  // Initial theme check
  const saved = localStorage.getItem('darkMode');
  if (saved === '1') {
    setDarkMode(true, false);
  } else if (saved === '0') {
    setDarkMode(false, false);
  } else {
    setDarkMode(getSystemDark(), false);
  }

  // Toggle click
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      console.log('Toggle button clicked!');
      const isDark = htmlEl.getAttribute('data-theme') === 'dark';
      setDarkMode(!isDark, true);
    });
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    const saved = localStorage.getItem('darkMode');
    if (saved === null) {
      setDarkMode(e.matches, false);
    }
  });
});

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