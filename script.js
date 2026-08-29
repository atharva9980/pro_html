// Romantic Particle Effect (Floating magical dust)
const canvas = document.getElementById('sparkles');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    
    // Create 80 particles
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle());
    }
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5; // Tiny sparkles
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1.5 + 0.5; // Drift upwards slowly
        
        // Romantic mix of gold, soft lavender, and white
        const colors = [
            'rgba(212, 175, 55, 0.7)', // Gold
            'rgba(243, 232, 255, 0.7)', // Lavender
            'rgba(255, 255, 255, 0.6)'  // White
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;

        // Reset particle to bottom when it drifts off screen
        if (this.y < 0) {
            this.y = height;
            this.x = Math.random() * width;
        }
        if (this.x < 0 || this.x > width) {
            this.speedX *= -1;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add a gentle glow to the particles
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
    }
}

function animate() {
    // Clear canvas with slight opacity for trailing effect
    ctx.clearRect(0, 0, width, height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

// Handle window resizing
window.addEventListener('resize', init);

// Start the magic
init();
animate();