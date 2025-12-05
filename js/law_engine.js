// js/law_engine.js

export class LawEngine {
  constructor() {
    this.laws = [];
  }

  registerCard(card) {
    if (!card || !Array.isArray(card.laws)) return;
    for (const law of card.laws) {
      this.laws.push({
        cardId: card.id,
        appliesTo: card.applies_to || [],
        id: law.id,
        description: law.description || "",
        severity: law.severity || "info",
        check: this.buildCheckFunction(law),
      });
    }
  }

  buildCheckFunction(law) {
    // Minimal mechanism, can be extended as needed
    if (law.type === "appendix_minimal_structure") {
      return (entity) => {
        const attrs = entity.attributes;
        const missing = [];

        const requiredAttrs = [
          "data-entity-id",
          "data-entity-type",
          "data-parent-id",
          "data-order",
          "data-title-role",
          "data-body-role",
        ];

        for (const key of requiredAttrs) {
          if (!attrs[key]) missing.push(key);
        }

        return {
          ok: missing.length === 0,
          details:
            missing.length === 0
              ? "All required attributes present."
              : `Missing attributes: ${missing.join(", ")}`,
        };
      };
    }

    // Default pass-through law
    return () => ({
      ok: true,
      details: "No-op law (placeholder).",
    });
  }

  validateEntities(entities) {
    const results = [];
    for (const entity of entities) {
      const applicable = this.laws.filter((law) =>
        law.appliesTo.includes(entity.type)
      );

      const lawResults = [];
      let overallOk = true;

      for (const law of applicable) {
        const r = law.check(entity);
        if (!r.ok) overallOk = false;
        lawResults.push({
          lawId: law.id,
          cardId: law.cardId,
          severity: law.severity,
          ok: r.ok,
          details: r.details,
        });
      }

      results.push({
        entityId: entity.id,
        type: entity.type,
        ok: overallOk,
        laws: lawResults,
      });
    }

    return results;
  }
}
