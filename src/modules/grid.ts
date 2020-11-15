const createHorizontalRoll = (top: number): Element => {
    const div = document.createElement('div');

    div.style.position = 'fixed';
    div.style.height = '1px';
    div.style.backgroundColor = 'black';
    div.style.left = '0';
    div.style.width = '100%';
    div.style.top = `${top}px`;
    div.style.pointerEvents = `none`;

    return div;
} 

export const createGrid = (element: Element): void => {
    const lineHeight = parseInt(window.getComputedStyle(element).lineHeight, 10);
    const paddingTop = parseFloat(window.getComputedStyle(element).paddingTop);
    const paddingBottom = parseFloat(window.getComputedStyle(element).paddingBottom);
    const { top, height } = element.getBoundingClientRect();
    const horizontalGridPosition = Array.from({ length: Math.round((height - paddingBottom - paddingTop) / lineHeight) }).map((_, index) => top + paddingTop + lineHeight + index * lineHeight);
    horizontalGridPosition.push(top + paddingTop);
    
    horizontalGridPosition.forEach(rollerTopPosition => {
        const horizontalRoll = createHorizontalRoll(rollerTopPosition);

        document.body.appendChild(horizontalRoll);
    });
};
