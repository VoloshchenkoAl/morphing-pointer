export class SpecularLayer {
    private specularLayer: HTMLElement;

    constructor() {
        this.specularLayer = null;
    }

    init(): void {
        const div = document.createElement('div');

        Object.assign(div.style, {
            position: 'fixed',
            pointerEvents: 'none',
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            borderRadius: 0,
            zIndex: 99999999,
        });

        this.specularLayer = div;

        document.body.appendChild(this.specularLayer);
    }

    destroy(): void {
        this.specularLayer.parentElement.removeChild(this.specularLayer);
    }

    update(callback: (specularLayer: HTMLElement) => void): void {
        callback(this.specularLayer);
    }
}
