// WNDYS Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const backToTop = document.getElementById('back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.reveal-element');

    // Mobile menu toggle
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scroll for navigation links
    function smoothScroll(target) {
        const element = document.querySelector(target);
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Add click event listeners to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Back to top button functionality
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Scroll event listener for various scroll-based functionalities
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        // Sticky navbar on scroll
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (backToTop) {
            if (scrollPosition > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Scroll spy for active navigation
        updateActiveNavLink();

        // Reveal animations on scroll
        revealOnScroll();
    });

    // Update active navigation link based on scroll position (Scroll Spy)
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                mobileNavLinks.forEach(link => {
                    link.classList.remove('active');
                });

                // Add active class to current link
                document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
                document.querySelector(`.mobile-nav-link[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }

    // Reveal elements on scroll
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        revealElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollY;
            const revealPoint = elementPosition - windowHeight + 100;

            if (scrollY > revealPoint) {
                element.classList.add('active');
            }
        });
    }

    // Initialize page
    function init() {
        // Set first section as active on page load
        updateActiveNavLink();
        
        // Initial reveal check
        revealOnScroll();
        
        // Lazy load images
        lazyLoadImages();
    }

    // Lazy load images
    function lazyLoadImages() {
        const lazyImages = document.querySelectorAll('[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        image.src = image.dataset.src;
                        image.removeAttribute('data-src');
                        imageObserver.unobserve(image);
                    }
                });
            });

            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for browsers without IntersectionObserver support
            lazyImages.forEach(image => {
                image.src = image.dataset.src;
                image.removeAttribute('data-src');
            });
        }
    }

    // Initialize the page
    init();
});