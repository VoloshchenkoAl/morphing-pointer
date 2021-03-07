export interface Pointer {
    onUpdate(pointerX: number, pointerY: number): void;
    onInit(targetElement?: Element): void;
    onReset(): void;
}
