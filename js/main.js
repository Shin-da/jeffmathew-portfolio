console.log('main.js loaded');

/*
  ============================================================================
  JEFF MATHEW GARCIA PORTFOLIO - MAIN JAVASCRIPT
  ============================================================================
  
  Created by: Jeff Mathew Garcia (シン/shin)
  Website: https://shin-da.github.io/jeffmathew-portfolio/
  GitHub: https://github.com/shin-da/jeffmathew-portfolio
  
  This is the main JavaScript file that handles core functionality for the
  portfolio website including animations, interactions, and user experience
  enhancements.
  
  Features:
  - AOS (Animate On Scroll) initialization
  - Interactive project and art galleries
  - Lightbox functionality for images
  - View counter integration
  - Responsive navigation enhancements
  - Theme switching support
  
  Dependencies:
  - AOS library for scroll animations
  - Bootstrap 5.2.3 for UI components
  - Font Awesome 6.0.0 for icons
  
  Copyright © 2025 Jeff Mathew Garcia. All rights reserved.
  ============================================================================
*/

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false
});

document.addEventListener('DOMContentLoaded', function() {
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

// IG-Style Art Gallery Filtering (multi-category support)
const galleryFilters = document.querySelectorAll('.gallery-filter');
const artCards = document.querySelectorAll('.ig-art-card');
galleryFilters.forEach(btn => {
  btn.addEventListener('click', function() {
    galleryFilters.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    artCards.forEach(card => {
      const categories = card.getAttribute('data-category').split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
    // Update aria-selected
    galleryFilters.forEach(b => b.setAttribute('aria-selected', 'false'));
    this.setAttribute('aria-selected', 'true');
  });
});

// IG-Style Art Gallery Lightbox with navigation
const igArtCards = document.querySelectorAll('.ig-art-card');
const igArtLightbox = document.getElementById('galleryLightbox');
const igArtLightboxImg = document.getElementById('lightboxImage');
const igArtLightboxTitle = document.getElementById('lightboxTitle');
const igArtLightboxDesc = document.getElementById('lightboxDescription');
const igArtLightboxClose = document.getElementById('lightboxClose');
const igLightboxArrowLeft = document.querySelector('.ig-lightbox-arrow-left');
const igLightboxArrowRight = document.querySelector('.ig-lightbox-arrow-right');

let currentIndex = -1;
function openIgArtLightbox(idx) {
  const card = igArtCards[idx];
  const img = card.querySelector('img');
  igArtLightboxImg.src = img.src;
  igArtLightboxImg.alt = img.alt;
  igArtLightboxTitle.textContent = card.querySelector('.gallery-item-title')?.textContent || '';
  igArtLightboxDesc.textContent = card.querySelector('.gallery-item-category')?.textContent || '';
  igArtLightbox.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  currentIndex = idx;
  igArtLightboxImg.focus();
}
function closeIgArtLightbox() {
  igArtLightbox.style.display = 'none';
  igArtLightboxImg.src = '';
  document.body.style.overflow = '';
  currentIndex = -1;
}
function showPrevArt() {
  if (currentIndex > 0) openIgArtLightbox(currentIndex - 1);
}
function showNextArt() {
  if (currentIndex < igArtCards.length - 1) openIgArtLightbox(currentIndex + 1);
}
igArtCards.forEach((card, idx) => {
  card.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG' || e.target.classList.contains('ig-art-overlay')) {
      openIgArtLightbox(idx);
    }
  });
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', card.querySelector('.gallery-item-title')?.textContent || 'Artwork');
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') openIgArtLightbox(idx);
  });
});
if (igArtLightboxClose) igArtLightboxClose.addEventListener('click', closeIgArtLightbox);
if (igLightboxArrowLeft) igLightboxArrowLeft.addEventListener('click', showPrevArt);
if (igLightboxArrowRight) igLightboxArrowRight.addEventListener('click', showNextArt);
document.addEventListener('keydown', function(e) {
  if (igArtLightbox.style.display === 'flex') {
    if (e.key === 'Escape' || e.key === 'Esc') closeIgArtLightbox();
    if (e.key === 'ArrowLeft') showPrevArt();
    if (e.key === 'ArrowRight') showNextArt();
  }
});
// Trap focus in lightbox
igArtLightbox?.addEventListener('keydown', function(e) {
  if (e.key === 'Tab') {
    e.preventDefault();
    igArtLightboxClose.focus();
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

// View counter functionality
function updateViewCount() {
    const viewCountElement = document.getElementById('viewCount');
    if (viewCountElement) {
        fetch('view-counter.php?page=' + window.location.pathname.split('/').pop())
            .then(response => response.text())
            .then(count => {
                viewCountElement.textContent = count;
            })
            .catch(error => {
                console.error('Error updating view count:', error);
                viewCountElement.textContent = 'Error';
            });
    }
}

// Call updateViewCount when the page loads
document.addEventListener('DOMContentLoaded', updateViewCount);

// Gallery image fallback for missing images
igArtCards.forEach(card => {
  const img = card.querySelector('img');
  if (img) {
    img.onerror = function() {
      card.classList.add('ig-art-card--empty');
      img.style.display = 'none';
      // Optionally, add a fallback message
      if (!card.querySelector('.fallback-msg')) {
        const fallback = document.createElement('div');
        fallback.className = 'fallback-msg';
        fallback.innerHTML = '<i class="fas fa-image"></i> Image not found';
        fallback.style.padding = '2.5rem 0 1rem 0';
        fallback.style.textAlign = 'center';
        fallback.style.color = 'var(--subtle-text)';
        fallback.style.fontSize = '1.1rem';
        card.insertBefore(fallback, card.firstChild);
      }
    };
  }
});

/*
  ============================================================================
  END OF MAIN.JS
  ============================================================================
  
  This file contains all core functionality for the portfolio website.
  For modular organization, see individual files in the js/ directory.
  
  Created by: Jeff Mathew Garcia (シン/shin)
  Copyright © 2025 Jeff Mathew Garcia. All rights reserved.
  ============================================================================
*/ 