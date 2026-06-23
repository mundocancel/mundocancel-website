  ` + svgContent;
            
            svg.innerHTML = svgContent;
            
            // Update stats
            const area = (w * h) / 10000; // cm² to m²
            const perimeter = (2 * (w + h)) / 100; // cm to m
            document.getElementById('areaValue').textContent = area.toFixed(2);
            document.getElementById('perimeterValue').textContent = perimeter.toFixed(2);
            document.getElementById('widthValue').textContent = w + ' cm';
            document.getElementById('heightValue').textContent = h + ' cm';
        }

        // ============================================
        // EVENT LISTENERS
        // ============================================
        document.getElementById('widthSlider').addEventListener('input', function() {
            currentWidth = parseInt(this.value);
            if (!specialCategories.includes(currentCategory)) updateCroquis();
        });
        
        document.getElementById('heightSlider').addEventListener('input', function() {
            currentHeight = parseInt(this.value);
            if (!specialCategories.includes(currentCategory)) updateCroquis();
        });

        // Mobile menu
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // ============================================
        // GSAP ANIMATIONS
        // ============================================
        gsap.registerPlugin(ScrollTrigger);
        
        function initAnimations() {
            // Body fade in
            document.body.classList.add('loaded');
            
            // Hero animations
            const tl = gsap.timeline();
            tl.from('.hero-badge', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' })
              .from('.hero-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3')
              .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' }, '-=0.4')
              .from('.hero-cta', { opacity: 0, y: 15, duration: 0.6, ease: 'power3.out' }, '-=0.3');
            
            // Parallax hero bg
            gsap.to('#heroBg', {
                y: 100,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
            
            // Category cards stagger
            gsap.from('.category-card', {
                opacity: 0,
                y: 60,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.categories-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
            
            // Cotizador section
            gsap.from('.cotizador-section', {
                opacity: 0,
                y: 40,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.cotizador-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            });
            
            // Inteligente section
            gsap.from('.inteligente-section', {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.inteligente-section',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }

        // ============================================
        // INIT
        // ============================================
        document.addEventListener('DOMContentLoaded', () => {
            generateCategoryCards();
            generateCategoryButtons();
            selectCategory('corredizo');
            initAnimations();
        });// ========================================
// Premium Landing Page - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initHeader();
    initMobileMenu();
    initImageSliders();
    initCalculator();
    initSmoothScroll();
    initScrollAnimations();
});

// ========================================
// Header Scroll Effect
// ========================================
function initHeader() {
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
}

// ========================================
// Mobile Menu Toggle
// ========================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ========================================
// Image Sliders for Cards
// ========================================
function initImageSliders() {
    const cards = document.querySelectorAll('.system-card');
    
    cards.forEach(card => {
        const slides = card.querySelectorAll('.slide');
        if (slides.length <= 1) return;
        
        let currentSlide = 0;
        
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };
        
        // Auto-advance every 3 seconds
        const interval = setInterval(nextSlide, 3000);
        
        // Pause on hover
        card.addEventListener('mouseenter', () => clearInterval(interval));
        card.addEventListener('mouseleave', () => {
            setInterval(nextSlide, 3000);
        });
    });
}

// ========================================
// Interactive Calculator
// ========================================
function initCalculator() {
    const categoryButtons = document.querySelectorAll('.calc-cat-btn');
    const standardCalc = document.getElementById('standardCalc');
    const specialCalcContainer = document.getElementById('specialCalcContainer');
    const widthSlider = document.getElementById('widthSlider');
    const heightSlider = document.getElementById('heightSlider');
    const widthValue = document.getElementById('widthValue');
    const heightValue = document.getElementById('heightValue');
    const resultWidth = document.getElementById('resultWidth');
    const resultHeight = document.getElementById('resultHeight');
    const resultArea = document.getElementById('resultArea');
    const sketchSvg = document.getElementById('dynamicSketch');
    
    let currentCategory = 'corredizo';
    
    // Category selection
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentCategory = btn.dataset.cat;
            
            // Show/hide appropriate calculator
            if (currentCategory === 'acoples' || currentCategory === 'especial') {
                standardCalc.classList.add('hidden');
                specialCalcContainer.classList.remove('hidden');
            } else {
                standardCalc.classList.remove('hidden');
                specialCalcContainer.classList.add('hidden');
                updateSketch();
            }
        });
    });
    
    // Slider updates
    function updateValues() {
        const width = parseInt(widthSlider.value);
        const height = parseInt(heightSlider.value);
        
        widthValue.textContent = `${width} cm`;
        heightValue.textContent = `${height} cm`;
        resultWidth.textContent = `${width} cm`;
        resultHeight.textContent = `${height} cm`;
        
        const area = (width * height) / 10000; // Convert to m²
        resultArea.textContent = `${area.toFixed(2)} m²`;
        
        updateSketch();
    }
    
    widthSlider.addEventListener('input', updateValues);
    heightSlider.addEventListener('input', updateValues);
    
    // Dynamic Sketch Drawing
    function updateSketch() {
        const width = parseInt(widthSlider.value);
        const height = parseInt(heightSlider.value);
        
        // Calculate proportions for SVG
        const maxWidth = 300;
        const maxHeight = 220;
        const aspectRatio = width / height;
        
        let drawWidth, drawHeight;
        
        if (aspectRatio > maxWidth / maxHeight) {
            drawWidth = maxWidth;
            drawHeight = maxWidth / aspectRatio;
        } else {
            drawHeight = maxHeight;
            drawWidth = maxHeight * aspectRatio;
        }
        
        const offsetX = (400 - drawWidth) / 2;
        const offsetY = (300 - drawHeight) / 2;
        
        let svgContent = '';
        
        switch (currentCategory) {
            case 'corredizo':
                svgContent = drawCorredizo(drawWidth, drawHeight, offsetX, offsetY);
                break;
            case 'abatible':
                svgContent = drawAbatible(drawWidth, drawHeight, offsetX, offsetY);
                break;
            case 'fijo':
                svgContent = drawFijo(drawWidth, drawHeight, offsetX, offsetY);
                break;
            case 'plegable':
                svgContent = drawPlegable(drawWidth, drawHeight, offsetX, offsetY);
                break;
            case 'domo':
                svgContent = drawDomo(drawWidth, drawHeight, offsetX, offsetY);
                break;
            case 'templado':
                svgContent = drawTemplado(drawWidth, drawHeight, offsetX, offsetY);
                break;
            default:
                svgContent = drawCorredizo(drawWidth, drawHeight, offsetX, offsetY);
        }
        
        sketchSvg.innerHTML = svgContent;
    }
    
    // Drawing functions for each category
    function drawCorredizo(w, h, x, y) {
        const frameThickness = 8;
        const panelWidth = w / 2;
        
        return `
            <!-- Frame -->
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" 
                  fill="none" stroke="#667eea" stroke-width="${frameThickness}" opacity="0.3"/>
            
            <!-- Left Panel (fixed) -->
            <rect x="${x + frameThickness}" y="${y + frameThickness}" 
                  width="${panelWidth - frameThickness * 2}" height="${h - frameThickness * 2}" 
                  fill="url(#glassGradient)" stroke="#667eea" stroke-width="3" opacity="0.8"/>
            <line x1="${x + panelWidth / 2}" y1="${y + frameThickness + 20}" 
                  x2="${x + panelWidth / 2}" y2="${y + h - frameThickness - 20}" 
                  stroke="#ffffff" stroke-width="2" opacity="0.6"/>
            
            <!-- Right Panel (sliding) -->
            <rect x="${x + panelWidth + frameThickness / 2}" y="${y + frameThickness}" 
                  width="${panelWidth - frameThickness * 2}" height="${h - frameThickness * 2}" 
                  fill="url(#glassGradient)" stroke="#764ba2" stroke-width="3" opacity="0.9"/>
            <line x1="${x + panelWidth + panelWidth / 2}" y1="${y + frameThickness + 20}" 
                  x2="${x + panelWidth + panelWidth / 2}" y2="${y + h - frameThickness - 20}" 
                  stroke="#ffffff" stroke-width="2" opacity="0.6"/>
            
            <!-- Handle indicators -->
            <circle cx="${x + panelWidth + 30}" cy="${y + h / 2}" r="4" fill="#ffffff" opacity="0.8"/>
            
            <!-- Gradient definition -->
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.4" />
                </linearGradient>
            </defs>
        `;
    }
    
    function drawAbatible(w, h, x, y) {
        const frameThickness = 8;
        const panelWidth = w / 2;
        
        return `
            <!-- Frame -->
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" 
                  fill="none" stroke="#667eea" stroke-width="${frameThickness}" opacity="0.3"/>
            
            <!-- Left Panel (open) -->
            <path d="M${x + frameThickness} ${y + frameThickness} 
                     L${x + panelWidth * 0.7} ${y + h / 2} 
                     L${x + frameThickness} ${y + h - frameThickness}" 
                  fill="url(#glassGradient)" stroke="#667eea" stroke-width="3" opacity="0.7"/>
            
            <!-- Right Panel (closed) -->
            <rect x="${x + panelWidth + frameThickness / 2}" y="${y + frameThickness}" 
                  width="${panelWidth - frameThickness * 2}" height="${h - frameThickness * 2}" 
                  fill="url(#glassGradient)" stroke="#764ba2" stroke-width="3" opacity="0.9"/>
            
            <!-- Hinge indicators -->
            <circle cx="${x + frameThickness}" cy="${y + h / 2 - 30}" r="3" fill="#ffffff" opacity="0.8"/>
            <circle cx="${x + frameThickness}" cy="${y + h / 2 + 30}" r="3" fill="#ffffff" opacity="0.8"/>
            
            <!-- Arc indicating opening -->
            <path d="M${x + panelWidth} ${y + h / 2} 
                     A${panelWidth * 0.5} ${panelWidth * 0.5} 0 0 1 ${x + panelWidth * 0.7} ${y + h / 2 - 20}" 
                  fill="none" stroke="#764ba2" stroke-width="2" stroke-dasharray="5,5" opacity="0.6"/>
            
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#a8edea;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#fed6e3;stop-opacity:0.4" />
                </linearGradient>
            </defs>
        `;
    }
    
    function drawFijo(w, h, x, y) {
        const frameThickness = 8;
        
        return `
            <!-- Frame -->
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" 
                  fill="none" stroke="#667eea" stroke-width="${frameThickness}" opacity="0.3"/>
            
            <!-- Fixed glass panel -->
            <rect x="${x + frameThickness}" y="${y + frameThickness}" 
                  width="${w - frameThickness * 2}" height="${h - frameThickness * 2}" 
                  fill="url(#glassGradient)" stroke="#667eea" stroke-width="3" opacity="0.8"/>
            
            <!-- Decorative lines suggesting large glass -->
            <line x1="${x + w * 0.25}" y1="${y + frameThickness + 30}" 
                  x2="${x + w * 0.25}" y2="${y + h - frameThickness - 30}" 
                  stroke="#ffffff" stroke-width="2" opacity="0.4"/>
            <line x1="${x + w * 0.75}" y1="${y + frameThickness + 30}" 
                  x2="${x + w * 0.75}" y2="${y + h - frameThickness - 30}" 
                  stroke="#ffffff" stroke-width="2" opacity="0.4"/>
            
            <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#d299c2;stop-opacity:0.2" />
                    <stop offset="100%" style="stop-color:#fef9d7;stop-opacity:0.3" />
                </linearGradient>
            </defs>
        `;
    }
    
    function drawPlegable(w, h, x, y) {
        const frameThickness = 6;
        const numPanels = 4;
        const panelWidth = w / numPanels;
        
        let svg = `
            <!-- Frame -->
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" 
                  fill="none" stroke="#667eea" stroke-width="${frameThickness}" opacity="0.3"/>
        `;
        
        const colors = ['#f6d365', '#a18cd1', '#ff6e7f', '#bfe9ff'];
        
        for (let i = 0; i < numPanels; i++) {
            const panelX = x + frameThickness + (i * panelWidth);
            const opacity = 1 - (i * 0.15);
            
            svg += `
                <rect x="${panelX}" y="${y + frameThickness}" 
                      width="${panelWidth - frameThickness}" height="${h - frameThickness * 2}" 
                      fill="url(#grad${i})" stroke="#f6d365" stroke-width="2" opacity="${opacity}"/>
                <defs>
                    <linearGradient id="grad${i}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:${colors[i]};stop-opacity:0.4" />
                        <stop offset="100%" style="stop-color:${colors[i]};stop-opacity:0.5" />
                    </linearGradient>
                </defs>
            `;
        }
        
        return svg;
    }
    
    function drawDomo(w, h, x, y) {
        const frameThickness = 8;
        const domeHeight = h * 0.4;
        
        return `
            <!-- Base Frame -->
            <rect x="${x}" y="${y + h - domeHeight}" width="${w}" height="${domeHeight}" 
                  fill="none" stroke="#667eea" stroke-width="${frameThickness}" opacity="0.3"/>
            
            <!-- Dome Structure -->
            <path d="M${x} ${y + h - domeHeight} 
                     Q${x + w / 2} ${y + 20} ${x + w} ${y + h - domeHeight}" 
                  fill="url(#domeGradient)" stroke="#667eea" stroke-width="4" opacity="0.8"/>
            
            <!-- Dome ribs -->
            <path d="M${x + w * 0.2} ${y + h - domeHeight} 
                     Q${x + w / 2} ${y + 30} ${x + w * 0.8} ${y + h - domeHeight}" 
                  fill="none" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
            
            <line x1="${x + w / 2}" y1="${y + h - domeHeight}" 
                  x2="${x + w / 2}" y2="${y + 25}" 
                  stroke="#ffffff" stroke-width="2" opacity="0.5"/>
            
            <!-- Support columns -->
            <rect x="${x + w * 0.15}" y="${y + h - domeHeight}" 
                  width="${w * 0.1}" height="${domeHeight}" 
                  fill="#667eea" opacity="0.3"/>
            <rect x="${x + w * 0.75}" y="${y + h - domeHeight}" 
                  width="${w * 0.1}" height="${domeHeight}" 
                  fill="#667eea" opacity="0.3"/>
            
            <defs>
                <linearGradient id="domeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:0.4" />
                    <stop offset="100%" style="stop-color:#764ba2;stop-opacity:0.5" />
                </linearGradient>
            </defs>
        `;
    }
    
    function drawTemplado(w, h, x, y) {
        const frameThickness = 6;
        
        return `
            <!-- Glass panel with rounded corners -->
            <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" 
                  fill="url(#temperedGradient)" stroke="#667eea" stroke-width="${frameThickness}" opacity="0.8"/>
            
            <!-- Tempering marks (corner dots) -->
            <circle cx="${x + 20}" cy="${y + 20}" r="6" fill="#ffffff" opacity="0.6"/>
            <circle cx="${x + w - 20}" cy="${y + 20}" r="6" fill="#ffffff" opacity="0.6"/>
            <circle cx="${x + 20}" cy="${y + h - 20}" r="6" fill="#ffffff" opacity="0.6"/>
            <circle cx="${x + w - 20}" cy="${y + h - 20}" r="6" fill="#ffffff" opacity="0.6"/>
            
            <!-- Safety marking -->
            <text x="${x + w / 2}" y="${y + h / 2 + 5}" 
                  text-anchor="middle" fill="#ffffff" font-size="14" 
                  font-weight="600" opacity="0.7" font-family="Inter, sans-serif">
                TEMPERADO
            </text>
            
            <!-- Reflection lines -->
            <line x1="${x + w * 0.3}" y1="${y + h * 0.2}" 
                  x2="${x + w * 0.7}" y2="${y + h * 0.4}" 
                  stroke="#ffffff" stroke-width="2" opacity="0.3"/>
            
            <defs>
                <linearGradient id="temperedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#e0c3fc;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#8ec5fc;stop-opacity:0.4" />
                </linearGradient>
            </defs>
        `;
    }
    
    // Initial draw
    updateValues();
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Animations with Intersection Observer
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('system-card')) {
                    const cards = document.querySelectorAll('.system-card');
                    cards.forEach((card, index) => {
                        card.style.animationDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.system-card, .section-header, .calculator-wrapper').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Add CSS for scroll animations dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .system-card {
        opacity: 0;
        transform: translateY(30px);
        animation: cardFadeIn 0.6s ease forwards;
    }
    
    @keyframes cardFadeIn {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Utility Functions
// ========================================
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

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
