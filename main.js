const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size and handle resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Star class
class Star {
    constructor() {
        this.reset();
        // Randomize initial position
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.size = Math.random() * 2;

        // Create varied speeds
        const speedTier = Math.random();
        if (speedTier < 0.33) {
            this.speed = Math.random() * 0.3 + 0.1; // Slow stars
        } else if (speedTier < 0.66) {
            this.speed = Math.random() * 0.6 + 0.4; // Medium stars
        } else {
            this.speed = Math.random() * 0.9 + 0.7; // Fast stars
        }

        this.brightness = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.y -= this.speed;
        if (this.y < 0) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize canvas and create stars
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create stars based on screen size
function getStarCount() {
    return window.innerWidth <= 768 ? 300 : 500;
}

// Create initial stars
let stars = Array(getStarCount()).fill().map(() => new Star());

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

// Start animation
animate();