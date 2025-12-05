# MindEnv HTML Laws Skeleton

This repo is a minimal testbed to see if the following idea is **actually workable**:

> Treat HTML as an “environment”, define **structural laws** in C++ style, and enforce those laws at runtime in the browser using JavaScript, with CSS acting as a layered skin.

No backend. No cloud. Just static files you can host on GitHub Pages.

## Concept

- **HTML**: defines the world and its “appendix” pages using attributes like
  `data-law-entity`, `data-law-id`, `data-law-parent`, `data-law-order`, and
  `data-law-role`.

- **C++**: the file `cpp/laws.h` describes the structural laws in C++-style
  structs (`AppendixPage`, `AppendixSection`). It is not compiled here; it is the
  conceptual source of truth.

- **JavaScript**: `js/law_check.js` is a small runtime “law checker” that inspects
  the DOM and verifies that the current page obeys the C++-style laws:
  - Each page body must declare a `data-law-entity` and `data-law-id`.
  - Each appendix block must have ID, parent, order, and title/body roles.

- **CSS**: the `css/` folder is treated as a kind of **CSS appendix**:
  - `base.css` – resets, typography.
  - `layout.css` – zones and layout.
  - `appendix.css` – appendix-specific styling.
  - `states.css` – visual feedback for “law OK” vs “law error”.

The target here is not beauty. It’s a clear architecture test: does the
HTML → C++ laws → JS enforcement loop make sense and behave predictably?

## File Overview

- `index.html` – world root page, with a small appendix preview.
- `appendix/appendix-index.html` – appendix overview.
- `appendix/appendix-a1.html` – a valid appendix page (law check should pass).
- `appendix/appendix-a2.html` – intentionally broken page (law check should fail).

- `js/law_check.js` – law validation logic.
- `js/env.js` – bootstraps validation on DOM ready.

- `cpp/laws.h` – C++-style law definitions.
- `cpp/NOTES.md` – mapping between C++ laws and HTML attributes.

## Running Locally

You can simply open the HTML files in the browser, but a tiny local server is nicer
for path consistency.

From the repo root:

```bash
# Python 3
python -m http.server 8000

# Then visit:
#   http://localhost:8000/index.html
#   http://localhost:8000/appendix/appendix-index.html
#   http://localhost:8000/appendix/appendix-a1.html
#   http://localhost:8000/appendix/appendix-a2.html
