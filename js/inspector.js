// js/inspector.js

export class Inspector {
  constructor({ objectListEl, detailsEl, lawSummaryEl, stateEngine }) {
    this.objectListEl = objectListEl;
    this.detailsEl = detailsEl;
    this.lawSummaryEl = lawSummaryEl;
    this.stateEngine = stateEngine;
    this.entities = [];
    this.lastValidation = [];
  }

  setEntities(entities) {
    this.entities = entities;
    this.renderObjectList();
  }

  setValidationResults(results) {
    this.lastValidation = results;
    this.renderLawSummary();
  }

  renderObjectList() {
    this.objectListEl.innerHTML = "";
    for (const e of this.entities) {
      const li = document.createElement("li");
      li.textContent = `${e.type} – ${e.id}${
        e.label ? ` (${e.label})` : ""
      }`;
      li.dataset.entityId = e.id;
      li.dataset.entityType = e.type;
      li.addEventListener("click", () => this.handleSelect(e));
      this.objectListEl.appendChild(li);
    }
  }

  renderLawSummary() {
    if (!this.lastValidation || this.lastValidation.length === 0) {
      this.lawSummaryEl.textContent = "No law checks have been run.";
      return;
    }

    const lines = [];
    for (const r of this.lastValidation) {
      const status = r.ok ? "OK" : "FAIL";
      lines.push(
        `[${status}] ${r.type} ${r.entityId} – laws: ${r.laws.length}`
      );
      for (const l of r.laws) {
        const symbol = l.ok ? "  ✓" : "  ×";
        lines.push(
          `${symbol} ${l.lawId} (card: ${l.cardId}) – ${l.details}`
        );
      }
      lines.push("");
    }

    this.lawSummaryEl.textContent = lines.join("\n");
  }

  handleSelect(entity) {
    this.stateEngine.markSelected(entity.id, entity.type);

    const snapshot = {
      id: entity.id,
      type: entity.type,
      label: entity.label || null,
      attributes: entity.attributes,
    };

    this.detailsEl.textContent = JSON.stringify(snapshot, null, 2);
  }
}
