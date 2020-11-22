import { MorphingPointer } from './lib';

const morphingPointer = new MorphingPointer();

let clientX = 0;
let clientY = 0;

window.addEventListener('mousemove', (event: MouseEvent) => {
    clientX = event.clientX;
    clientY = event.clientY;
});

const update = () => {
    morphingPointer.updatePosition(clientX, clientY);
    requestAnimationFrame(update);
};

requestAnimationFrame(update);

const highlightButtons = document.querySelectorAll('[data-pointer-type="highlight"]');

highlightButtons.forEach((highlightButton) => {
    highlightButton.addEventListener('mouseenter', (e) => {
        const element = e.currentTarget as HTMLElement;

        morphingPointer.setType('highlight', element);
    });

    highlightButton.addEventListener('mouseleave', (e) => {
        morphingPointer.setDefaultType();
    });
});

const liftButtons = document.querySelectorAll('[data-pointer-type="lift"]');
liftButtons.forEach((liftButton) => {
    liftButton.addEventListener('mouseenter', (e) => {
        const element = e.currentTarget as HTMLElement;

        morphingPointer.setType('lift', element);
    });

    liftButton.addEventListener('mouseleave', (e) => {
        morphingPointer.setDefaultType();
    });
});

const contentBlocks = document.querySelectorAll('[data-pointer-type="content"]');
contentBlocks.forEach(contentBlock => {
    contentBlock.addEventListener('mouseenter', (e) => {
        const element = e.currentTarget as HTMLElement;

        morphingPointer.setType('content', element);
    });

    contentBlock.addEventListener('mouseleave', (e) => {
        morphingPointer.setDefaultType();
    });
})