/* Default Pointer Models */
import { DefaultPointer } from 'pointers/Default';
import { ContentPointer } from 'pointers/Content';
import { HighlightPointer } from 'pointers/Highlight';
import { LiftPointer } from 'pointers/Lift';

/* @Types */
import { PointerClass } from 'pointers/Pointer';

const pointerModelRegistry = new Map();

// Вигляда як типи готових поінтерів можна зробити як ENUM
pointerModelRegistry.set('default', DefaultPointer);
pointerModelRegistry.set('content', ContentPointer);
pointerModelRegistry.set('highlight', HighlightPointer);
pointerModelRegistry.set('lift', LiftPointer);

export function addPointer(pointerType: string, pointer: PointerClass): void {
    if (pointerModelRegistry.has(pointerType)) {
        // З помилки не ясно чому саме не вдалось додати новий поінтер.
        //  Можливо треба вказати, що поінтер з вказаним  ${pointerType} вже існує - більш явна причина помилка
        console.warn(`MorphingPointer: could not add custom pointer with type ${pointerType}, try to change custom pointer type`);

        return;
    }

    // Якщо я хочу дістати неіснуючий pointer - то мій код буде працювати і в рантаймі буде лише warn.
    //  не впевнений, але можливо тут треба якийсь null - щоб ззвоні можна було обробляти цей кейс, а не тихо працювати далі
    //  або тоді pointerType явно вказувати як дефолт без параметрів, щоб було зрозуміло з api - що повернеться дефолт
    pointerModelRegistry.set(pointerType, pointer);
}

export function getPointer(pointerType: string): PointerClass {
    if (!pointerModelRegistry.has(pointerType)) {
        console.warn(`MorphingPointer: could not get pointer with type ${pointerType}, try to change pointer type`);

        return pointerModelRegistry.get('default');
    }

    return pointerModelRegistry.get(pointerType);
}
