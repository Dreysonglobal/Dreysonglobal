/* ==========================================================================
   DREYSON GLOBAL - MILLION DOLLAR TECH INTERACTIVE JS ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileNav();
    initHeroCanvas();
    initScrollReveals();
    initAnimatedCounters();
    initCardSpotlights();
    initProjectFilters();
    initFaqAccordion();
    initContactForm();
});

/* --- 1. HEADER SCROLL & TOP PROGRESS BAR --- */
function initHeaderScroll() {
    const header = document.querySelector('header');
    const progressBar = document.getElementById('scrollProgressBar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Progress bar width
        if (progressBar && docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        }
        
        // Header background blur
        if (header) {
            if (scrollTop > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

/* --- 2. MOBILE NAVIGATION DRAWER --- */
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/* --- 3. HERO INTERACTIVE CANVAS CONSTELLATION --- */
function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;
    
    let particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 65);
    
    let mouse = {
        x: null,
        y: null,
        radius: 140
    };

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        if (!canvas.parentElement) return;
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.radius = Math.random() * 2 + 1;
            this.color = Math.random() > 0.5 ? '#6366f1' : '#06b6d4';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse proximity interaction
            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Connect particles with line network
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    const alpha = 1 - (dist / 130);
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${alpha * 0.25})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* --- 4. SCROLL REVEAL ANIMATIONS --- */
function initScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    if (revealElements.length === 0) return;
    
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));
}

/* --- 5. ANIMATED NUMBER COUNTERS --- */
function initAnimatedCounters() {
    const counterElements = document.querySelectorAll('.stat-number[data-target]');
    if (counterElements.length === 0) return;

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const suffix = entry.target.getAttribute('data-suffix') || '';
                animateCounter(entry.target, target, suffix);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, target, suffix) {
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Ease out quad
        const easeProgress = progress * (2 - progress);
        const currentCount = Math.floor(easeProgress * target);

        element.textContent = `${currentCount}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = `${target}${suffix}`;
        }
    }

    requestAnimationFrame(update);
}

/* --- 6. MOUSE SPOTLIGHT TRACKING EFFECT FOR CARDS --- */
function initCardSpotlights() {
    const cards = document.querySelectorAll('.service-card, .project-card, .stat-card, .team-lead-card, .hero-glass-box, .process-step');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.12), rgba(17, 24, 39, 0.65) 60%)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
}

/* --- 7. PROJECT CATEGORY FILTER --- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');

    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory.includes(category)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px) scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* --- 8. FAQ ACCORDION --- */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('active');
                
                // Close other items
                faqItems.forEach(i => i.classList.remove('active'));

                if (!isOpen) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/* --- 9. CONTACT FORM SUBMISSION TO WHATSAPP --- */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const subject = document.getElementById('subject')?.value || '';
        const message = document.getElementById('message')?.value || '';

        const formattedText = `*New Website Inquiry*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Subject:* ${encodeURIComponent(subject)}%0A*Message:* ${encodeURIComponent(message)}`;
        const whatsappURL = `https://wa.me/2349056068122?text=${formattedText}`;

        // Show feedback toast
        showToast('Redirecting to WhatsApp to send your message...');

        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            contactForm.reset();
        }, 800);
    });
}

// Toast notification helper
function showToast(message) {
    let toast = document.getElementById('customToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'customToast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: rgba(99, 102, 241, 0.95);
            color: #ffffff;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 600;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            z-index: 9999;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4000);
}