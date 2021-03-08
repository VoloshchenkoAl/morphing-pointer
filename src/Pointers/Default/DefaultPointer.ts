/* @Animation Lib */
import { gsap } from 'gsap';

/* @Types */
import { Pointer } from 'pointers/Pointer';

export class DefaultPointer implements Pointer {
    private pointerElement: HTMLElement;
    private defaultStyle: { width: number; height: number; radius: number };

    constructor(pointerElement: HTMLElement) {
        this.pointerElement = pointerElement;
        this.defaultStyle = {
            width: 20,
            height: 20,
            radius: 100,
        };
    }

    public onUpdate(pointerX: number, pointerY: number) {
        gsap.to(this.pointerElement, {
            x: pointerX - this.defaultStyle.width / 2,
            y: pointerY - this.defaultStyle.height / 2,
            duration: 0.05,
        });
    }

    public init() {
        gsap.to(this.pointerElement, {
            width: this.defaultStyle.width,
            height: this.defaultStyle.height,
            borderRadius: this.defaultStyle.radius,
            duration: 0.15,
        });
    }

    public onReset(): void {};
}
