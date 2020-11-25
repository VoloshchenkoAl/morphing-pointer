/* @Pointer */
import { Pointer } from './Pointer';

/* @Pointer types */
import { ContentPointer } from './PointerTypes/Content';
import { HighlightPointer } from './PointerTypes/Highlight';
import { LiftPointer } from './PointerTypes/Lift';

export class MorphingPointer {
    private pointer: Pointer;
    // TODO: REMOVE ANY
    private pointerModelRegistry: Map<string, any>;

    constructor() {
        this.pointer = new Pointer();
        this.pointerModelRegistry = new Map();
        this.pointerModelRegistry.set('content', ContentPointer);
        this.pointerModelRegistry.set('highlight', HighlightPointer);
        this.pointerModelRegistry.set('lift', LiftPointer);
    }

    setType(pointerType: string, targetElement: Element): void {
        const selectedPointerType = this.pointerModelRegistry.get(pointerType);

        this.pointer.setTargetElement(targetElement);
        this.pointer.setType(selectedPointerType);
    }

    setDefaultType(): void {
        this.pointer.onReset();
    }

    updatePosition(x: number, y: number): void {
        this.pointer.onUpdate(x, y);
    }
}
