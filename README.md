# MindsEye Object World (MOW)

MindsEye Object World is an experimental browser-native engine that treats a web page as a **living object world**:

- **HTML** is the environment and matter.
- **CSS** is the visible skin and state layers.
- **JavaScript** is the inspector, message bus, and runtime.
- **C++** (planned via WASM) encodes deep structural laws and invariants.
- **Python** scripts generate and compile "cards" that inject new laws and behaviors.
- **Smalltalk-inspired** message passing drives object interactions.

The core idea:  
A page is not just markup. It is a governed world, where every entity has laws, messages, and patterns.

---

## High-Level Concepts

### Objects

Any DOM node with `data-entity-id` and `data-entity-type` is treated as a world object:

```html
<div
  class="world-object"
  data-entity-id="A1-1"
  data-entity-type="AppendixSection"
  data-entity-label="A1-1: Structural Law Block"
>
  ...
</div>
