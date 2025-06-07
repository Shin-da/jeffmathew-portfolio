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

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your server
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
  });
}

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

artGalleryItems.forEach(img => {
  img.addEventListener('click', function() {
    lightboxImg.src = this.src;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxBackdrop.addEventListener('click', closeLightbox);
document.addEventListener('keydown', function(e) {
  if (lightbox.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
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
}); 