// js/state_engine.js

export class StateEngine {
  constructor() {}

  applyValidationStates(results) {
    for (const r of results) {
      const el = document.querySelector(
        `[data-entity-id="${r.entityId}"][data-entity-type="${r.type}"]`
      );
      if (!el) continue;

      el.classList.remove("state-valid", "state-invalid");
      if (r.ok) {
        el.classList.add("state-valid");
      } else {
        el.classList.add("state-invalid");
      }
    }
  }

  markSelected(entityId, entityType) {
    document.querySelectorAll(".world-object").forEach((el) => {
      el.classList.remove("state-selected");
    });

    if (!entityId || !entityType) return;

    const el = document.querySelector(
      `[data-entity-id="${entityId}"][data-entity-type="${entityType}"]`
    );
    if (el) el.classList.add("state-selected");
  }
}
