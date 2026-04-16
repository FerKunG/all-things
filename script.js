// --- 1. Loader Logic ---
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1200);
    }
});

// --- 2. Custom Neon Cursor ---
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    });

    const interactables = document.querySelectorAll('a, button, .project-card, .social-icon');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '400px';
            cursorGlow.style.height = '400px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(0,243,255,0.15) 0%, rgba(0,0,0,0) 70%)';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '300px';
            cursorGlow.style.height = '300px';
            cursorGlow.style.background = 'radial-gradient(circle, rgba(188,19,254,0.15) 0%, rgba(0,0,0,0) 70%)';
        });
    });
}

// --- 3. Navbar Scroll Blur ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// --- 4. Scroll Reveal Animations ---
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveal.classList.add('active');
            if (reveal.classList.contains('skills-grid')) {
                const bars = reveal.querySelectorAll('.progress');
                bars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => { bar.style.width = targetWidth; }, 200);
                });
            }
        }
    });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// --- 5. Particles.js ---
if (typeof particlesJS !== "undefined" && document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": ["#00f3ff", "#bc13fe", "#ffffff"] },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00f3ff", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.6 } } }
        },
        "retina_detect": true
    });
}

// --- 6. Firebase & Like Logic (Fixed & Cleaned) ---
setTimeout(() => {
    if (!window.dbFunctions || !window.db) {
        console.error("Firebase not ready!");
        return;
    }

    const { ref, onValue, runTransaction } = window.dbFunctions;
    const db = window.db;
    const totalLikesRef = ref(db, 'totalLikes');
    const totalLikesDisplay = document.getElementById('total-likes');
    const likeBtns = document.querySelectorAll('.like-btn');

    // Sync Total Likes from Firebase
    onValue(totalLikesRef, (snapshot) => {
        const data = snapshot.val() || 0;
        if (totalLikesDisplay) {
            totalLikesDisplay.textContent = data;
            totalLikesDisplay.style.transform = 'scale(1.2)';
            setTimeout(() => { totalLikesDisplay.style.transform = 'scale(1)'; }, 200);
        }
    });

    // Handle Like Buttons with LocalStorage
    likeBtns.forEach((btn, index) => {
        const btnId = `liked-project-${index}`;

        // Check LocalStorage on Load
        if (localStorage.getItem(btnId) === 'true') {
            btn.classList.add('liked');
            const icon = btn.querySelector('i');
            const countSpan = btn.querySelector('.like-count');
            if (icon) icon.classList.replace('far', 'fas');
            if (countSpan) countSpan.textContent = "1";
        }

        // Single Click Event
        btn.addEventListener('click', function () {
            const icon = this.querySelector('i');
            const countSpan = this.querySelector('.like-count');
            this.classList.toggle('liked');

            const isLiked = this.classList.contains('liked');

            if (isLiked) {
                localStorage.setItem(btnId, 'true');
                if (icon) icon.classList.replace('far', 'fas');
                if (countSpan) countSpan.textContent = "1";
            } else {
                localStorage.removeItem(btnId);
                if (icon) icon.classList.replace('fas', 'far');
                if (countSpan) countSpan.textContent = "0";
            }

            // Sync to Firebase
            runTransaction(totalLikesRef, (curr) => {
                if (isLiked) return (curr || 0) + 1;
                return Math.max(0, (curr || 0) - 1);
            });
        });
    });
    console.log("Firebase & Likes Initialized! 🚀");
}, 1000);