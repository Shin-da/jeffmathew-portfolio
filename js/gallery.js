/**
 * Gallery JavaScript - Dedicated JS file for gallery functionality
 * Handles filtering, lightbox, navigation, and interactive features
 */

// Gallery items data
const galleryItems = [
    {
        title: "Kugisaki Nobara",
        description: "A detailed traditional pencil sketch capturing the essence of this beloved character. This piece showcases my attention to detail and love for anime art.",
        image: "assets/images/kugisaki-nobara.jpg",
        category: "Traditional Art • Portraits",
        date: "2025",
        likes: "1.2k",
        comments: "250"
    },

    {
        title: "Eren Yeager",
        description: "A dynamic sketch inspired by the popular web novel and manhwa. This piece explores character design and dramatic composition.",
        image: "assets/images/eren-aot.jpg",
        category: "Traditional Art",
        date: "2023",
        likes: "800",
        comments: "150"
    },  
    {
        title: "Solo Leveling",
        description: "A dynamic sketch inspired by the popular web novel and manhwa. This piece explores character design and dramatic composition.",
        image: "assets/images/solo-leveling.jpg",
        category: "Traditional Art",
        date: "2023",
        likes: "800",
        comments: "150"
    },
    {
        title: "Sukuna (Jujutsu Kaisen) - Commissioned",
        description: "A commissioned traditional sketch of Sukuna from Jujutsu Kaisen. This piece was created for a client and has been sold. It showcases my ability to work with client specifications while maintaining artistic quality.",
        image: "assets/images/sukuna.jpeg",
        category: "Traditional Art • Commissioned",
        date: "2023",
        likes: "800",
        comments: "150"
    },
    {
        title: "Random Sketch",
        description: "A traditional painting that demonstrates my versatility in different artistic mediums and techniques.",
        image: "assets/images/random-sketch-2.webp",
        category: "Traditional Art",
        date: "2025",
        likes: "700",
        comments: "120"
    },
    {
        title: "Random Sketch",
        description: "An intricate ink drawing showcasing precision and contrast. This piece highlights the beauty of monochromatic art.",
        image: "assets/images/random-sketch.jpg",
        category: "Traditional Art",
        date: "2022",
        likes: "600",
        comments: "90"
    },
    
    {
        title: "Okarun and Momo (Dandadan)",
        description: "Concept art piece exploring the unique style and energy of this modern manga series. Focuses on character expression and movement.",
        image: "assets/images/okarun-momo.jpg",
        category: "Traditional Art • Concept",
        date: "2025",
        likes: "950",
        comments: "180"
    },
    {
        title: "Okarun (Dandadan)",
        description: "Original character design concept that demonstrates my creative process and ability to develop unique visual identities.",
        image: "assets/images/okarun.jpg",
        category: "Traditional Art",
        date: "2025",
        likes: "1.5k",
        comments: "300"
    },
    {
        title: "Random Sketch",
        description: "An intricate ink drawing showcasing precision and contrast. This piece highlights the beauty of monochromatic art.",
        image: "assets/images/random.jpg",
        category: "Traditional Art",
        date: "2022",
        likes: "600",
        comments: "90"
    },
    {
        title: "Kaguya (Kaguya-sama: Love is War)",
        description: "An intricate ink drawing showcasing precision and contrast. This piece highlights the beauty of monochromatic art.",
        image: "assets/images/kaguya.jpg",
        category: "Traditional Art",
        date: "2022",
        likes: "600",
        comments: "90"
    },
];

// Global variables
let currentLightboxIndex = 0;
let isLightboxOpen = false;

/**
 * Initialize gallery functionality
 */
function initGallery() {
    console.log('Gallery initialized');
    
    // Initialize filter functionality
    initGalleryFilters();
    
    // Initialize lightbox functionality
    initLightbox();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize gallery preview (if on homepage)
    initGalleryPreview();
}

/**
 * Initialize gallery filter functionality
 */
function initGalleryFilters() {
    const filters = document.querySelectorAll('.gallery-filter');
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            filterGalleryItems(filterValue);
        });
    });
}

/**
 * Filter gallery items based on selected category
 * @param {string} filter - The filter category to apply
 */
function filterGalleryItems(filter) {
    const items = document.querySelectorAll('.gallery-item');
    const emptyState = document.getElementById('galleryEmpty');
    let visibleCount = 0;

    items.forEach(item => {
        const categories = item.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'block';
            visibleCount++;
            
            // Add animation delay for staggered effect
            item.style.animationDelay = `${visibleCount * 0.1}s`;
        } else {
            item.style.display = 'none';
        }
    });

    // Show/hide empty state
    if (visibleCount === 0) {
        if (emptyState) {
            emptyState.style.display = 'block';
        }
    } else {
        if (emptyState) {
            emptyState.style.display = 'none';
        }
    }
}

/**
 * Initialize lightbox functionality
 */
function initLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', showPrevArt);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextArt);
    }

    // Close lightbox on backdrop click
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                closeLightbox();
            }
        });
    }
}

/**
 * Open lightbox with specific artwork
 * @param {number} index - Index of the artwork to display
 */
function openLightbox(index) {
    if (index < 0 || index >= galleryItems.length) {
        console.error('Invalid gallery item index:', index);
        return;
    }

    currentLightboxIndex = index;
    const item = galleryItems[index];
    
    // Update lightbox content
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxDate = document.getElementById('lightboxDate');
    const lightboxLikes = document.getElementById('lightboxLikes');
    
    if (lightboxImage) lightboxImage.src = item.image;
    if (lightboxTitle) lightboxTitle.textContent = item.title;
    if (lightboxDescription) lightboxDescription.textContent = item.description;
    if (lightboxCategory) lightboxCategory.textContent = item.category;
    if (lightboxDate) lightboxDate.textContent = item.date;
    if (lightboxLikes) lightboxLikes.textContent = item.likes;
    
    // Show lightbox
    const lightbox = document.getElementById('galleryLightbox');
    if (lightbox) {
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        isLightboxOpen = true;
    }
}

/**
 * Close lightbox
 */
function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
        isLightboxOpen = false;
    }
}

/**
 * Show previous artwork in lightbox
 */
function showPrevArt() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentLightboxIndex);
}

/**
 * Show next artwork in lightbox
 */
function showNextArt() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    openLightbox(currentLightboxIndex);
}

/**
 * Initialize keyboard navigation
 */
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (!isLightboxOpen) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevArt();
                break;
            case 'ArrowRight':
                showNextArt();
                break;
        }
    });
}

/**
 * Initialize gallery preview functionality (for homepage)
 */
function initGalleryPreview() {
    const previewItems = document.querySelectorAll('.gallery-preview-item');
    
    previewItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Navigate to gallery page with specific filter
            const category = this.getAttribute('data-category');
            if (category) {
                window.location.href = `gallery.html?filter=${category}`;
            } else {
                window.location.href = 'gallery.html';
            }
        });
    });
}

/**
 * Apply filter from URL parameters (for direct links)
 */
function applyUrlFilter() {
    const urlParams = new URLSearchParams(window.location.search);
    const filter = urlParams.get('filter');
    
    if (filter) {
        // Find and click the appropriate filter button
        const filterBtn = document.querySelector(`[data-filter="${filter}"]`);
        if (filterBtn) {
            filterBtn.click();
        }
    }
}

/**
 * Add smooth scroll behavior to gallery items
 */
function initSmoothScroll() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only trigger if not clicking on overlay elements
            if (!e.target.closest('.gallery-item-overlay')) {
                const index = Array.from(galleryItems).indexOf(this);
                openLightbox(index);
            }
        });
    });
}

/**
 * Add loading states to gallery images
 */
function initImageLoading() {
    const images = document.querySelectorAll('.gallery-item img, .gallery-preview-img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        img.addEventListener('load', function() {
            this.classList.remove('loading');
            this.classList.add('loaded');
        });
        
        img.addEventListener('error', function() {
            this.classList.remove('loading');
            this.classList.add('error');
            console.error('Failed to load image:', this.src);
        });
    });
}

/**
 * Initialize AOS (Animate On Scroll) for gallery items
 */
function initGalleryAnimations() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false,
            offset: 100
        });
    }
}

/**
 * Add touch/swipe support for mobile lightbox navigation
 */
function initTouchSupport() {
    let startX = 0;
    let endX = 0;
    
    const lightbox = document.getElementById('galleryLightbox');
    
    if (lightbox) {
        lightbox.addEventListener('touchstart', function(e) {
            startX = e.changedTouches[0].screenX;
        });
        
        lightbox.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                showNextArt();
            } else {
                // Swipe right - previous
                showPrevArt();
            }
        }
    }
}

/**
 * Utility function to debounce events
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Handle window resize for responsive behavior
 */
function initResponsiveHandling() {
    const handleResize = debounce(() => {
        // Recalculate any responsive elements
        const lightbox = document.getElementById('galleryLightbox');
        if (lightbox && isLightboxOpen) {
            // Adjust lightbox position/size if needed
            lightbox.style.display = 'flex';
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    applyUrlFilter();
    initSmoothScroll();
    initImageLoading();
    initGalleryAnimations();
    initTouchSupport();
    initResponsiveHandling();
});

// Export functions for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initGallery,
        openLightbox,
        closeLightbox,
        filterGalleryItems,
        galleryItems
    };
} 