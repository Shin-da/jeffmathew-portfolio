/*
  ============================================================================
  JEFF MATHEW GARCIA PORTFOLIO - ART GALLERY SYSTEM
  ============================================================================
  
  Created by: Jeff Mathew Garcia (シン/shin)
  Website: https://shin-da.github.io/jeffmathew-portfolio/
  GitHub: https://github.com/shin-da/jeffmathew-portfolio
  
  This file handles the interactive art gallery functionality including:
  - Category-based filtering system
  - Lightbox with navigation
  - Touch/swipe support for mobile
  - Keyboard navigation
  - Loading states and fallbacks
  
  Gallery Features:
  - Instagram-inspired design
  - Multi-category filtering
  - Full-screen lightbox view
  - Previous/Next navigation
  - Keyboard shortcuts (Arrow keys, ESC)
  - Touch gestures for mobile
  - Responsive image loading
  
  Copyright © 2025 Jeff Mathew Garcia. All rights reserved.
  ============================================================================
*/

/**
* Gallery JavaScript - Dedicated JS file for gallery functionality
* Handles filtering, lightbox, navigation, and interactive features
*/

// Gallery items data
const galleryItems = [
    {
        id: 1,
        title: "Kugisaki Nobara",
        description: "A detailed traditional pencil sketch capturing the essence of this beloved character. This piece showcases my attention to detail and love for anime art.",
        image: "assets/images/kugisaki-nobara.jpg",
        category: "Traditional Art • Portraits",
        date: "2025",
        likes: 0,
        comments: 0,
        isLiked: false
    },

    {
        id: 2,
        title: "Eren Yeager",
        description: "A dynamic sketch inspired by the popular web novel and manhwa. This piece explores character design and dramatic composition.",
        image: "assets/images/eren-aot.jpg",
        category: "Traditional Art",
        date: "2023",
        likes: 0,
        comments: 0,
        isLiked: false
    },  
    {
        id: 3,
        title: "Solo Leveling",
        description: "A dynamic sketch inspired by the popular web novel and manhwa. This piece explores character design and dramatic composition.",
        image: "assets/images/solo-leveling.jpg",
        category: "Traditional Art",
        date: "2023",
        likes: 0,
        comments: 0,
        isLiked: false
    },
    {
        id: 4,
        title: "Sukuna (Jujutsu Kaisen) - Commissioned",
        description: "A commissioned traditional sketch of Sukuna from Jujutsu Kaisen. This piece was created for a client and has been sold. It showcases my ability to work with client specifications while maintaining artistic quality.",
        image: "assets/images/sukuna.jpeg",
        category: "Traditional Art • Commissioned",
        date: "2023",
        likes: 0,
        comments: 0,
        isLiked: false
    },
    {
        id: 5,
        title: "Random Sketch",
        description: "A traditional painting that demonstrates my versatility in different artistic mediums and techniques.",
        image: "assets/images/random-sketch-2.webp",
        category: "Traditional Art",
        date: "2025",
        likes: 0,
        comments: 0,
        isLiked: false
    },
    {
        id: 6,
        title: "Random Sketch",
        description: "An intricate ink drawing showcasing precision and contrast. This piece highlights the beauty of monochromatic art.",
        image: "assets/images/random-sketch.jpg",
        category: "Traditional Art",
        date: "2022",
        likes: 0,   
        comments: 0,
        isLiked: false
    },
    
    {
        id: 7,
        title: "Okarun and Momo (Dandadan)",
        description: "Concept art piece exploring the unique style and energy of this modern manga series. Focuses on character expression and movement.",
        image: "assets/images/okarun-momo.jpg",
        category: "Traditional Art • Concept",
        date: "2025",
        likes: 0,
        comments: 0,
        isLiked: false
    },
    {
        id: 8,
        title: "Okarun (Dandadan)",
        description: "Original character design concept that demonstrates my creative process and ability to develop unique visual identities.",
        image: "assets/images/okarun.jpg",
        category: "Traditional Art",
        date: "2025",
        likes: 0,
        comments: 0,
        isLiked: false
    },
    {
        id: 9,
        title: "Random Sketch",
        description: "An intricate ink drawing showcasing precision and contrast. This piece highlights the beauty of monochromatic art.",
        image: "assets/images/random.jpg",
        category: "Traditional Art",
        date: "2022",
        likes: 0,
        comments: 0,
        isLiked: false
    },
    {
        id: 10,
        title: "Kaguya (Kaguya-sama: Love is War)",
        description: "An intricate ink drawing showcasing precision and contrast. This piece highlights the beauty of monochromatic art.",
        image: "assets/images/kaguya.jpg",
        category: "Traditional Art",
        date: "2022",
        likes: 0,
        comments: 0,
        isLiked: false
    },
];

// Global variables
let currentLightboxIndex = 0;
let isLightboxOpen = false;
let userLikes = new Set(); // Track user's liked items

/**
 * Initialize gallery functionality
 */
function initGallery() {
    console.log('Gallery initialized');
    
    // Load user likes from localStorage
    loadUserLikes();
    
    // Initialize filter functionality
    initGalleryFilters();
    
    // Initialize lightbox functionality
    initLightbox();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize gallery preview (if on homepage)
    initGalleryPreview();
    
    // Initialize interactive likes
    initInteractiveLikes();
    
    // Update like displays
    updateAllLikeDisplays();
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

/**
 * Update the like display for a specific item
 * @param {Object} item - The gallery item object
 */
function updateLikeDisplay(item) {
    const likeElements = document.querySelectorAll(`[data-item-id="${item.id}"] .gallery-item-stat`);
    likeElements.forEach(element => {
        const heartIcon = element.querySelector('i');
        const likeCount = element.querySelector('span');
        
        if (heartIcon && likeCount) {
            // Update heart icon based on user's like status
            if (item.isLiked) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas', 'text-danger');
            } else {
                heartIcon.classList.remove('fas', 'text-danger');
                heartIcon.classList.add('far');
            }
            
            // Always show the total like count from server
            likeCount.textContent = formatLikeCount(item.likes);
        }
    });
    
    // Also update lightbox if open
    if (isLightboxOpen && currentLightboxIndex === item.id - 1) {
        updateLightboxLikes(item);
    }
}

/**
 * Update like displays for all gallery items
 */
function updateAllLikeDisplays() {
    galleryItems.forEach(item => {
        updateLikeDisplay(item);
    });
}

/**
 * Load user's liked items from localStorage
 */
function loadUserLikes() {
    try {
        const savedLikes = localStorage.getItem('galleryUserLikes');
        if (savedLikes) {
            const parsedLikes = JSON.parse(savedLikes);
            userLikes = new Set(parsedLikes);
            
            // Update gallery items based on loaded likes
            galleryItems.forEach(item => {
                if (userLikes.has(item.id)) {
                    item.isLiked = true;
                }
            });
        }
    } catch (error) {
        console.error('Error loading user likes:', error);
        userLikes = new Set();
    }
}

/**
 * Save user's liked items to localStorage
 */
function saveUserLikes() {
    try {
        localStorage.setItem('galleryUserLikes', JSON.stringify(Array.from(userLikes)));
    } catch (error) {
        console.error('Error saving user likes:', error);
    }
}

/**
 * Format like count for display
 * @param {number} count - The like count
 * @returns {string} Formatted count
 */
function formatLikeCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
}

/**
 * Update lightbox likes display
 * @param {Object} item - The gallery item object
 */
function updateLightboxLikes(item) {
    const lightboxLikes = document.getElementById('lightboxLikes');
    if (lightboxLikes) {
        lightboxLikes.textContent = formatLikeCount(item.likes);
    }
}

/**
 * Initialize interactive likes functionality
 */
function initInteractiveLikes() {
    // Load like counts from server on page load
    loadLikeCountsFromServer();
    
    // Set up periodic refresh of like counts (every 30 seconds)
    setInterval(refreshLikeCounts, 30000);
    
    // Add click handlers to all like buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.gallery-item-stat')) {
            const statElement = e.target.closest('.gallery-item-stat');
            const heartIcon = statElement.querySelector('i.fa-heart');
            
            if (heartIcon) {
                const galleryItem = statElement.closest('.gallery-item');
                if (galleryItem) {
                    // Find the item index based on position in gallery
                    const items = Array.from(document.querySelectorAll('.gallery-item'));
                    const itemIndex = items.indexOf(galleryItem);
                    
                    if (itemIndex !== -1 && itemIndex < galleryItems.length) {
                        const item = galleryItems[itemIndex];
                        toggleLikeWithServer(item);
                        
                        // Prevent event bubbling
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
        }
    });
    
    // Add hover effects
    document.addEventListener('mouseenter', function(e) {
        if (e.target.closest('.gallery-item-stat')) {
            const statElement = e.target.closest('.gallery-item-stat');
            statElement.classList.add('hover-effect');
        }
    }, true);
    
    document.addEventListener('mouseleave', function(e) {
        if (e.target.closest('.gallery-item-stat')) {
            const statElement = e.target.closest('.gallery-item-stat');
            statElement.classList.remove('hover-effect');
        }
    }, true);
}

/**
 * Refresh like counts from server (without changing user's like status)
 */
async function refreshLikeCounts() {
    try {
        const response = await fetch('/.netlify/functions/like-artwork');
        if (!response.ok) {
            throw new Error('Failed to refresh like counts');
        }
        
        const likeData = await response.json();
        
        // Update gallery items with server data (preserve user's like status)
        likeData.forEach(serverItem => {
            const galleryItem = galleryItems.find(item => item.id === parseInt(serverItem.id));
            if (galleryItem) {
                // Update total likes from server
                galleryItem.likes = parseInt(serverItem.total_likes);
                galleryItem.baseLikes = parseInt(serverItem.base_likes);
                
                // Update user's like status from server
                const serverUserLiked = parseInt(serverItem.user_likes) > 0;
                if (serverUserLiked !== galleryItem.isLiked) {
                    galleryItem.isLiked = serverUserLiked;
                    if (serverUserLiked) {
                        userLikes.add(galleryItem.id);
                    } else {
                        userLikes.delete(galleryItem.id);
                    }
                }
            }
        });
        
        // Update displays with server data
        updateAllLikeDisplays();
        
    } catch (error) {
        console.error('Error refreshing like counts:', error);
        // Don't fallback to local storage for refresh - just log the error
    }
}

/**
 * Load like counts from server
 */
async function loadLikeCountsFromServer() {
    try {
        const response = await fetch('/.netlify/functions/like-artwork');
        if (!response.ok) {
            throw new Error('Failed to load like counts');
        }
        
        const likeData = await response.json();
        
        // Update gallery items with server data
        likeData.forEach(serverItem => {
            const galleryItem = galleryItems.find(item => item.id === parseInt(serverItem.id));
            if (galleryItem) {
                // Update total likes from server
                galleryItem.likes = parseInt(serverItem.total_likes);
                galleryItem.baseLikes = parseInt(serverItem.base_likes);
                galleryItem.userLikes = parseInt(serverItem.user_likes);
                
                // Check if current user has liked this item
                if (serverItem.user_likes > 0) {
                    galleryItem.isLiked = true;
                    userLikes.add(galleryItem.id);
                } else {
                    galleryItem.isLiked = false;
                    userLikes.delete(galleryItem.id);
                }
            }
        });
        
        // Update displays with server data
        updateAllLikeDisplays();
        
    } catch (error) {
        console.error('Error loading like counts:', error);
        // Fallback to local storage
        loadUserLikes();
    }
}

/**
 * Toggle like with server integration
 * @param {Object} item - The gallery item object
 */
async function toggleLikeWithServer(item) {
    const likeButton = document.querySelector(`[data-item-id="${item.id}"] .gallery-item-stat`);
    
    // Add loading state
    if (likeButton) {
        likeButton.classList.add('loading');
    }
    
    try {
        const response = await fetch('/.netlify/functions/like-artwork', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                artwork_id: item.id,
                action: 'toggle'
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update like');
        }
        
        const result = await response.json();
        
        if (result.success) {
            // Update item data
            item.likes = result.total_likes;
            item.isLiked = result.liked;
            
            if (result.liked) {
                userLikes.add(item.id);
            } else {
                userLikes.delete(item.id);
            }
            
            // Update display
            updateLikeDisplay(item);
            
            // Add success animation
            if (likeButton) {
                likeButton.classList.remove('loading');
                likeButton.classList.add('like-success');
                setTimeout(() => {
                    likeButton.classList.remove('like-success');
                }, 500);
            }
            
            // Save to local storage as backup
            saveUserLikes();
            
        } else {
            throw new Error(result.error || 'Failed to update like');
        }
        
    } catch (error) {
        console.error('Error toggling like:', error);
        
        // Remove loading state
        if (likeButton) {
            likeButton.classList.remove('loading');
            likeButton.classList.add('like-error');
            setTimeout(() => {
                likeButton.classList.remove('like-error');
            }, 500);
        }
        
        // Fallback to client-side only
        toggleLike(item);
        updateLikeDisplay(item);
        saveUserLikes();
    }
}

/**
 * Toggle like status for an item (client-side fallback)
 * @param {Object} item - The gallery item object
 */
function toggleLike(item) {
    if (item.isLiked) {
        item.likes--;
        userLikes.delete(item.id);
    } else {
        item.likes++;
        userLikes.add(item.id);
    }
    item.isLiked = !item.isLiked;
    
    // Add animation effect
    const likeButton = document.querySelector(`[data-item-id="${item.id}"] .gallery-item-stat`);
    if (likeButton) {
        likeButton.classList.add('like-animation');
        setTimeout(() => {
            likeButton.classList.remove('like-animation');
        }, 300);
    }
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