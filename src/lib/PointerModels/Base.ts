export abstract class BasePointer {
    protected cursor: HTMLElement;

    constructor(cursor: HTMLElement) {
        this.cursor = cursor;
    }

    abstract onUpdate(pointerX: number, pointerY: number): void
    abstract onUse(targetElement?: Element): void
    abstract onReset(): void
}
