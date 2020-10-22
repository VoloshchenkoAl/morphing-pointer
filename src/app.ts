import {
    pointer,
    updatePointerPosition,
    setStuck,
    unsetStuck,
} from './pointer';

let clientX = 0;
let clientY = 0;

document.body.appendChild(pointer);

window.addEventListener('mousemove', (event: MouseEvent) => {
    clientX = event.clientX;
    clientY = event.clientY;
});

const update = () => {
    updatePointerPosition(clientX, clientY);
    requestAnimationFrame(update);
};

requestAnimationFrame(update);

const highlightButtons = Array.from(
    document.querySelectorAll('[data-pointer="highlight"]')
);
highlightButtons.forEach((btn: HTMLButtonElement) => {
    btn.addEventListener('mouseenter', (e) => {
        const element = e.target as HTMLElement;
        const { width, height, top, left } = element.getBoundingClientRect();
        setStuck(width, height, top, left);
    });

    btn.addEventListener('mouseleave', () => {
        unsetStuck();
    });
});
