/* Your JS here. */
const navbar = document.getElementById('navbar');
const sections = Array.from(document.getElementsByTagName("section"));
const indicators = Array.from(document.getElementById("navigation-section").children);

let isAtTop = window.scrollY <= 0;

function handleNavbarAtTop(atTop) {
    if (atTop) {
        navbar.style.height = "50px";
        navbar.style.fontSize = "18px";
    } else {
        navbar.style.height = "";
        navbar.style.fontSize = "";
    }
}

handleNavbarAtTop(isAtTop);

const map = new Map(
    sections.map((section, index) => [section, indicators[index]])
);

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const activeSectionIndicator = map.get(entry.target);
        if (entry.isIntersecting) {
            activeSectionIndicator.classList.add("active");
        } else {
            activeSectionIndicator.classList.remove("active");
        }
    });
}, {
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0
});

sections.forEach((section) => {
    sectionObserver.observe(section);
});

window.addEventListener('scroll', () => {
    const atTop = window.scrollY <= 0;
    if (atTop === isAtTop) return;
    isAtTop = atTop;

    handleNavbarAtTop(atTop);
})

const modalTriggers = document.querySelectorAll('.modal[img-src]');
const overlay = document.getElementById('video-modal-overlay');
const modalImage = document.getElementById('video-modal-image');
const closeBtn = document.getElementById('video-modal-close');

function openModal(imgSrc, altText) {
    modalImage.src = imgSrc;
    modalImage.alt = altText;
    overlay.classList.remove('hidden');
}

function closeModal() {
    overlay.classList.add('hidden');
    modalImage.src = "";
}

modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const imgSrc = trigger.getAttribute('img-src');
        const altText = trigger.querySelector('h5')?.textContent ?? "";
        openModal(imgSrc, altText);
    });
});

closeBtn.addEventListener('click', closeModal);

overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
        closeModal();
    }
});