export abstract class BasePointer {
    protected pointer: HTMLElement;

    constructor(pointer: HTMLElement) {
        this.pointer = pointer;
    }

    abstract onUpdate(pointerX: number, pointerY: number): void;
    abstract onInit(targetElement?: Element): void;
    abstract onReset(): void;
}
