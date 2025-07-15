// about-enhancements.js
// Custom JS for About page enhancements

document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('journey-gallery');
  if (gallery) {
    lightGallery(gallery, {
      selector: '.gallery-item',
      download: false,
      counter: false,
    });
  }
}); 