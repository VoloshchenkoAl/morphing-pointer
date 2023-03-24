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
        // спочатку подумав, із-за того що метод destroy то варто не тільки видаляти з дому ноду
        //  але і тут сам this.specularLayer тому, що дестрой наче як на це проситься із назви і щоб не займати памʼять
        //  але потім зрозумів, що update використовує цю лінку далі, щоб не ініціалізувати нову ноду - тому імхо, тут треба якась інша назва
        // щось типу remove/reset + Node
        this.specularLayer.parentElement.removeChild(this.specularLayer);
    }

    update(callback: (specularLayer: HTMLElement) => void): void {
        callback(this.specularLayer);
    }
}
