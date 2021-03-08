/* @Animation Lib */
import { gsap } from 'gsap';

/* @Types */
import { Pointer } from 'pointers/Pointer';

export class ContentPointer implements Pointer {
    private horizontalGridPosition: number[];
    private lineHeight: number;
    private pointerElement: HTMLElement;
    private targetElement: HTMLElement;

    constructor(pointerElement: HTMLElement, targetElement: HTMLElement) {
        this.pointerElement = pointerElement;
        this.targetElement = targetElement;
        this.horizontalGridPosition = [];
        this.lineHeight = 0;
    }

    public onUpdate(pointerX: number, pointerY: number): void {
        const { offsetWidth } = this.pointerElement;
        const roller = Math.max(
            ...this.horizontalGridPosition.filter((top) => pointerY > top)
        );
        const baseX = pointerX - offsetWidth / 2;
        const minValue = Math.min(...this.horizontalGridPosition);
        const maxValue = Math.max(...this.horizontalGridPosition);
        const deltaY =
            pointerY > roller + this.lineHeight - this.lineHeight / 4
                ? this.lineHeight / 4
                : pointerY < roller + this.lineHeight / 4
                ? -this.lineHeight / 4
                : 0;
        const baseY = roller + deltaY;

        if (pointerY >= minValue && pointerY <= maxValue && roller > 0) {
            gsap.to(this.pointerElement, {
                x: baseX,
                y: baseY,
                duration: 0.15,
            });
        } else {
            gsap.to(this.pointerElement, {
                x: pointerX - offsetWidth / 2,
                y: pointerY - this.lineHeight / 2,
                duration: 0.15,
            });
        }
    }

    public init(): void {
        const { top, height } = this.targetElement.getBoundingClientRect();
        const targetElementStyles = window.getComputedStyle(this.targetElement);
        const lineHeight = parseInt(targetElementStyles.lineHeight, 10) || 16;
        const paddingTop = parseFloat(targetElementStyles.paddingTop);
        const paddingBottom = parseFloat(targetElementStyles.paddingBottom);

        this.horizontalGridPosition = Array.from({
            length: Math.round(
                (height - paddingBottom - paddingTop) / lineHeight
            ),
        }).map(
            (_, index) => top + paddingTop + lineHeight + index * lineHeight
        );

        this.horizontalGridPosition.push(top + paddingTop);
        this.lineHeight = lineHeight;

        gsap.to(this.pointerElement, {
            width: this.lineHeight / 10,
            height: this.lineHeight,
            borderRadius: 10,
            duration: 0.15,
        });
    }

    public onReset(): void {}
}
