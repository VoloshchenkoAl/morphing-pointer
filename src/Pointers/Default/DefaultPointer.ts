import { gsap } from 'gsap';

/* @Types */
import { Pointer } from '../Base';

export class DefaultPointer {
    private pointer: HTMLElement;
    private pointerType: Pointer;
    private targetElement: Element;
    private defaultStyle: { width: number; height: number; radius: number };

    constructor() {
        this.pointer = this.createPointer();
        this.pointerType = null;
        this.targetElement = null;
        this.defaultStyle = {
            width: 20,
            height: 20,
            radius: 100,
        };
    }

    public onUpdate(pointerX: number, pointerY: number) {
        if (this.pointerType) {
            this.pointerType.onUpdate(pointerX, pointerY);

            return;
        }

        gsap.to(this.pointer, {
            x: pointerX - this.defaultStyle.width / 2,
            y: pointerY - this.defaultStyle.height / 2,
            duration: 0.05,
        });
    }

    public setTargetElement(targetElement: Element) {
        this.targetElement = targetElement;
    }

    // TODO: REMOVE ANY
    public setType(PointerType: any) {
        this.pointerType = new PointerType(this.pointer);
        this.pointerType.onInit(this.targetElement);
    }

    public onReset() {
        if (this.pointerType) {
            this.pointerType.onReset();
        }

        this.targetElement = null;
        this.pointerType = null;

        gsap.to(this.pointer, {
            width: this.defaultStyle.width,
            height: this.defaultStyle.height,
            borderRadius: this.defaultStyle.radius,
            duration: 0.15,
        });
    }

    private createPointer() {
        const div = document.createElement('div');
        const style = document.createElement('style');

        div.classList.add('iPad-pointer');

        style.innerText = `
            body, [data-pointer-type] {
                 cursor: none;
            }

            button, link {
                outline: none !important;
            }

            .iPad-pointer {
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
}
