// js/world.js

import { MessageBus } from "./message_bus.js";
import { loadCards } from "./card_loader.js";
import { LawEngine } from "./law_engine.js";
import { StateEngine } from "./state_engine.js";
import { Inspector } from "./inspector.js";

function discoverEntities() {
  const nodes = document.querySelectorAll(".world-object");
  const entities = [];

  nodes.forEach((el) => {
    const attrs = {};
    for (const a of el.attributes) {
      if (a.name.startsWith("data-")) {
        attrs[a.name] = a.value;
      }
    }

    entities.push({
      id: el.dataset.entityId,
      type: el.dataset.entityType,
      label: el.dataset.entityLabel || null,
      attributes: attrs,
    });
  });

  return entities;
}

async function main() {
  const bus = new MessageBus();
  const lawEngine = new LawEngine();
  const stateEngine = new StateEngine();

  const objectListEl = document.getElementById("object-list");
  const detailsEl = document.getElementById("object-details");
  const lawSummaryEl = document.getElementById("law-summary");
  const runLawChecksBtn = document.getElementById("run-law-checks");

  const inspector = new Inspector({
    objectListEl,
    detailsEl,
    lawSummaryEl,
    stateEngine,
  });

  const entities = discoverEntities();
  inspector.setEntities(entities);

  const cards = await loadCards();
  cards.forEach((c) => lawEngine.registerCard(c));

  runLawChecksBtn.addEventListener("click", () => {
    const results = lawEngine.validateEntities(entities);
    inspector.setValidationResults(results);
    stateEngine.applyValidationStates(results);
    updateLawStatusBadges(results);
  });

  bus.on("goto", ({ targetId }) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      stateEngine.markSelected(el.dataset.entityId, el.dataset.entityType);
    }
  });

  document
    .querySelectorAll('[data-message^="goto:"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const msg = anchor.dataset.message;
        const target = msg.split(":")[1];
        bus.emit("goto", { targetId: target.toLowerCase() });
      });
    });
}

function updateLawStatusBadges(results) {
  for (const r of results) {
    if (r.type !== "AppendixPage") continue;
    const badge = document.querySelector(
      `.law-status[data-law-status-for="${r.entityId}"]`
    );
    if (!badge) continue;
    badge.textContent = r.ok
      ? "LAW CHECK: OK – page satisfies minimal Appendix laws."
      : "LAW CHECK: FAIL – see inspector for details.";
  }
}

document.addEventListener("DOMContentLoaded", main);
