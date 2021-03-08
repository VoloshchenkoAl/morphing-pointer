export interface Pointer {
    onUpdate(pointerX: number, pointerY: number): void;
    init(): void;
    onReset?(): void;
}

export type PointerClass = new (pointerElement: HTMLElement, targetElement?: HTMLElement) => Pointer;
