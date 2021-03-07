import { DefaultPointer } from 'pointers/Default';

/* @helpers */
import { getPointer } from 'helpers/pointersRegistry';

export class MorphingPointer {
    private pointer: DefaultPointer;
    private pointerPosition: { x: number; y: number };

    constructor() {
        this.pointer = new DefaultPointer();
        this.pointerPosition = { x: 0, y: 0 };
    }

    public init() {
        this.initEventListeners();
        this.initPointerPositionUpdates();
    }

    private setType(pointerType: string, targetElement: Element): void {
        const selectedPointerType = getPointer(pointerType);

        this.pointer.setTargetElement(targetElement);
        this.pointer.setType(selectedPointerType);
    }

    private setDefaultType(): void {
        this.pointer.onReset();
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

                this.setType(pointerType, element);
            });

            pointer.addEventListener('mouseleave', () => {
                this.setDefaultType();
            });
        });

        window.addEventListener('mousemove', (event: MouseEvent) => {
            this.pointerPosition.x = event.clientX;
            this.pointerPosition.y = event.clientY;
        });
    }
}
