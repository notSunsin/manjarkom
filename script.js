// Network constellation variables
let canvas, ctx;
let nodes = [];
let connections = [];
let animationId;

// Network node class
class NetworkNode {
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.type = type;
        this.size = type === 'primary' ? 6 : type === 'secondary' ? 3 : 4;
        this.color = type === 'primary' ? '#ff6b35' : type === 'secondary' ? '#00ff88' : '#00d4ff';
        this.pulsePhase = Math.random() * Math.PI * 2;
    }

    update() {
        // Gentle movement
        this.x += this.vx;
        this.y += this.vy;

        // Boundary collision
        if (this.x <= 0 || this.x >= canvas.width) this.vx *= -1;
        if (this.y <= 0 || this.y >= canvas.height) this.vy *= -1;

        // Keep within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));

        this.pulsePhase += 0.02;
    }

    draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
        const currentSize = this.size * pulse;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 3, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentSize * 3);
        gradient.addColorStop(0, this.color + '40');
        gradient.addColorStop(0.5, this.color + '20');
        gradient.addColorStop(1, this.color + '00');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Main node
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Inner bright core
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
    }
}

// Initialize network canvas
function initNetwork() {
    canvas = document.getElementById('networkCanvas');
    ctx = canvas.getContext('2d');
    
    resizeCanvas();
    createNodes();
    animate();
}

// Resize canvas to match window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Create network nodes
function createNodes() {
    nodes = [];
    const nodeCount = Math.floor((canvas.width * canvas.height) / 25000);
    
    for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        let type = 'normal';
        if (Math.random() < 0.1) type = 'primary';
        else if (Math.random() < 0.3) type = 'secondary';
        
        nodes.push(new NetworkNode(x, y, type));
    }
}

// Draw connections between nearby nodes
function drawConnections() {
    const maxDistance = 150;
    
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < maxDistance) {
                const opacity = (1 - distance / maxDistance) * 0.5;
                
                // Create gradient line
                const gradient = ctx.createLinearGradient(
                    nodes[i].x, nodes[i].y,
                    nodes[j].x, nodes[j].y
                );
                gradient.addColorStop(0, nodes[i].color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
                gradient.addColorStop(0.5, '#00d4ff' + Math.floor(opacity * 128).toString(16).padStart(2, '0'));
                gradient.addColorStop(1, nodes[j].color + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
                
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 1;
                ctx.stroke();
                
                // Add data flow animation
                if (Math.random() < 0.01 && opacity > 0.3) {
                    drawDataPacket(nodes[i], nodes[j], distance);
                }
            }
        }
    }
}

// Draw animated data packets
function drawDataPacket(nodeA, nodeB, distance) {
    const progress = (Date.now() % 2000) / 2000;
    const x = nodeA.x + (nodeB.x - nodeA.x) * progress;
    const y = nodeA.y + (nodeB.y - nodeA.y) * progress;
    
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    
    // Trailing glow
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    const trailGradient = ctx.createRadialGradient(x, y, 0, x, y, 4);
    trailGradient.addColorStop(0, '#ffffff40');
    trailGradient.addColorStop(1, '#ffffff00');
    ctx.fillStyle = trailGradient;
    ctx.fill();
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw nodes
    nodes.forEach(node => {
        node.update();
        node.draw();
    });
    
    // Draw connections
    drawConnections();
    
    animationId = requestAnimationFrame(animate);
}

// Add hover effects to member cards
function addCardEffects() {
    const cards = document.querySelectorAll('.member-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 40px rgba(0, 212, 255, 0.4), 0 0 30px rgba(0, 212, 255, 0.2)';
            this.style.borderColor = 'rgba(0, 212, 255, 0.6)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(0, 212, 255, 0.1)';
            this.style.borderColor = 'rgba(0, 212, 255, 0.3)';
        });
    });
}

// Add click effect to main button
function addButtonEffect() {
    const button = document.querySelector('.nama-anggota-btn');
    
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            ripple.remove();
        }, 150);
    });
}

// Create floating network particles
function createNetworkParticles() {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'network-node';
            
            // Random type
            const rand = Math.random();
            if (rand < 0.1) particle.classList.add('primary');
            else if (rand < 0.3) particle.classList.add('secondary');
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            
            document.body.appendChild(particle);
        }, i * 200);
    }
}

// Add CSS for ripple animation
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChil(style);
}

// Initialize all effects when page loads
function initializeWebsite() {
    initNetwork();
    createNetworkParticles();
    addCardEffects();
    addButtonEffect();
    addRippleAnimation();
    
    console.log('Network Constellation Website berhasil dimuat!');
}

// Handle window resize
window.addEventListener('resize', () => {
    resizeCanvas();
    // Recreate nodes for new canvas size
    createNodes();
});

// Event listener untuk memastikan semua elemen sudah dimuat
document.addEventListener('DOMContentLoaded', initializeWebsite);

// Optional: Add smooth scrolling effect
function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Call smooth scrolling
addSmoothScrolling();

// Clean up animation on page unload
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});
