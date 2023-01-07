'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');
const header = document.querySelector('.header');

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

// // cookie popup
// const cookieMessage = document.createElement('div');
// cookieMessage.classList.add('cookie-message');
// cookieMessage.innerHTML =
//     'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(cookieMessage);
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//     cookieMessage.remove();
// });
// cookieMessage.style.backgroundColor = '#37383d';
// cookieMessage.style.width = '100%';
// cookieMessage.style.height = Number.parseFloat(getComputedStyle(cookieMessage).height) + 30 + 'px';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', e => {
    section1.scrollIntoView({ behavior: 'smooth' });
});
