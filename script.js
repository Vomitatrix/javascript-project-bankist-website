'use strict';

///////////////////////////////////////////////////////////////////////////////
// Selectors

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const navLogo = nav.querySelector('.nav__logo');
const navLinks = nav.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

///////////////////////////////////////////////////////////////////////////////
// Functions

// Modal functions
function openModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Nav hover function
function handleHover(e) {
    if (e.target.classList.contains('nav__link')) {
        navLogo.style.opacity = this;
        navLinks.forEach(link => {
            if (link !== e.target) link.style.opacity = this;
        });
    }
}

// Slide functions
function slider() {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');
    let currentSlide = 0;

    function slideFunction() {
        slides.forEach(
            (slide, i) => (slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`)
        );
    }

    function nextSlide() {
        currentSlide < slides.length - 1 ? currentSlide++ : (currentSlide = 0);
        activateDot();
        slideFunction();
    }
    function prevSlide() {
        currentSlide > 0 ? currentSlide-- : (currentSlide = slides.length - 1);
        activateDot();
        slideFunction();
    }

    function createDots() {
        slides.forEach((_, i) => {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    }

    function activateDot() {
        document
            .querySelectorAll('button[data-slide]')
            .forEach(dot => dot.classList.remove('dots__dot--active'));
        document
            .querySelector(`.dots__dot[data-slide="${currentSlide}"]`)
            .classList.add('dots__dot--active');
    }

    function init() {
        slideFunction();
        createDots();
        activateDot();
    }
    init();

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);
    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    dotContainer.addEventListener('click', e => {
        const clicked = e.target.closest('.dots__dot');

        currentSlide = clicked.dataset.slide;
        activateDot();
        slideFunction();
    });
}
slider();

///////////////////////////////////////////////////////////////////////////////
// Intersection Observers

// Sticky nav
const navHeight = nav.getBoundingClientRect().height;
function stickyNav(entries) {
    const [entry] = entries;
    if (entry.intersectionRatio === 0) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

// Section fade-in
function revealSection(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.2
});
sections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Image lazy-loading
function loadImg(entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));
    observer.unobserve(entry.target);
}
const lazyImgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
});
imgTargets.forEach(img => lazyImgObserver.observe(img));

///////////////////////////////////////////////////////////////////////////////
// Event Listeners

// Sign-up modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.constains('hidden')) closeModal();
});

// Scrolling
btnScrollTo.addEventListener('click', () => {
    section1.scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('btn--show-modal')) return;

    if (e.target.classList.contains('nav__link')) {
        document
            .querySelector(`${e.target.getAttribute('href')}`)
            .scrollIntoView({ behavior: 'smooth' });
    }
});

// Tabs selection
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;

    // removing the active class from the previous selected tab
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    contents.forEach(content => content.classList.remove('operations__content--active'));

    // // adding the active class to the next selected tab
    clicked.classList.add('operations__tab--active');
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

// Nav hover effect
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
