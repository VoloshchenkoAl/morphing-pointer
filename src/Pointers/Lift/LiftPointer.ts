/* @Animation Lib */
import { gsap } from 'gsap';

/* @Types */
import { Pointer } from 'pointers/Pointer';

/* @Helpers */
import { SpecularLayer } from 'helpers/SpecularLayer';

export class LiftPointer implements Pointer {
    private specularLayer: SpecularLayer;
    private targetElement: Element;
    private targetElementValues: {
        top: number;
        left: number;
        width: number;
        height: number;
        zIndex: number;
    };
    private cssLiftClass: string;
    private liftStyle: Element;
    private pointerElement: HTMLElement;

    constructor(pointerElement: HTMLElement, targetElement: HTMLElement) {
        this.specularLayer = new SpecularLayer();
        this.cssLiftClass = 'pointer-lift-type';
        this.liftStyle = null;
        this.pointerElement = pointerElement;
        this.targetElement = targetElement;
    }

    public init(): void {
        const { width, height, top, left } = this.targetElement.getBoundingClientRect();
        const targetStyles = window.getComputedStyle(this.targetElement);
        const radius: number = parseFloat(targetStyles.borderRadius);
        const zIndex: number = parseFloat(targetStyles.zIndex);
        const targetBgColor: string = targetStyles.backgroundColor;

        this.targetElementValues = {
            top,
            left,
            width,
            height,
            zIndex,
        };

        this.addLiftStyle();
        this.specularLayer.init();
        this.pointerElement.classList.add(this.cssLiftClass);

        gsap.to(this.pointerElement, {
            y: top - 0.075 * height,
            x: left - 0.075 * width,
            width: width * 1.15,
            height: height * 1.15,
            borderRadius: radius,
            duration: 0.15,
            filter: `drop-shadow(0 -3px 12px ${targetBgColor}) drop-shadow(0 3px 6px black)`,
        });

        this.specularLayer.update((specularLayer) => {
            gsap.to(specularLayer, {
                y: top - 0.075 * height,
                x: left - 0.075 * width,
                width: width * 1.15,
                height: height * 1.15,
                borderRadius: radius,
                duration: 0.15,
            });
        });

        gsap.to(this.targetElement, {
            scale: 1.15,
            duration: 0.15,
        });
    }

    public onUpdate(pointerX: number, pointerY: number) {
        const scale = 1.15;
        const { top, left, width, height } = this.targetElementValues;
        const scaledWidth = width * scale;
        const scaledHeight = height * scale;
        const deltaX =
            -(left - 0.075 * width - pointerX + scaledWidth / 2) / 10;
        const deltaY =
            -(top - 0.075 * height - pointerY + scaledHeight / 2) / 12;
        const newX = left - 0.075 * width + deltaX;
        const newY = top - 0.075 * height + deltaY;

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
            x: deltaX,
            y: deltaY,
            duration: 0.15,
        });
    }

    public onReset() {
        this.removeLiftStyle();
        this.specularLayer.destroy();
        this.pointerElement.classList.remove(this.cssLiftClass);

        gsap.to(this.pointerElement, {
            duration: 0.15,
            filter: 'none',
        });

        gsap.to(this.targetElement, {
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.15,
        });
    }

    private removeLiftStyle(): void {
        this.liftStyle.parentElement.removeChild(this.liftStyle);
    }

    private addLiftStyle(): void {
        const style = document.createElement('style');

        style.innerHTML = `
            .${this.cssLiftClass} {
                background-color: rgba(0,0,0,0.05);
                z-index: ${this.targetElementValues.zIndex - 1};
            }
        `;

        this.liftStyle = style;

        document.head.appendChild(this.liftStyle);
    }
}
