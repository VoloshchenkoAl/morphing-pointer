import Pointer from './models/Pointer';

const pointer = new Pointer();

let clientX = 0;
let clientY = 0;

window.addEventListener('mousemove', (event: MouseEvent) => {
    clientX = event.clientX;
    clientY = event.clientY;
});

const update = () => {
    pointer.updatePosition(clientX, clientY);
    requestAnimationFrame(update);
};

requestAnimationFrame(update);

const highlightButtons = Array.from(
    document.querySelectorAll('[data-pointer-type="highlight"]')
);
const liftButtons = Array.from(
    document.querySelectorAll('[data-pointer-type="lift"]')
);

highlightButtons.forEach((highlightButton) => {
    highlightButton.addEventListener('mouseenter', (e) => {
        const element = e.currentTarget as HTMLElement;

        pointer.setHighlight(element);
    });

    highlightButton.addEventListener('mouseleave', (e) => {
        pointer.resetButton();
    });
});

liftButtons.forEach((liftButton) => {
    liftButton.addEventListener('mouseenter', (e) => {
        const element = e.currentTarget as HTMLElement;

        pointer.setLift(element);
    });

    liftButton.addEventListener('mouseleave', (e) => {
        pointer.resetButton();
    });
});
