import { MorphingPointer } from './MorphingPointer';

export { addPointer } from 'helpers/pointersRegistry';

export function initMorphingPointer(): void {
    new MorphingPointer().init();
}
