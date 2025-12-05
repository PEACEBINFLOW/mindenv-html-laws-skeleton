// cpp/laws.cpp

#include "laws.h"

AppendixMinimalStructureLaw::AppendixMinimalStructureLaw() {
    id = "appendix_minimal_structure_cpp";
    appliesTo = "AppendixSection";
    description = "C++ law enforcing minimal structural requirements for AppendixSection.";
}

LawResult AppendixMinimalStructureLaw::check(const Entity& e) const {
    static const char* required[] = {
        "data-entity-id",
        "data-entity-type",
        "data-parent-id",
        "data-order",
        "data-title-role",
        "data-body-role"
    };

    std::vector<std::string> missing;
    for (const auto& key : required) {
        if (e.attributes.find(key) == e.attributes.end()) {
            missing.push_back(key);
        }
    }

    if (missing.empty()) {
        return { true, "All required attributes present.", id };
    } else {
        std::string msg = "Missing attributes: ";
        for (size_t i = 0; i < missing.size(); ++i) {
            msg += missing[i];
            if (i + 1 < missing.size()) msg += ", ";
        }
        return { false, msg, id };
    }
}

std::vector<LawResult> validateEntities(
    const std::vector<Entity>& entities,
    const std::vector<Law*>& laws
) {
    std::vector<LawResult> out;

    for (const auto& e : entities) {
        for (const auto* law : laws) {
            if (law->appliesTo == e.type) {
                out.push_back(law->check(e));
            }
        }
    }

    return out;
}
