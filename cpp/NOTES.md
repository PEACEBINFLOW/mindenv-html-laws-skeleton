# MindEnv Laws – Notes

This folder contains C++-style structural law definitions for the HTML environment.

The key entities are:

- `AppendixPage`
- `AppendixSection`

They are mapped into HTML through `data-*` attributes:

- `AppendixPage`:
  - `<body data-law-entity="AppendixPage" data-law-id="A1">`

- `AppendixSection`:
  - `<article data-law-entity="AppendixSection" data-law-id="A1-1" data-law-parent="A1" data-law-order="1">`

Each section must contain at least:

- One element with `data-law-role="title"`.
- One element with `data-law-role="body"`.

The JavaScript runtime (`js/law_check.js`) walks the DOM and validates each page
against the expectations encoded in `cpp/laws.h`.

Later, this runtime can be replaced by a C++/WASM engine that reads the same
structs and enforces the same laws, with the HTML remaining unchanged.
