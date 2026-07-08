// ================================
// ELEMENTS
// ================================

const openBtn = document.getElementById("openCurtain");
const leftCurtain = document.querySelector(".left-curtain");
const rightCurtain = document.querySelector(".right-curtain");
const curtainContainer = document.getElementById("curtainContainer");

const website = document.getElementById("website");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

// ================================
// OPEN CURTAIN
// ================================

openBtn.addEventListener("click", () => {

    leftCurtain.classList.add("openLeft");
    rightCurtain.classList.add("openRight");

    // Start music
    music.play().then(() => {
        musicPlaying = true;
        musicBtn.innerHTML = "🔊";
    }).catch(() => {
        musicBtn.innerHTML = "▶";
    });

    // Show website
    setTimeout(() => {

        curtainContainer.style.display = "none";
        website.style.display = "block";
        musicBtn.style.display = "flex";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        launchConfetti();

    }, 1800);

});

// ================================
// MUSIC BUTTON
// ================================

musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play();
        musicBtn.innerHTML = "🔊";
        musicPlaying = true;

    } else {

        music.pause();
        musicBtn.innerHTML = "🔇";
        musicPlaying = false;

    }

});

// ================================
// CONFETTI
// ================================

function launchConfetti() {

    if (typeof confetti !== "function") return;

    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 70,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 70,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }

    })();

}

// ================================
// FLOATING HEARTS
// ================================

const heartsContainer = document.querySelector(".hearts");

function createHeart() {

    const heart = document.createElement("span");

    const icons = [
        "🤍",
        "💗",
        "💕",
        "🩷",
        "💖",
        "✨"
    ];

    heart.innerHTML =
        icons[Math.floor(Math.random() * icons.length)];

    heart.style.left = Math.random() * 100 + "%";

    heart.style.animationDuration =
        (6 + Math.random() * 5) + "s";

    heart.style.fontSize =
        (18 + Math.random() * 18) + "px";

    heartsContainer.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 11000);

}

setInterval(createHeart, 350);

// ================================
// PHOTO CLICK TO ENLARGE
// ================================

const photos = document.querySelectorAll(".photo img");

photos.forEach(photo => {

    photo.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.background = "rgba(0,0,0,.9)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "999999";
        overlay.style.cursor = "pointer";

        const image = document.createElement("img");

        image.src = photo.src;
        image.style.maxWidth = "90%";
        image.style.maxHeight = "90%";
        image.style.borderRadius = "20px";
        image.style.boxShadow = "0 20px 60px rgba(0,0,0,.5)";

        overlay.appendChild(image);

        overlay.addEventListener("click", () => {

            overlay.remove();

        });

        document.body.appendChild(overlay);

    });

});

// ================================
// FADE IN ON SCROLL
// ================================

const sections = document.querySelectorAll(
    ".letter, .gallery, .ending"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});

sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(60px)";
    section.style.transition = "1s";

    observer.observe(section);

});

// ================================
// HERO PARALLAX
// ================================

window.addEventListener("scroll", () => {

    const heroImage = document.querySelector(".hero img");

    if (!heroImage) return;

    const offset = window.scrollY * 0.25;

    heroImage.style.transform =
        `translateY(${offset}px) scale(1.05)`;

});
