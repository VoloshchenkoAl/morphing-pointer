/* @Pointer */
import { Pointer } from './Pointer';

/* @Pointer types */
import { ContentPointer } from './PointerTypes/Content';
import { HighlightPointer } from './PointerTypes/Highlight';
import { LiftPointer } from './PointerTypes/Lift';

export class MorphingPointer {
    private pointer: Pointer;
    private pointerPosition: { x: number; y: number };
    // TODO: REMOVE ANY
    private pointerModelRegistry: Map<string, any>;

    constructor() {
        this.pointer = new Pointer();
        this.pointerPosition = { x: 0, y: 0 };
        this.pointerModelRegistry = new Map();
        this.pointerModelRegistry.set('content', ContentPointer);
        this.pointerModelRegistry.set('highlight', HighlightPointer);
        this.pointerModelRegistry.set('lift', LiftPointer);
    }

    public init() {
        this.initEventListeners();
        this.initUpdates();
    }

    private setType(pointerType: string, targetElement: Element): void {
        const selectedPointerType = this.pointerModelRegistry.get(pointerType);

        this.pointer.setTargetElement(targetElement);
        this.pointer.setType(selectedPointerType);
    }

    private setDefaultType(): void {
        this.pointer.onReset();
    }

    private updatePosition(x: number, y: number): void {
        this.pointer.onUpdate(x, y);
    }

    private initUpdates() {
        const update = () => {
            this.updatePosition(this.pointerPosition.x, this.pointerPosition.y);
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
