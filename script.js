const cards = document.querySelectorAll('.card--review');
const dots = document.querySelectorAll('.reviews__dot');
const reviewGrid = document.querySelector('.reviews__grid');

let isTransitioning = false;

function goToReviewCard(index) {
    if (window.innerWidth <= 768) return;
    if (isTransitioning) return;

    isTransitioning = true;
    reviewGrid.style.pointerEvents = 'none';

    dots.forEach(d => d.classList.remove('reviews__dot--active'));
    cards.forEach(c => c.classList.remove('card--review--active'));

    dots[index].classList.add('reviews__dot--active');
    cards[index].classList.add('card--review--active');

    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(reviewGrid).gap);
    const offset = index * (cardWidth + gap);

    reviewGrid.style.transform = `translateX(-${offset}px)`;

    setTimeout(() => {
        reviewGrid.style.pointerEvents = 'auto';
        isTransitioning = false;
    }, 400);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToReviewCard(index));
});

cards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => goToReviewCard(index));
});

goToReviewCard(1);

const menuToggle = document.getElementById('menuToggle');
const sidebarMenu = document.getElementById('sidebarMenu');
const menuBackdrop = document.getElementById('menuBackdrop');

function toggleMenu() {
    const isOpen = sidebarMenu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuBackdrop.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
}

function closeMenu() {
    sidebarMenu.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuBackdrop.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

if (menuToggle && sidebarMenu && menuBackdrop) {
    menuToggle.addEventListener('click', toggleMenu);
    menuBackdrop.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebarMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });
}