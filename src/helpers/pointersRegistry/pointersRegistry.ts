/* Default Pointer Models */
import { DefaultPointer } from 'pointers/Default';
import { ContentPointer } from 'pointers/Content';
import { HighlightPointer } from 'pointers/Highlight';
import { LiftPointer } from 'pointers/Lift';

/* @Types */
import { Pointer } from 'pointers/Base';

const pointerModelRegistry = new Map();

pointerModelRegistry.set('default', DefaultPointer);
pointerModelRegistry.set('content', ContentPointer);
pointerModelRegistry.set('highlight', HighlightPointer);
pointerModelRegistry.set('lift', LiftPointer);

export function addPointer(pointerType: string, pointer: Pointer) {
    if (pointerModelRegistry.has(pointerType)) {
        console.warn(`MorphingPointer: could not add custom pointer with type ${pointerType}, try to change custom pointer type`);

        return;
    }

    pointerModelRegistry.set(pointerType, pointer);
};

export function getPointer(pointerType: string): Pointer {
    if (!pointerModelRegistry.has(pointerType)) {
        console.warn(`MorphingPointer: could not get pointer with type ${pointerType}, try to change pointer type`);

        return;
    }

    return pointerModelRegistry.get(pointerType);
};

