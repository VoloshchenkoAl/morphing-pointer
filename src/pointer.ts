import { interpolate } from './helpers';

const defaultWidth = 20;
const defaultHeight = 20;
let oldX = 0;
let oldY = 0;
let isStuck = false;

export const pointer = document.createElement('div');
pointer.classList.add('iPad-pointer');

export const updatePointerPosition = (x: number, y: number) => {
    if (isStuck) {
        return;
    }

    const newCenterX = interpolate(x, oldX, 0.8) - defaultWidth / 2;
    const newCenterY = interpolate(y, oldY, 0.8) - defaultHeight / 2;
    oldX = x;
    oldY = y;

    pointer.style.transform = `translate(${newCenterX}px, ${newCenterY}px)`;
};

export const setStuck = (
    width: number,
    height: number,
    top: number,
    left: number
) => {
    pointer.style.width = `${width}px`;
    pointer.style.height = `${height}px`;
    pointer.style.top = `${top}px`;
    pointer.style.left = `${left}px`;
    pointer.style.transform = `translate(0,0)`;
    pointer.style.backgroundColor = `rgba(0,0,0,0.1)`;
    pointer.style.borderRadius = '4px';
    isStuck = true;
};

export const unsetStuck = () => {
    pointer.style.width = `${defaultWidth}px`;
    pointer.style.height = `${defaultHeight}px`;
    pointer.style.top = `0px`;
    pointer.style.left = `0px`;
    pointer.style.backgroundColor = `rgba(0,0,0,0.4)`;
    pointer.style.borderRadius = '50%';

    isStuck = false;
};

/* @Default Styles */
const style = document.createElement('style');
style.innerText = `
    .iPad-pointer {
        position: fixed;
        pointer-events: none;
        top: 0;
        left: 0;
        width: ${defaultWidth}px;
        height: ${defaultHeight}px;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.4);
        z-index: 99999999;
        transition: width 300ms ease, height 300ms ease;
    }
`;
pointer.classList.add('iPad-pointer');
document.head.appendChild(style);
