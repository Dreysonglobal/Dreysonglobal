// Homepage Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('[data-animation]');
    
    function checkScroll() {
        animateElements.forEach(element => {
            if (isInViewport(element)) {
                const animation = element.getAttribute('data-animation');
                const delay = element.getAttribute('data-delay') || 0;
                
                setTimeout(() => {
                    element.style.animation = `${animation} 0.8s ease forwards`;
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Initialize animations
    checkScroll();
    window.addEventListener('scroll', checkScroll);
    
    // Testimonial slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
            testimonial.style.opacity = '0';
            testimonial.style.transform = 'translateY(20px)';
        });
        
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        
        setTimeout(() => {
            testimonials[index].style.opacity = '1';
            testimonials[index].style.transform = 'translateY(0)';
        }, 10);
        
        currentTestimonial = index;
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    
    // Auto slide testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
    
    // Animate client logos on hover
    const logoContainers = document.querySelectorAll('.logo-container');
    
    logoContainers.forEach(container => {
        container.addEventListener('mouseenter', () => {
            const img = container.querySelector('img');
            img.style.filter = 'grayscale(0)';
            img.style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
            const img = container.querySelector('img');
            img.style.filter = 'grayscale(100%)';
            img.style.opacity = '0.7';
        });
    });
    
    // Add floating particles to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        createParticles(heroSection);
    }
});

// Create floating particles effect
function createParticles(container) {
    const particles = 20;
    const colors = ['#4f46e5', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'];
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 8 + 3;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.background = color;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add to container
        container.appendChild(particle);
    }
}