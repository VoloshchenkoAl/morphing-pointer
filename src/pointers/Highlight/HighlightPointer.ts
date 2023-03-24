/* @Animation Lib */
import { gsap } from 'gsap';

/* @Types */
import { Pointer } from 'pointers/Pointer';

/* @Helpers */
import { SpecularLayer } from 'helpers/SpecularLayer';

export class HighlightPointer implements Pointer {
    private specularLayer: SpecularLayer;
    private highlightStyle: HTMLElement;
    private targetElementValues: {
        top: number;
        left: number;
        width: number;
        height: number;
        zIndex: number;
    };
    private targetElement: Element;
    private cssHighlightClass: string;
    private pointerElement: HTMLElement;

    constructor(pointerElement: HTMLElement, targetElement: HTMLElement) {
        this.specularLayer = new SpecularLayer();
        this.highlightStyle = null;
        this.cssHighlightClass = 'pointer-highlight-type';
        this.pointerElement = pointerElement;
        this.targetElement = targetElement;
    }

    public onUpdate(pointerX: number, pointerY: number): void {
        const { top, left, width, height } = this.targetElementValues;
        const newX = left - (left - pointerX + width / 2) / 6;
        const newY = top - (top - pointerY + height / 2) / 8;

        gsap.to(this.pointerElement, {
            x: newX,
            y: newY,
            duration: 0.15,
        });

        this.specularLayer.update((specularLayer) => {
            gsap.to(specularLayer, {
                x: newX,
                y: newY,
                duration: 0.15,
                backgroundImage: `radial-gradient(circle at ${Math.abs(
                    left - pointerX
                )}px ${Math.abs(
                    top - pointerY
                )}px, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 60%)`,
            });
        });

        gsap.to(this.targetElement, {
            x: -(left - pointerX + width / 2) / 18,
            y: -(top - pointerY + height / 2) / 20,
            duration: 0.15,
        });
    }

    public init(): void {
        const {
            width,
            height,
            top,
            left,
        } = this.targetElement.getBoundingClientRect();
        const radius: number = parseFloat(
            window.getComputedStyle(this.targetElement).borderRadius
        );

        // чи може zIndex бути Float ?
        const zIndex: number = parseFloat(
            window.getComputedStyle(this.targetElement).zIndex
        );
        this.targetElementValues = { top, left, width, height, zIndex };

        this.specularLayer.init();
        this.createHighlighStyle();

        this.pointerElement.classList.add(this.cssHighlightClass);

        gsap.to(this.pointerElement, {
            y: top,
            x: left,
            width,
            height,
            borderRadius: radius,
            duration: 0.15,
        });

        this.specularLayer.update((specularLayer) => {
            gsap.to(specularLayer, {
                y: top,
                x: left,
                width,
                height,
                borderRadius: radius,
                duration: 0.15,
            });
        });
    }

    public onReset(): void {
        this.specularLayer.destroy();
        this.removeHighlighStyle();
        this.pointerElement.classList.remove(this.cssHighlightClass);

        gsap.to(this.targetElement, {
            x: 0,
            y: 0,
            duration: 0.15,
        });
    }

    private removeHighlighStyle(): void {
        this.highlightStyle.parentElement.removeChild(this.highlightStyle);
    }

    private createHighlighStyle(): void {
        const style = document.createElement('style');

        style.innerHTML = `
            .${this.cssHighlightClass} {
                z-index: ${this.targetElementValues.zIndex - 1};
                background-color: rgba(0,0,0,0.07);
            }
        `;

        this.highlightStyle = style;

        document.head.appendChild(this.highlightStyle);
    }
}
