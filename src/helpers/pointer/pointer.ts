export function createPointerElement(): HTMLElement {
    if (document.querySelector('.iPad-like-pointer')) {
        console.warn('MorphingPointer: pointer element has already created');

        return document.querySelector('.iPad-like-pointer');
    }

    const div = document.createElement('div');
    const style = document.createElement('style');

    div.classList.add('iPad-like-pointer');

    style.innerText = `
        body, [data-pointer-type] {
             cursor: none;
        }

        .iPad-like-pointer {
            position: fixed;
            pointer-events: none;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            border-radius: 100px;
            background-color: rgba(0,0,0,0.23);
            z-index: 99999999;
            transition: background-color 150ms ease;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(div);

    return div;
}