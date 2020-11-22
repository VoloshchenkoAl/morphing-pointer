import { BasePointer } from '../Base';
import { SpecularLayer } from '../helpers/SpecularLayer';
import { gsap } from 'gsap';

export class HighlightPointer extends BasePointer {
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

    constructor(cursor: HTMLElement) {
        super(cursor);
        this.specularLayer = new SpecularLayer();
        this.highlightStyle = null;
        this.cssHighlightClass = 'pointer-highlight-type';
    }

    onUpdate(pointerX: number, pointerY: number): void {
        const { top, left, width, height } = this.targetElementValues;
        const newX = left - (left - pointerX + width / 2) / 6;
        const newY = top - (top - pointerY + height / 2) / 8;

        gsap.to(this.cursor, {
            x: newX,
            y: newY,
            duration: 0.15,
        });

        this.specularLayer.update(specularLayer => {
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
        })

        gsap.to(this.targetElement, {
            x: -(left - pointerX + width / 2) / 18,
            y: -(top - pointerY + height / 2) / 20,
            duration: 0.15,
        });
    }

    onUse(targetElement: Element): void {
        const { width, height, top, left } = targetElement.getBoundingClientRect();
        const radius: number = parseFloat(
            window.getComputedStyle(targetElement).borderRadius
        );
        const zIndex: number = parseFloat(
            window.getComputedStyle(targetElement).zIndex
        );
        this.targetElementValues = { top, left, width, height, zIndex };
        this.targetElement = targetElement;

        this.specularLayer.init();
        this.createHighlighStyle();

        this.cursor.classList.add(this.cssHighlightClass);

        gsap.to(this.cursor, {
            y: top,
            x: left,
            width,
            height,
            borderRadius: radius,
            duration: 0.15,
        });

        this.specularLayer.update(specularLayer => {
            gsap.to(specularLayer, {
                y: top,
                x: left,
                width,
                height,
                borderRadius: radius,
                duration: 0.15,
            });
        })
    }

    onReset(): void {
        this.specularLayer.destroy();
        this.removeHighlighStyle();
        this.cursor.classList.remove(this.cssHighlightClass);

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
