import { BasePointer } from '../Base';
import { gsap } from 'gsap';

export class ContentPointer extends BasePointer{
    private horizontalGridPosition: number[];
    private lineHeight: number;

    constructor(cursor: HTMLElement) {
        super(cursor);
        this.horizontalGridPosition = [];
        this.lineHeight = 0;
    }

    onUpdate(pointerX: number, pointerY: number): void {
        const { offsetWidth } = this.cursor;
        const roller = Math.max(...this.horizontalGridPosition.filter(top => pointerY > top));
        const baseX = pointerX - offsetWidth / 2;
        const minValue = Math.min(...this.horizontalGridPosition);
        const maxValue = Math.max(...this.horizontalGridPosition);
        const deltaY = pointerY > (roller + this.lineHeight - this.lineHeight / 4) ? this.lineHeight / 4 : (pointerY < (roller + this.lineHeight / 4)) ? -this.lineHeight / 4 : 0;
        const baseY = roller + deltaY;

        if (pointerY >= minValue && pointerY <= maxValue && roller > 0) {
            gsap.to(this.cursor, {
                x: baseX,
                y: baseY,
                duration: 0.15,
            });
        } else {
            gsap.to(this.cursor, {
                x: pointerX - offsetWidth / 2,
                y: pointerY - this.lineHeight / 2,
                duration: 0.15,
            });
        }
    }

    onUse(targetElement: Element): void {
        const { top, height } = targetElement.getBoundingClientRect();
        const lineHeight = parseInt(window.getComputedStyle(targetElement).lineHeight, 10);
        const paddingTop = parseFloat(window.getComputedStyle(targetElement).paddingTop);
        const paddingBottom = parseFloat(window.getComputedStyle(targetElement).paddingBottom);

        this.horizontalGridPosition = Array.from({ length: Math.round((height - paddingBottom - paddingTop) / lineHeight) }).map((_, index) => top + paddingTop + lineHeight + index * lineHeight);
        this.horizontalGridPosition.push(top + paddingTop);
        this.lineHeight = lineHeight;

        gsap.to(this.cursor, {
            width: this.lineHeight / 10,
            height: this.lineHeight,
            borderRadius: 10,
            duration: 0.15,
        });
    }

    onReset(): void {}
}