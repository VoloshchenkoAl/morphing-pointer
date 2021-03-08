/* @Helpers */
import { getPointer } from 'helpers/pointersRegistry';
import { createPointerElement } from 'helpers/pointer';

/* @Types */
import { Pointer } from 'pointers/Pointer';

export class MorphingPointer {
    private pointer: Pointer;
    private pointerElement: HTMLElement;
    private pointerPosition: { x: number; y: number };

    constructor() {
        this.pointerElement = createPointerElement();
        this.setDefaultPointer();
        this.pointerPosition = { x: 0, y: 0 };
    }

    public init(): void {
        this.initEventListeners();
        this.initPointerPositionUpdates();
    }

    private setSelectedPointer(pointerType: string, targetElement: HTMLElement): void {
        const SelectedPointerType = getPointer(pointerType);

        this.pointer = new SelectedPointerType(this.pointerElement, targetElement);
        this.pointer.init();
    }

    private setDefaultPointer(): void {
        const DefaultPointer = getPointer('default');

        this.pointer = new DefaultPointer(this.pointerElement);
        this.pointer.init();
    }

    private updatePointerPosition(x: number, y: number): void {
        this.pointer.onUpdate(x, y);
    }

    private initPointerPositionUpdates(): void {
        const update = () => {
            const { x, y } = this.pointerPosition;

            this.updatePointerPosition(x, y);
            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }

    private initEventListeners() {
        const pointers = Array.from(
            document.querySelectorAll('[data-pointer-type]')
        );

        pointers.forEach((pointer) => {
            pointer.addEventListener('mouseenter', (e) => {
                const element = e.currentTarget as HTMLElement;
                const { pointerType } = element.dataset;

                this.setSelectedPointer(pointerType, element);
            });

            pointer.addEventListener('mouseleave', () => {
                this.pointer.onReset();
                this.setDefaultPointer();
            });
        });

        window.addEventListener('mousemove', (event: MouseEvent) => {
            this.pointerPosition.x = event.clientX;
            this.pointerPosition.y = event.clientY;
        });
    }
}
