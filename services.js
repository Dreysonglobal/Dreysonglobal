// Animate services on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const processSteps = document.querySelectorAll('.process-step');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Animate elements when they come into view
    function animateOnScroll() {
        serviceCards.forEach((card, index) => {
            if (isInViewport(card)) {
                const animation = card.getAttribute('data-animation');
                const delay = index * 100;
                
                setTimeout(() => {
                    card.style.animation = `${animation} 0.8s ease forwards`;
                    card.style.opacity = '1';
                }, delay);
            }
        });
        
        processSteps.forEach((step, index) => {
            if (isInViewport(step)) {
                const animation = step.getAttribute('data-animation');
                const delay = step.getAttribute('data-delay') || index * 200;
                
                setTimeout(() => {
                    step.style.animation = `${animation} 0.8s ease forwards`;
                    step.style.opacity = '1';
                }, delay);
            }
        });
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile touch support for service cards
    serviceCards.forEach(card => {
        let isTouched = false;
        
        card.addEventListener('touchstart', () => {
            isTouched = true;
        }, { passive: true });
        
        card.addEventListener('touchend', () => {
            if (isTouched) {
                card.classList.toggle('active');
                isTouched = false;
            }
        }, { passive: true });
    });
    
    // Add floating particles to hero section
    const heroSection = document.querySelector('.services-hero');
    if (heroSection) {
        createParticles(heroSection);
    }
});

// Create floating particles effect
function createParticles(container) {
    const particles = 30;
    const colors = ['#4f46e5', '#10b981', '#ffffff', '#f59e0b', '#ec4899'];
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 10 + 5;
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