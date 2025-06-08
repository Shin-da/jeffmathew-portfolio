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
    <p style="margin-top: 1rem; color: var(--highlight);">"I believe in the perfect blend of technology and creativity."</p>
  `,
  skills: `
    <h2 style="color: var(--header-color); font-family: 'Playfair Display', serif; font-size: 1.5rem;">Tech Stack</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
      <div style="background: var(--card-bg); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;"><i class="fas fa-code"></i> Frontend</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><i class="fab fa-html5"></i> HTML5</li>
          <li><i class="fab fa-css3-alt"></i> CSS3/Bootstrap</li>
          <li><i class="fab fa-js-square"></i> JavaScript</li>
        </ul>
      </div>
      <div style="background: var(--card-bg); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;"><i class="fas fa-server"></i> Backend</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><i class="fab fa-php"></i> PHP</li>
          <li><i class="fab fa-python"></i> Python</li>
          <li><i class="fas fa-database"></i> MySQL</li>
        </ul>
      </div>
      <div style="background: var(--card-bg); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;"><i class="fas fa-tools"></i> Tools</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li><i class="fab fa-git-alt"></i> Git & GitHub</li>
          <li><i class="fas fa-server"></i> XAMPP</li>
          <li><i class="fas fa-draw-polygon"></i> Graphic Design</li>
        </ul>
      </div>
    </div>
  `,
  services: `
    <h2 style="color: var(--header-color); font-family: 'Playfair Display', serif; font-size: 1.5rem;">Services</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem;">
      <div style="background: var(--card-bg); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;"><i class="fas fa-laptop-code"></i> Web Development</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>Portfolio Websites</li>
          <li>Business Websites</li>
          <li>E-commerce Solutions</li>
        </ul>
      </div>
      <div style="background: var(--card-bg); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;"><i class="fas fa-paint-brush"></i> Digital Art</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>Portraits</li>
          <li>Concept Art</li>
          <li>Illustrations</li>
        </ul>
      </div>
      <div style="background: var(--card-bg); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;"><i class="fas fa-chalkboard-teacher"></i> Tutoring</h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>Programming Help</li>
          <li>Web Development</li>
          <li>IT Concepts</li>
        </ul>
      </div>
    </div>
  `,
  experience: `
    <h2 style="color: var(--header-color); font-family: 'Playfair Display', serif; font-size: 1.5rem;">Experience</h2>
    <div style="margin-top: 1rem;">
      <div style="background: var(--card-bg); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 1rem;">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;">
          <i class="fas fa-building"></i> SP Madrid & Associates Law Firm
        </h3>
        <p style="color: var(--highlight); margin-bottom: 0.5rem;">Developer and AI Prompt Engineer (Internship)</p>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>• Developed and maintained web applications</li>
          <li>• Implemented AI solutions for document processing</li>
          <li>• Collaborated with the legal team on tech solutions</li>
        </ul>
      </div>
      <div style="background: var(--card-bg); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;">
          <i class="fas fa-graduation-cap"></i> Thesis Project
        </h3>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>• Led frontend and backend development</li>
          <li>• Designed and implemented project features</li>
          <li>• Managed version control with GitHub</li>
        </ul>
      </div>
    </div>
  `,
  education: `
    <h2 style="color: var(--header-color); font-family: 'Playfair Display', serif; font-size: 1.5rem;">Education</h2>
    <div style="margin-top: 1rem;">
      <div style="background: var(--card-bg); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 1rem;">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;">
          <i class="fas fa-university"></i> Pamantasan ng Lungsod ng Muntinlupa
        </h3>
        <p style="color: var(--highlight); margin-bottom: 0.5rem;">BS Information Technology (2025 - Present)</p>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>• Focus on Web Development</li>
          <li>• System Development</li>
          <li>• Database Management</li>
        </ul>
      </div>
      <div style="background: var(--card-bg); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--border-color);">
        <h3 style="color: var(--header-color); font-size: 1.1rem; margin-bottom: 0.8rem;">
          <i class="fas fa-school"></i> San Pedro Relocation Center National High School
        </h3>
        <p style="color: var(--highlight); margin-bottom: 0.5rem;">CHS - Computer Hardware Servicing Strand (2020-2021)</p>
        <ul style="list-style:none; padding:0; margin:0;">
          <li>• Computer Hardware Maintenance</li>
          <li>• Basic Networking</li>
          <li>• Technical Support</li>
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