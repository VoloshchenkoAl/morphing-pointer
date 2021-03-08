# Morphing pointer (experimental project)

This is a custom pointer in iPadOS style

## Installation

Install with npm:

```js
npm install --save morphing-pointer
```

<img src="https://raw.githubusercontent.com/VoloshchenkoAl/morphing-pointer/main/public/animation.gif" alt="morphing pointer" />

## Example of use

Init Morphing Pointer in your app

```js
import { initMorphingPointer } from 'circular-revealer';

initMorphingPointer();
```

And use different triggers in html to add different types of animation

| animation type | data attr                     |
| -------------- | ----------------------------- |
| highlight      | data-pointer-type="highlight" |
| lift           | data-pointer-type="lift"      |
| content        | data-pointer-type="content"   |


```html
<button data-pointer-type="lift">Button</button>
<button data-pointer-type="highlight">Another button</button>
<p data-pointer-type="content">text</p>
```

---

Inspired by [Pointers (iPadOS)](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/pointers/)
