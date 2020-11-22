import { BasePointer } from '../Base';
import { gsap } from 'gsap';

export class DefaultPointer extends BasePointer {
    private defaultWidth: number;
    private defaultHeight: number;
    private defaultRadius: number;

    constructor(cursor: HTMLElement) {
        super(cursor);
        this.defaultWidth = 20;
        this.defaultHeight = 20;
        this.defaultRadius = 100;
    }

    onUpdate(pointerX: number, pointerY: number): void {
        gsap.to(this.cursor, {
            x: pointerX - this.defaultWidth / 2,
            y: pointerY - this.defaultHeight / 2,
            duration: 0.05,
        });
    }

    onUse(): void {
        gsap.to(this.cursor, {
            width: this.defaultWidth,
            height: this.defaultHeight,
            borderRadius: this.defaultRadius,
            duration: 0.15,
        });
    }

    onReset(): void {}
}
