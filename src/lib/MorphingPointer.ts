import { BasePointer } from './PointerModels/Base';
import { DefaultPointer } from './PointerModels/Default';
import { ContentPointer } from './PointerModels/Content';
import { HighlightPointer } from './PointerModels/Highlight';
import { LiftPointer } from './PointerModels/Lift';

export class MorphingPointer {
    private cursor: HTMLElement;
    private currentPointer: BasePointer;
    private pointerTypeRegistry: Map<string, any>;

    constructor() {
        this.initPointer();
        this.currentPointer = new DefaultPointer(this.cursor);
        this.pointerTypeRegistry = new Map();
        this.pointerTypeRegistry.set('default', DefaultPointer);
        this.pointerTypeRegistry.set('content', ContentPointer);
        this.pointerTypeRegistry.set('highlight', HighlightPointer);
        this.pointerTypeRegistry.set('lift', LiftPointer);
    }

    setType(pointerType: string, targetElement: Element): void {
        const SelectedPointer = this.pointerTypeRegistry.get(pointerType);

        this.currentPointer = new SelectedPointer(this.cursor);
        this.currentPointer.onUse(targetElement);
    }

    setDefaultType(): void {
        this.currentPointer.onReset();
        this.currentPointer = new DefaultPointer(this.cursor);
        this.currentPointer.onUse();
    }

    updatePosition(x: number, y: number): void {
        this.currentPointer.onUpdate(x, y);
    }

    initPointer(): void {
        const div = document.createElement('div');
        const style = document.createElement('style');

        div.classList.add('iPad-pointer');

        style.innerText = `
            body, [data-pointer-type] {
                 cursor: none;
            }

            button, link {
                outline: none !important;
            }

            .iPad-pointer {
                position: fixed;
                pointer-events: none;
                top: 0;
                left: 0;
                width: 20px;
                height: 20px;
                border-radius: 100px;
                background-color: rgba(0,0,0,0.23);
                z-index: 99999999;
                transition: background-color 150ms ease;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(div);

        this.cursor = div;
    }
}