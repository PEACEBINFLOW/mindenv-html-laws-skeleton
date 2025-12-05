// cpp/laws.h
// C++-style structural laws for the MindEnv skeleton.
// These definitions are mirrored into HTML attributes and JS checks.

#pragma once
#include <string>
#include <vector>

namespace mindenv {

struct AppendixSection {
    // Unique identifier for this section (maps to data-law-id).
    std::string id;

    // Parent page or appendix root (maps to data-law-parent).
    std::string parent_id;

    // Order of appearance within the parent (maps to data-law-order).
    int order;

    // Title and body roles are required DOM roles:
    // <h3 data-law-role="title">...</h3>
    // <p  data-law-role="body">...</p>
    std::string title;
    std::string body;
};

struct AppendixPage {
    std::string id;         // maps to body[data-law-id]
    std::string entity;     // should be "AppendixPage"
    std::vector<AppendixSection> sections;
};

// Minimal "law" expectations for validation:
//
// 1. Every AppendixPage <body> must have:
//      data-law-entity="AppendixPage" | "AppendixRoot" | "WorldRoot"
//      data-law-id="<non-empty>"
//
// 2. Every AppendixSection block must have:
//      data-law-entity="AppendixSection"
//      data-law-id="<non-empty>"
//      data-law-parent="<id of AppendixPage or AppendixRoot>"
//      data-law-order="<integer>"
//
// 3. Each AppendixSection must contain:
//      one element with data-law-role="title"
//      one element with data-law-role="body"
//
// The JS law checker is a thin runtime echo of these constraints.

} // namespace mindenv
