// js/env.js
// Bootstraps the environment and runs the law checker on load.

document.addEventListener("DOMContentLoaded", () => {
  if (!window.MindEnvLawCheck) {
    console.warn("MindEnvLawCheck not available.");
    return;
  }

  const result = window.MindEnvLawCheck.validateCurrentPage();
  const targetId = `law-status-${result.pageId || "root"}`;
  const statusNode = document.getElementById(targetId);

  if (!statusNode) {
    console.warn("No law status node found for id:", targetId);
    console.log("Law check result:", result);
    return;
  }

  if (result.errors.length === 0) {
    statusNode.classList.add("law-ok");
    statusNode.textContent = "LAW CHECK: OK – page satisfies minimal Appendix laws.";
  } else {
    statusNode.classList.add("law-error");
    statusNode.innerHTML =
      "LAW CHECK: FAILED – see issues below.<ul>" +
      result.errors.map(e => `<li>${e}</li>`).join("") +
      "</ul>";
  }

  console.log("Law check result:", result);
});
