// Create stars effect
function createStars() {
    const starsContainer = document.getElementById('stars');
    const numberOfStars = 100;

    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starsContainer.appendChild(star);
    }
}

// Create floating particles
function createParticles() {
    const numberOfParticles = 20;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        document.body.appendChild(particle);
    }
}

// Add hover effects to member cards
function addCardEffects() {
    const cards = document.querySelectorAll('.member-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(83, 52, 131, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        });
    });
}

// Add click effect to main button
function addButtonEffect() {
    const button = document.querySelector('.nama-anggota-btn');
    
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Initialize all effects when page loads
function initializeWebsite() {
    createStars();
    createParticles();
    addCardEffects();
    addButtonEffect();
    
    console.log('Website Galaxy Theme berhasil dimuat!');
}

// Event listener untuk memastikan semua elemen sudah dimuat
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Optional: Add smooth scrolling effect
function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Call smooth scrolling
addSmoothScrolling();
