// cpp/laws.h
//
// Sketch of how structural laws for the MindsEye Object World
// could be expressed in C++ and compiled to WASM later.

#pragma once
#include <string>
#include <vector>
#include <unordered_map>

struct Entity {
    std::string id;
    std::string type;
    std::unordered_map<std::string, std::string> attributes;
};

struct LawResult {
    bool ok;
    std::string details;
    std::string lawId;
};

class Law {
public:
    std::string id;
    std::string appliesTo;
    std::string description;

    virtual ~Law() = default;
    virtual LawResult check(const Entity& e) const = 0;
};

class AppendixMinimalStructureLaw : public Law {
public:
    AppendixMinimalStructureLaw();
    LawResult check(const Entity& e) const override;
};

std::vector<LawResult> validateEntities(
    const std::vector<Entity>& entities,
    const std::vector<Law*>& laws
);
