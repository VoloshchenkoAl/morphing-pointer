import { gsap } from 'gsap';

class Pointer {
    private defaultWidth: number;
    private defaultHeight: number;
    private defaultRadius: number;
    private isHighlighted: boolean;
    private cursor: HTMLElement;
    private targetElement: HTMLElement;
    private specularLayer: HTMLElement;
    private targetElementValues: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
    private isLifted: boolean;

    constructor() {
        this.defaultWidth = 20;
        this.defaultHeight = 20;
        this.defaultRadius = 100;
        this.isHighlighted = false;
        this.isLifted = false;
        this.cursor = null;
        this.targetElement = null;
        this.specularLayer = null;
        this.initPointer();
    }

    initPointer(): void {
        const div = document.createElement('div');
        const specular = document.createElement('div');
        const style = document.createElement('style');

        div.classList.add('iPad-pointer');
        specular.classList.add('iPad-specular');

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
                width: ${this.defaultWidth}px;
                height: ${this.defaultHeight}px;
                border-radius: ${this.defaultRadius}px;
                background-color: rgba(0,0,0,0.23);
                z-index: 99999999;
                transition: background-color 150ms ease;
            }

            .iPad-specular {
                position: fixed;
                pointer-events: none;
                top: 0;
                left: 0;
                width: 0;
                height: 0;
                border-radius: 0;
                z-index: 99999999;
            }

            .iPad-pointer--active {
                z-index: -1;
                background-color: rgba(0,0,0,0.07);
            }

            .iPad-pointer--active-lift {
                z-index: -1;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(div);
        document.body.appendChild(specular);

        this.cursor = div;
        this.specularLayer = specular;
    }

    updatePosition(x: number, y: number): void {
        if (!this.isHighlighted && !this.isLifted && !!this.cursor) {
            gsap.to(this.cursor, {
                x: x - this.defaultWidth / 2,
                y: y - this.defaultWidth / 2,
                duration: 0.05,
            });
        }

        if (this.isHighlighted) {
            const { top, left, width, height } = this.targetElementValues;
            const newX = left - (left - x + width / 2) / 6;
            const newY = top - (top - y + height / 2) / 8;

            gsap.to(this.cursor, {
                x: newX,
                y: newY,
                duration: 0.15,
            });

            gsap.to(this.specularLayer, {
                x: newX,
                y: newY,
                duration: 0.15,
                backgroundImage: `radial-gradient(circle at ${Math.abs(
                    left - x
                )}px ${Math.abs(
                    top - y
                )}px, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 60%)`,
            });

            gsap.to(this.targetElement, {
                x: -(left - x + width / 2) / 18,
                y: -(top - y + height / 2) / 20,
                duration: 0.15,
            });
        }

        if (this.isLifted) {
            const scale = 1.15;
            const { top, left, width, height } = this.targetElementValues;
            const scaledWidth = width * scale;
            const scaledHeight = height * scale;
            const deltaX = -(left - 0.075 * width - x + scaledWidth / 2) / 10;
            const deltaY = -(top - 0.075 * height - y + scaledHeight / 2) / 12;
            const newX = left - 0.075 * width + deltaX;
            const newY = top - 0.075 * height + deltaY;

            gsap.to(this.cursor, {
                x: newX,
                y: newY,
                duration: 0.15,
            });

            gsap.to(this.specularLayer, {
                x: newX,
                y: newY,
                duration: 0.15,
                backgroundImage: `radial-gradient(circle at ${Math.abs(
                    left - x
                )}px ${Math.abs(
                    top - y
                )}px, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0) 60%)`,
            });

            gsap.to(this.targetElement, {
                x: deltaX,
                y: deltaY,
                duration: 0.15,
            });
        }
    }

    setHighlight(element: HTMLElement) {
        const { width, height, top, left } = element.getBoundingClientRect();
        const radius: number = parseFloat(
            window.getComputedStyle(element).borderRadius
        );

        this.targetElementValues = {
            top,
            left,
            width,
            height,
        };
        this.targetElement = element;
        this.isHighlighted = true;
        this.cursor.classList.add('iPad-pointer--active');

        gsap.to(this.cursor, {
            y: top,
            x: left,
            width,
            height,
            borderRadius: radius,
            duration: 0.15,
        });

        gsap.to(this.specularLayer, {
            y: top,
            x: left,
            width,
            height,
            borderRadius: radius,
            duration: 0.15,
        });
    }

    setLift(element: HTMLElement) {
        const { width, height, top, left } = element.getBoundingClientRect();
        const radius: number = parseFloat(
            window.getComputedStyle(element).borderRadius
        );
        const bgColor: string = window.getComputedStyle(element)
            .backgroundColor;

        this.targetElement = element;
        this.targetElementValues = {
            top,
            left,
            width,
            height,
        };
        this.isLifted = true;

        this.cursor.classList.add('iPad-pointer--active-lift');
        // this.cursor.style.backgroundColor = bgColor;
        gsap.to(this.cursor, {
            y: top - 0.075 * height,
            x: left - 0.075 * width,
            width: width * 1.15,
            height: height * 1.15,
            borderRadius: radius,
            duration: 0.15,
            filter: `drop-shadow(0 -3px 12px ${bgColor}) drop-shadow(0 3px 6px black)`,
        });

        gsap.to(this.specularLayer, {
            y: top - 0.075 * height,
            x: left - 0.075 * width,
            width: width * 1.15,
            height: height * 1.15,
            borderRadius: radius,
            duration: 0.15,
        });

        gsap.to(this.targetElement, {
            scale: 1.15,
            duration: 0.15,
        });
    }

    resetButton() {
        if (this.isHighlighted) {
            this.cursor.classList.remove('iPad-pointer--active');

            gsap.to(this.cursor, {
                width: this.defaultWidth,
                height: this.defaultHeight,
                borderRadius: this.defaultRadius,
                duration: 0.15,
            });

            gsap.to(this.targetElement, {
                x: 0,
                y: 0,
                duration: 0.15,
            });

            gsap.to(this.specularLayer, {
                backgroundImage: 'none',
            });

            this.isHighlighted = false;
        }

        if (this.isLifted) {
            this.isLifted = false;
            this.cursor.classList.remove('iPad-pointer--active-lift');
            gsap.to(this.cursor, {
                width: this.defaultWidth,
                height: this.defaultHeight,
                borderRadius: this.defaultRadius,
                duration: 0.15,
                filter: 'drop-shadow(0 0 0 gray)',
            });

            gsap.to(this.specularLayer, {
                backgroundImage: 'none',
                scale: 1,
            });

            gsap.to(this.targetElement, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.15,
            });
        }

        this.targetElement = null;
    }
}

export default Pointer;
