// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Tech Avatars Animation
function createTechAvatars() {
    const techAvatarsContainer = document.getElementById('techAvatars');
    if (!techAvatarsContainer) return;
    
    const techIcons = [
        'fas fa-code',
        'fas fa-mobile-alt',
        'fas fa-laptop-code',
        'fas fa-database',
        'fas fa-cloud',
        'fas fa-server',
        'fab fa-html5',
        'fab fa-css3-alt',
        'fab fa-js',
        'fab fa-react',
        'fab fa-node-js',
        'fab fa-python',
        'fab fa-android',
        'fab fa-apple',
        'fab fa-git-alt',
        'fas fa-bug'
    ];
    
    const containerWidth = techAvatarsContainer.offsetWidth;
    const containerHeight = techAvatarsContainer.offsetHeight;
    
    // Create 15-20 avatars based on screen size
    const avatarCount = window.innerWidth < 768 ? 15 : 20;
    
    for (let i = 0; i < avatarCount; i++) {
        const avatar = document.createElement('div');
        avatar.className = 'tech-avatar';
        
        // Random icon
        const randomIcon = techIcons[Math.floor(Math.random() * techIcons.length)];
        avatar.innerHTML = `<i class="${randomIcon}"></i>`;
        
        // Random position
        const left = Math.random() * (containerWidth - 60);
        const top = Math.random() * (containerHeight - 60);
        
        avatar.style.left = `${left}px`;
        avatar.style.top = `${top}px`;
        
        // Random animation delay and duration
        const delay = Math.random() * 5;
        const duration = 15 + Math.random() * 10;
        
        avatar.style.animationDelay = `${delay}s`;
        avatar.style.animationDuration = `${duration}s`;
        
        techAvatarsContainer.appendChild(avatar);
    }
}

// Contact Form Submission to WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Format message for WhatsApp
        const whatsappMessage = `New Contact Form Submission%0A%0AName: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/2349056068122?text=${whatsappMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
        
        // Reset form
        this.reset();
        
        // Show confirmation message
        alert('Thank you for your message! We are redirecting you to WhatsApp to complete the process.');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createTechAvatars();
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});

// SEO Optimization - Update meta tags dynamically
function updateMetaTags() {
    // This function would typically be used to update meta tags for dynamic content
    // For a static site, the meta tags are already set in the HTML
    console.log('Meta tags loaded for Dreyson Global');
}

// Call the function
updateMetaTags();