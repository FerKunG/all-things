// --- 1. Loader Logic ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1200); // Gives time to read "INITIALIZING..."
});

// --- 2. Custom Neon Cursor ---
const cursor = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    // Request animation frame for smoother performance
    requestAnimationFrame(() => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
});

// Enlarge glow when hovering over buttons or links
const interactables = document.querySelectorAll('a, button, .project-card, .social-icon');
interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '400px';
        cursor.style.height = '400px';
        cursor.style.background = 'radial-gradient(circle, rgba(0,243,255,0.15) 0%, rgba(0,0,0,0) 70%)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '300px';
        cursor.style.height = '300px';
        cursor.style.background = 'radial-gradient(circle, rgba(188,19,254,0.15) 0%, rgba(0,0,0,0) 70%)';
    });
});

// --- 3. Navbar Scroll Blur ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- 4. Scroll Reveal Animations ---
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');

            // Trigger progress bar animations if in the skills section
            if (reveal.classList.contains('skills-grid')) {
                const bars = reveal.querySelectorAll('.progress');
                bars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                });
            }
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger on load

// --- 5. Initialize Particles.js (Cyberpunk Starfield/Network effect) ---
if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#00f3ff", "#bc13fe", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00f3ff",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.5,
                "direction": "none",
                "random": true,
                "out_mode": "out"
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } }
            }
        },
        "retina_detect": true
    });
}