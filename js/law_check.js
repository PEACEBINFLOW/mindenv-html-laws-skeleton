// js/law_check.js
// Lightweight runtime echo of the structural laws defined in cpp/laws.h.

function collectAppendixSections(root) {
  return Array.from(
    root.querySelectorAll('[data-law-entity="AppendixSection"]')
  ).map(node => {
    return {
      node,
      id: node.getAttribute("data-law-id") || "",
      parent: node.getAttribute("data-law-parent") || "",
      order: node.getAttribute("data-law-order") || ""
    };
  });
}

function validateAppendixPage(body) {
  const errors = [];

  const entity = body.getAttribute("data-law-entity");
  const id = body.getAttribute("data-law-id") || "";

  if (!entity) {
    errors.push("Body is missing data-law-entity.");
  } else if (
    entity !== "AppendixPage" &&
    entity !== "AppendixRoot" &&
    entity !== "WorldRoot"
  ) {
    errors.push(`Body has unexpected data-law-entity="${entity}".`);
  }

  if (!id) {
    errors.push("Body is missing data-law-id.");
  }

  const sections = collectAppendixSections(document);
  sections.forEach(section => {
    if (!section.id) {
      errors.push("AppendixSection is missing data-law-id.");
    }
    if (!section.parent) {
      errors.push(`AppendixSection "${section.id}" is missing data-law-parent.`);
    } else if (section.parent !== id && entity !== "WorldRoot") {
      errors.push(
        `AppendixSection "${section.id}" has parent "${section.parent}" which does not match page id "${id}".`
      );
    }
    if (!section.order || isNaN(Number(section.order))) {
      errors.push(
        `AppendixSection "${section.id}" has invalid or missing data-law-order.`
      );
    }

    const title = section.node.querySelector('[data-law-role="title"]');
    const bodyNode = section.node.querySelector('[data-law-role="body"]');

    if (!title) {
      errors.push(
        `AppendixSection "${section.id}" is missing an element with data-law-role="title".`
      );
    }
    if (!bodyNode) {
      errors.push(
        `AppendixSection "${section.id}" is missing an element with data-law-role="body".`
      );
    }
  });

  return { pageId: id, entity, errors };
}

// Expose a small API for env.js
window.MindEnvLawCheck = {
  validateCurrentPage() {
    const body = document.body;
    return validateAppendixPage(body);
  }
};
