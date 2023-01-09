'use strict';

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

function openModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.classList.constains('hidden')) closeModal();
});

btnScrollTo.addEventListener('click', e => {
    section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        document
            .querySelector(`${e.target.getAttribute('href')}`)
            .scrollIntoView({ behavior: 'smooth' });
    }
});

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
