document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Custom Cursor
    // ========================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX - 5 + 'px';
        cursor.style.top = mouseY - 5 + 'px';
    });
    
    // Smooth follower movement
    function animateFollower() {
        followerX += (mouseX - followerX - 15) * 0.1;
        followerY += (mouseY - followerY - 15) * 0.1;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, input, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });

    // ========================================
    // Navigation Scroll Effect
    // ========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========================================
    // Typing Animation
    // ========================================
    const roles = ['Video Editing', 'Graphic Design', 'Web Development'];
    const typingElement = document.getElementById('typing-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    typeEffect();

    // ========================================
    // Smooth Scroll
    // ========================================
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

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // Stats Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.textContent = target + '+';
                        }
                    };
                    
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }

    // ========================================
    // Portfolio Filter - Only for sections with filters
    // ========================================
    
    // Handle each portfolio category section that has filter buttons
    document.querySelectorAll('.portfolio-category').forEach(categorySection => {
        const filterButtons = categorySection.querySelectorAll('.filter-btn');
        
        // Only apply filter logic if there are filter buttons
        if (filterButtons.length === 0) return;
        
        const portfolioItems = categorySection.querySelectorAll('.portfolio-item');
        
        // Show first item of each sub-category initially
        function showOnlyFirstPerCategory() {
            const categories = {};
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (!categories[category]) {
                    categories[category] = [];
                }
                categories[category].push(item);
            });
            
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const categoryItems = categories[category];
                const index = categoryItems.indexOf(item);
                
                if (index === 0) {
                    item.classList.remove('hidden');
                    item.style.opacity = '1';
                    item.style.visibility = 'visible';
                    item.style.position = 'relative';
                } else {
                    item.classList.add('hidden');
                    item.style.visibility = 'hidden';
                    item.style.position = 'absolute';
                }
            });
        }
        
        function showCategory(filter) {
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    item.classList.remove('hidden');
                    item.style.opacity = '1';
                    item.style.visibility = 'visible';
                    item.style.position = 'relative';
                } else {
                    item.classList.add('hidden');
                    item.style.visibility = 'hidden';
                    item.style.position = 'absolute';
                }
            });
        }
        
        // Initialize
        showOnlyFirstPerCategory();
        
        // Add click handlers
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                if (filter === 'all') {
                    showOnlyFirstPerCategory();
                } else {
                    showCategory(filter);
                }
            });
        });
    });

    // ========================================
    // Navbar Link Active State
    // ========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // Parallax Effect for Floating Shapes
    // ========================================
    const shapes = document.querySelectorAll('.floating-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.05;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ========================================
    // Video Play on Hover/Click (With Audio Support)
    // ========================================
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        const video = item.querySelector('video');
        
        if (video) {
            // Remove muted on click to enable audio
            video.addEventListener('click', function(e) {
                e.stopPropagation();
                this.muted = false;
            });
            
            // Play on hover
            item.addEventListener('mouseenter', () => {
                video.muted = true; // Start muted on hover
                video.play().catch(e => console.log('Autoplay prevented:', e));
            });
            
            // Pause on mouse leave
            item.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
            
            // Toggle play/pause on click (unmute for audio)
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    video.muted = false; // Unmute on click to enable audio
                    video.play().catch(e => console.log('Autoplay prevented:', e));
                } else {
                    video.pause();
                }
            });
        }
    });

    // Removed preloader that caused black screen flash
});
