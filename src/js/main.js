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