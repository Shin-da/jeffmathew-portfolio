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

  // Initialize dark mode based on local storage or system preference
  const darkModeToggle = document.getElementById('darkModeToggle');
  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode === 'enabled') {
    setDarkMode(true, false);
  } else if (savedDarkMode === 'disabled') {
    setDarkMode(false, false);
  } else {
    setDarkMode(getSystemDark(), false);
  }

  // Toggle dark mode on button click
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      const isDarkMode = document.documentElement.hasAttribute('data-theme', 'dark'); // Check the data-theme attribute
      setDarkMode(!isDarkMode);
    });
  }

  // IG-Style Story Highlights Click functionality (now opens modal)
  const igHighlightModalLabel = document.getElementById('igHighlightModalLabel');
  const igHighlightModalBody = document.getElementById('igHighlightModalBody');

  document.querySelectorAll('.ig-highlight-card').forEach(card => {
    card.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent any default scroll behavior

      const highlightType = this.getAttribute('data-highlight');
      let modalTitle = '';
      let modalContent = '';

      // Remove active class from all highlight cards first
      document.querySelectorAll('.ig-highlight-card').forEach(hCard => hCard.classList.remove('active'));
      // Add active class to the clicked card
      this.classList.add('active');

      switch (highlightType) {
        case 'about':
          modalTitle = 'About Me';
          const aboutContent = document.querySelector('#about .about-description');
          modalContent = aboutContent ? aboutContent.innerHTML : '<p>About Me content not found.</p>';
          console.log('About Me Modal Content:', modalContent);
          break;
        case 'skills':
          modalTitle = 'Tech Stack';
          const skillsContent = document.getElementById('skills');
          modalContent = skillsContent ? skillsContent.querySelector('.detail-content').innerHTML : '<p>Tech Stack content not found.</p>';
          console.log('Skills Modal Content:', modalContent);
          break;
        case 'services':
          modalTitle = 'My Services';
          modalContent = `
            <p>I offer a range of services including:</p>
            <ul>
              <li>Web Development (Frontend & Backend)</li>
              <li>Digital Art & Illustration</li>
              <li>AI Prompt Engineering</li>
              <li>System Automation</li>
              <li>Technical Tutoring</li>
            </ul>
            <p>Contact me for a custom quote!</p>
          `;
          console.log('Services Modal Content:', modalContent);
          break;
        case 'experience':
          modalTitle = 'Work Experience';
          const experienceContent = document.getElementById('experience');
          modalContent = experienceContent ? experienceContent.querySelector('.detail-content').innerHTML : '<p>Experience content not found.</p>';
          console.log('Experience Modal Content:', modalContent);
          break;
        case 'education':
          modalTitle = 'Education Background';
          const educationContent = document.getElementById('education');
          modalContent = educationContent ? educationContent.querySelector('.detail-content').innerHTML : '<p>Education content not found.</p>';
          console.log('Education Modal Content:', modalContent);
          break;
        default:
          modalTitle = 'Information';
          modalContent = '<p>No content available for this highlight.</p>';
          console.log('Default Modal Content:', modalContent);
      }

      igHighlightModalLabel.textContent = modalTitle;
      igHighlightModalBody.innerHTML = modalContent;

      // Ensure the modal is a fresh instance or correctly retrieved
      const modalElement = document.getElementById('igHighlightModal');
      let currentModalInstance = bootstrap.Modal.getInstance(modalElement);

      if (!currentModalInstance) {
        // If no instance exists, create a new one
        currentModalInstance = new bootstrap.Modal(modalElement);
      }
      currentModalInstance.show(); // Use the reliable instance to show the modal
    });
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