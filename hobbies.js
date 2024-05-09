const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.carousel-slide');

let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;
let prevTranslate = 0;

slides.forEach((slide, index) => {
    slide.addEventListener('dragstart', (e) => e.preventDefault());

    // Touch events
    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);
});

function touchStart(index) {
    return function (event) {
        isDragging = true;
        startPosition = event.touches[0].clientX;
        currentTranslate = prevTranslate;
    }
}

function touchEnd() {
    isDragging = false;
}

function touchMove(event) {
    if (isDragging) {
        const currentPosition = event.touches[0].clientX;
        const diff = currentPosition - startPosition;
        prevTranslate = currentTranslate + diff;
        if (prevTranslate < 0) prevTranslate = 0;
        if (prevTranslate > carousel.offsetWidth * (slides.length - 1)) prevTranslate = carousel.offsetWidth * (slides.length - 1);
        carousel.style.transform = `translateX(${-prevTranslate}px)`;
    }
}
