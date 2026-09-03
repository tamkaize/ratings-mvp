"""Validate a token-risk rating JSON document against the canonical schema.

This validator adds reference-integrity and arithmetic checks that JSON Schema
cannot express. Run from the repository root:

    uv run python analysis/scripts/validate_token_rating.py <rating.json>
"""

from __future__ import annotations

import argparse
import json
import math
from datetime import date
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker


DEFAULT_SCHEMA = Path("references/schemas/token-risk-rating.schema.json")
TOLERANCE = 1e-9
SUPPORTED_SCORE_CALCULATORS = {
    ("sole_factor_identity.v1", "1.0.0"),
}
SCORE_CALCULATOR_TEST_VECTORS = {
    ("sole_factor_identity.v1", "1.0.0"): {
        "TV-RESERVE-0": 0.0,
        "TV-RESERVE-0.5": 0.5,
    }
}


class RatingValidationError(ValueError):
    """Raised when cross-reference or arithmetic validation fails."""


def close(left: float, right: float) -> bool:
    return math.isclose(left, right, rel_tol=0.0, abs_tol=TOLERANCE)


def require(condition: bool, message: str) -> None:
    if not condition:
        raise RatingValidationError(message)


def parse_iso_date(value: str | None, context: str) -> date:
    require(value is not None, f"{context} requires a non-null ISO date")
    try:
        return date.fromisoformat(value)
    except ValueError as exc:
        raise RatingValidationError(f"{context} is not a valid ISO date: {value!r}") from exc


def load_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def equal_value(left: Any, right: Any, tolerance: float | None) -> bool:
    if tolerance is not None and isinstance(left, (int, float)) and isinstance(right, (int, float)):
        return math.isclose(float(left), float(right), rel_tol=0.0, abs_tol=tolerance)
    return left == right


def resolve_json_pointer(document: Any, pointer: str) -> Any:
    require(pointer.startswith("/"), f"JSON Pointer must start with '/': {pointer!r}")
    current = document
    for raw_part in pointer[1:].split("/"):
        part = raw_part.replace("~1", "/").replace("~0", "~")
        if isinstance(current, list):
            require(part.isdigit(), f"Array pointer segment is not an index: {part!r}")
            index = int(part)
            require(index < len(current), f"Array pointer index {index} is out of range")
            current = current[index]
        elif isinstance(current, dict):
            require(part in current, f"JSON Pointer segment {part!r} does not exist")
            current = current[part]
        else:
            raise RatingValidationError(f"JSON Pointer traverses a scalar before segment {part!r}")
    return current


def collect_ids(document: dict[str, Any]) -> tuple[dict[str, str], dict[str, set[str]]]:
    fields = {
        "assumptions": "assumption_id",
        "sources": "source_id",
        "layers": "layer_id",
        "edges": "edge_id",
        "score_formation_specifications": "score_formation_specification_id",
        "factor_evaluations": "factor_evaluation_id",
        "component_evaluations": "component_evaluation_id",
        "risk_conditions": "risk_condition_id",
        "attachments": "attachment_id",
        "operators": "operator_id",
        "critical_path_records": "critical_path_record_id",
        "mitigation_effectiveness_records": "mitigation_effectiveness_record_id",
        "gaps": "gap_id",
        "reconciliation_records": "reconciliation_record_id",
        "limitation_records": "limitation_id",
        "conclusions": "conclusion_id",
        "approvals": "approval_id",
        "change_log": "change_id",
    }
    owners: dict[str, str] = {
        document["rating_series_id"]: "rating_series_id",
        document["rating_id"]: "rating_id",
    }
    require(document["rating_series_id"] != document["rating_id"], "rating_series_id and rating_id must differ")
    namespaces: dict[str, set[str]] = {}
    for collection, id_field in fields.items():
        ids: set[str] = set()
        for record in document[collection]:
            record_id = record[id_field]
            require(record_id not in owners, f"Duplicate global ID {record_id!r}: {owners.get(record_id)} and {collection}")
            owners[record_id] = collection
            ids.add(record_id)
        namespaces[collection] = ids
    audit = document["audit"]
    audit_namespaces: dict[str, set[str]] = {
        "audit_hypotheses": set(),
        "audit_test_cases": set(),
        "audit_assertions": set(),
        "audit_deviations": set(),
    }
    for hypothesis in audit["hypotheses"]:
        record_id = hypothesis["hypothesis_id"]
        require(record_id not in owners, f"Duplicate global ID {record_id!r}")
        owners[record_id] = "audit_hypotheses"
        audit_namespaces["audit_hypotheses"].add(record_id)
    for test_case in audit["test_cases"]:
        record_id = test_case["test_case_id"]
        require(record_id not in owners, f"Duplicate global ID {record_id!r}")
        owners[record_id] = "audit_test_cases"
        audit_namespaces["audit_test_cases"].add(record_id)
        for assertion in test_case["assertions"]:
            assertion_id = assertion["assertion_id"]
            require(assertion_id not in owners, f"Duplicate global ID {assertion_id!r}")
            owners[assertion_id] = "audit_assertions"
            audit_namespaces["audit_assertions"].add(assertion_id)
    for deviation in audit["deviations"]:
        record_id = deviation["deviation_id"]
        require(record_id not in owners, f"Duplicate global ID {record_id!r}")
        owners[record_id] = "audit_deviations"
        audit_namespaces["audit_deviations"].add(record_id)
    namespaces.update(audit_namespaces)
    return owners, namespaces


def validate_references(document: dict[str, Any], owners: dict[str, str], ns: dict[str, set[str]]) -> None:
    sources = ns["sources"]
    layers = ns["layers"]
    edges = ns["edges"]
    factors = ns["factor_evaluations"]
    components = ns["component_evaluations"]
    score_specs = ns["score_formation_specifications"]
    conditions = ns["risk_conditions"]
    operators = ns["operators"]
    critical_paths = ns["critical_path_records"]
    mitigations = ns["mitigation_effectiveness_records"]
    gaps = ns["gaps"]
    reconciliations = ns["reconciliation_records"]
    limitations = ns["limitation_records"]
    conclusions = ns["conclusions"]
    approvals = ns["approvals"]
    changes = ns["change_log"]
    audit_tests = ns["audit_test_cases"]
    audit_deviations = ns["audit_deviations"]

    def known(record_id: str | None, allowed: set[str], context: str) -> None:
        if record_id is not None:
            require(record_id in allowed, f"Unknown reference {record_id!r} in {context}")

    def all_known(record_ids: list[str], allowed: set[str], context: str) -> None:
        for record_id in record_ids:
            known(record_id, allowed, context)

    for layer in document["layers"]:
        known(layer["parent_layer_id"], layers, f"layer {layer['layer_id']} parent")
        all_known(layer["source_ids"], sources, f"layer {layer['layer_id']} sources")

    for edge in document["edges"]:
        known(edge["parent_layer_id"], layers, f"edge {edge['edge_id']} parent")
        known(edge["child_layer_id"], layers, f"edge {edge['edge_id']} child")
        require(edge["parent_layer_id"] != edge["child_layer_id"], f"Self-edge {edge['edge_id']}")
        all_known(edge["source_ids"], sources, f"edge {edge['edge_id']} sources")

    for specification in document["score_formation_specifications"]:
        known(specification["change_id"], changes, f"score specification {specification['score_formation_specification_id']} change")

    for factor in document["factor_evaluations"]:
        known(factor["layer_id"], layers, f"factor {factor['factor_evaluation_id']} layer")
        known(factor["component_evaluation_id"], components, f"factor {factor['factor_evaluation_id']} component")
        all_known(factor["source_ids"], sources, f"factor {factor['factor_evaluation_id']} sources")
        known(factor["risk_condition_id"], conditions, f"factor {factor['factor_evaluation_id']} Risk Condition")
        if factor["primary_carrier_id"] is not None:
            known(factor["primary_carrier_id"], set(owners), f"factor {factor['factor_evaluation_id']} carrier")

    for component in document["component_evaluations"]:
        known(component["layer_id"], layers, f"component {component['component_evaluation_id']} layer")
        known(component["score_formation_specification_id"], score_specs, f"component {component['component_evaluation_id']} score specification")
        all_known(component["factor_evaluation_ids"], factors, f"component {component['component_evaluation_id']} factors")
        if component["primary_carrier_id"] is not None:
            known(component["primary_carrier_id"], set(owners), f"component {component['component_evaluation_id']} carrier")

    for condition in document["risk_conditions"]:
        all_known(condition["source_ids"], sources, f"Risk Condition {condition['risk_condition_id']} sources")
        known(condition["primary_carrier_id"], set(owners), f"Risk Condition {condition['risk_condition_id']} carrier")
        all_known(condition["operator_ids"], operators, f"Risk Condition {condition['risk_condition_id']} operators")

    for attachment in document["attachments"]:
        known(attachment["risk_condition_id"], conditions, f"attachment {attachment['attachment_id']} Risk Condition")
        known(attachment["layer_id"], layers, f"attachment {attachment['attachment_id']} layer")
        known(attachment["edge_id"], edges, f"attachment {attachment['attachment_id']} edge")
        known(attachment["primary_carrier_id"], set(owners), f"attachment {attachment['attachment_id']} carrier")
        all_known(attachment["operator_ids"], operators, f"attachment {attachment['attachment_id']} operators")
        all_known(attachment["source_ids"], sources, f"attachment {attachment['attachment_id']} sources")

    for operator in document["operators"]:
        known(operator["target_id"], set(owners), f"operator {operator['operator_id']} target")
        all_known(operator["evidence_source_ids"], sources, f"operator {operator['operator_id']} sources")

    for step in document["propagation_steps"]:
        known(step["layer_id"], layers, f"propagation {step['layer_id']}")
        all_known(step["child_layer_ids"], layers, f"propagation {step['layer_id']} children")
        all_known(step["operator_ids"], operators, f"propagation {step['layer_id']} operators")
        all_known(step["binding_driver_ids"], set(owners), f"propagation {step['layer_id']} drivers")

    for record in document["critical_path_records"]:
        all_known(record["affected_ids"], set(owners), f"critical path {record['critical_path_record_id']} affected IDs")
        all_known(record["consequence_operator_ids"], operators, f"critical path {record['critical_path_record_id']} operators")
        all_known(record["evidence_source_ids"], sources, f"critical path {record['critical_path_record_id']} sources")

    for record in document["mitigation_effectiveness_records"]:
        known(record["risk_condition_id"], conditions, f"mitigation {record['mitigation_effectiveness_record_id']} Risk Condition")
        all_known(record["remaining_operator_ids"], operators, f"mitigation {record['mitigation_effectiveness_record_id']} operators")
        all_known(record["evidence_source_ids"], sources, f"mitigation {record['mitigation_effectiveness_record_id']} sources")

    for gap in document["gaps"]:
        all_known(gap["affected_ids"], set(owners), f"gap {gap['gap_id']} affected IDs")

    final = document["final_output"]
    known(final["top_layer_id"], layers, "final top layer")
    all_known(final["binding_driver_ids"], set(owners), "final binding drivers")
    all_known(final["gap_ids"], gaps, "final gaps")
    all_known(final["critical_path_record_ids"], critical_paths, "final critical paths")
    all_known(final["mitigation_effectiveness_record_ids"], mitigations, "final mitigations")
    known(final["reconciliation_record_id"], reconciliations, "final reconciliation")
    all_known(final["limitation_ids"], limitations, "final limitations")

    for record in document["reconciliation_records"]:
        for difference in record["differences"]:
            all_known(difference["evidence_source_ids"], sources, f"reconciliation {record['reconciliation_record_id']} sources")

    for record in document["limitation_records"]:
        all_known(record["affected_ids"], set(owners), f"limitation {record['limitation_id']} affected IDs")
        all_known(record["evidence_source_ids"], sources, f"limitation {record['limitation_id']} sources")

    non_conclusion_ids = set(owners) - conclusions
    for conclusion in document["conclusions"]:
        known(conclusion["subject_id"], non_conclusion_ids, f"conclusion {conclusion['conclusion_id']} subject")
        all_known(conclusion["basis_ids"], non_conclusion_ids, f"conclusion {conclusion['conclusion_id']} basis")
        all_known(conclusion["source_ids"], sources, f"conclusion {conclusion['conclusion_id']} sources")

    for change in document["change_log"]:
        all_known(change["affected_ids"], set(owners), f"change {change['change_id']} affected IDs")
        all_known(change["evidence_source_ids"], sources, f"change {change['change_id']} evidence sources")
        known(change["approval_id"], approvals, f"change {change['change_id']} approval")

    audit = document["audit"]
    deviation_by_id = {item["deviation_id"]: item for item in audit["deviations"]}
    for test_case in audit["test_cases"]:
        all_known(test_case["input_record_ids"], set(owners), f"audit test {test_case['test_case_id']} inputs")
        all_known(test_case["conclusion_ids"], conclusions, f"audit test {test_case['test_case_id']} conclusions")
        all_known(test_case["evidence_source_ids"], sources, f"audit test {test_case['test_case_id']} sources")
        all_known(test_case["deviation_ids"], audit_deviations, f"audit test {test_case['test_case_id']} deviations")
        for deviation_id in test_case["deviation_ids"]:
            require(deviation_by_id[deviation_id]["test_case_id"] == test_case["test_case_id"], f"Deviation {deviation_id} belongs to a different test")
        for assertion in test_case["assertions"]:
            all_known(assertion["evidence_source_ids"], sources, f"audit assertion {assertion['assertion_id']} sources")
    for deviation in audit["deviations"]:
        known(deviation["test_case_id"], audit_tests, f"audit deviation {deviation['deviation_id']} test")
        known(deviation["correction_change_id"], changes, f"audit deviation {deviation['deviation_id']} correction")
def validate_graph(document: dict[str, Any]) -> None:
    children: dict[str, list[str]] = {layer["layer_id"]: [] for layer in document["layers"]}
    for edge in document["edges"]:
        if edge["graph_role"] == "D":
            children[edge["parent_layer_id"]].append(edge["child_layer_id"])

    propagation_by_layer = {step["layer_id"]: step for step in document["propagation_steps"]}
    for layer_id, step in propagation_by_layer.items():
        declared_children = set(children[layer_id])
        propagated_children = set(step["child_layer_ids"])
        require(
            propagated_children == declared_children,
            f"Propagation children for {layer_id} do not equal declared [D] children",
        )

    visiting: set[str] = set()
    visited: set[str] = set()

    def visit(layer_id: str) -> None:
        require(layer_id not in visiting, f"Cycle detected through direct-scoring layer {layer_id}")
        if layer_id in visited:
            return
        visiting.add(layer_id)
        for child_id in children[layer_id]:
            visit(child_id)
        visiting.remove(layer_id)
        visited.add(layer_id)

    for layer_id in children:
        visit(layer_id)


def expected_grade(score: float) -> str:
    if score < 0.5:
        return "A"
    if score < 0.75:
        return "BBB"
    if score < 1.0:
        return "BB"
    if score < 1.5:
        return "B"
    if score < 2.0:
        return "CCC"
    if score < 2.5:
        return "CC"
    if score < 3.0:
        return "C"
    return "D"


GRADE_ORDER = ["A", "BBB", "BB", "B", "CCC", "CC", "C", "D"]


def expected_indicated_grade(document: dict[str, Any], layer_id: str, score: float) -> str:
    """Apply a binding layer-level rating ceiling to the numeric grade, if present."""
    grade = expected_grade(score)
    for operator in document["operators"]:
        if not operator["binding"] or operator["operator_type"] != "RATING_CEILING" or operator["target_id"] != layer_id:
            continue
        ceiling = operator["threshold_or_result"]
        require(ceiling in GRADE_ORDER, f"Rating ceiling {operator['operator_id']} has unsupported grade {ceiling!r}")
        grade = GRADE_ORDER[max(GRADE_ORDER.index(grade), GRADE_ORDER.index(ceiling))]
    return grade


def validate_arithmetic(document: dict[str, Any]) -> None:
    components_by_layer: dict[str, list[dict[str, Any]]] = {}
    component_by_id = {item["component_evaluation_id"]: item for item in document["component_evaluations"]}
    factor_by_id = {item["factor_evaluation_id"]: item for item in document["factor_evaluations"]}
    layer_status = {item["layer_id"]: item["assessment_status"] for item in document["layers"]}

    for component in document["component_evaluations"]:
        require(layer_status[component["layer_id"]] == "assessed", f"Unassessed layer {component['layer_id']} cannot have a component evaluation")
        components_by_layer.setdefault(component["layer_id"], []).append(component)
        score = component["score"]
        if score is not None:
            expected = component["route_weight"] * score
            require(close(component["diagnostic_contribution"], expected), f"Component {component['component_evaluation_id']} diagnostic contribution {component['diagnostic_contribution']} != route_weight * score {expected}")
        if component["attribution"] in {"CARRIED", "SHARED", "N/A"}:
            require(close(component["chargeable_contribution"], 0.0), f"Component {component['component_evaluation_id']} cannot charge when attribution is {component['attribution']}")
        for factor_id in component["factor_evaluation_ids"]:
            factor = factor_by_id[factor_id]
            require(factor["component_evaluation_id"] == component["component_evaluation_id"], f"Factor {factor_id} points to a different component")
            require(factor["layer_id"] == component["layer_id"], f"Factor {factor_id} points to a different layer")

    for factor in document["factor_evaluations"]:
        require(layer_status[factor["layer_id"]] == "assessed", f"Unassessed layer {factor['layer_id']} cannot have a factor evaluation")
        diagnostic = factor["diagnostic_contribution"]
        chargeable = factor["chargeable_contribution"]
        if factor["arithmetic_role"] == "directly_weighted":
            require(diagnostic is not None and chargeable is not None, f"Directly weighted factor {factor['factor_evaluation_id']} requires contribution values")
        else:
            require(diagnostic is None and chargeable is None, f"Non-weighted factor {factor['factor_evaluation_id']} must use null contribution values")
        if factor["attribution"] in {"CARRIED", "SHARED", "N/A"} and chargeable is not None:
            require(close(chargeable, 0.0), f"Factor {factor['factor_evaluation_id']} cannot charge when attribution is {factor['attribution']}")
        if diagnostic is not None and chargeable is not None:
            require(chargeable <= diagnostic + TOLERANCE, f"Factor {factor['factor_evaluation_id']} charge exceeds diagnostic contribution")

    steps = {step["layer_id"]: step for step in document["propagation_steps"]}
    require(len(steps) == len(document["propagation_steps"]), "Duplicate propagation layer")
    indicated_risks = {layer_id: step["indicated_risk"] for layer_id, step in steps.items()}

    for layer_id, step in steps.items():
        require(layer_status[layer_id] == "assessed", f"Unassessed layer {layer_id} cannot have a propagation step")
        require(all(child in indicated_risks for child in step["child_layer_ids"]), f"Layer {layer_id} references a child without an assessed propagation result")
        expected_inherited_risk = max((indicated_risks[child] for child in step["child_layer_ids"]), default=0.0)
        require(close(step["inherited_risk"], expected_inherited_risk), f"Layer {layer_id} inherited_risk {step['inherited_risk']} != maximum child IndicatedRisk {expected_inherited_risk}")
        expected_incremental_risk = sum(component["chargeable_contribution"] for component in components_by_layer.get(layer_id, []))
        require(close(step["incremental_risk"], expected_incremental_risk), f"Layer {layer_id} incremental_risk {step['incremental_risk']} != NEW component sum {expected_incremental_risk}")
        expected_pre_operator_risk = max(step["inherited_risk"] + step["incremental_risk"], 0.0)
        require(close(step["pre_operator_risk"], expected_pre_operator_risk), f"Layer {layer_id} pre_operator_risk {step['pre_operator_risk']} != {expected_pre_operator_risk}")
        require(step["indicated_risk"] + TOLERANCE >= step["pre_operator_risk"], f"Layer {layer_id} indicated_risk improves the economic result")
        if step["indicated_grade"] not in {"NO_RATE", "REJECT"}:
            grade = expected_indicated_grade(document, layer_id, step["indicated_risk"])
            require(step["indicated_grade"] == grade, f"Layer {layer_id} indicated grade {step['indicated_grade']} != expected {grade}")

    final = document["final_output"]
    top_step = steps.get(final["top_layer_id"])
    if top_step is None:
        require(layer_status[final["top_layer_id"]] == "unassessed_early_stop", "Final top layer lacks a propagation result without an early-stop status")
        require(final["no_rate"] or final["rejected"], "Early-stop output must conclude NO_RATE or REJECT")
        require(final["indicated_economic_score"] is None, "Early-stop output cannot publish a top-layer indicated score")
        require(final["indicated_grade"] is None, "Early-stop output cannot publish a top-layer indicated grade")
        require(final["indicated_confidence"] is None, "Early-stop output cannot publish top-layer indicated confidence")
        require(bool(steps), "Early-stop output must retain at least one assessed terminal-layer result")
        required_operator = "REJECT" if final["rejected"] else "NO_RATE"
        require(
            any(item["binding"] and item["operator_type"] == required_operator for item in document["operators"]),
            f"Early-stop output requires a binding {required_operator} operator",
        )
    else:
        require(close(final["indicated_economic_score"], top_step["indicated_risk"]), "Final indicated score does not match top layer")
        require(final["indicated_grade"] == top_step["indicated_grade"], "Final indicated grade does not match top layer")
        require(final["indicated_confidence"] == top_step["indicated_confidence"], "Final indicated confidence does not match top layer")
    if not final["no_rate"] and not final["rejected"]:
        require(final["approved_economic_score"] is not None, "Rated output requires an approved score")
        require(final["approved_grade"] == expected_grade(final["approved_economic_score"]), "Approved grade does not match approved score")
        require(final["approved_confidence"] is not None, "Rated output requires approved confidence")
    if final["no_rate"]:
        require(final["approved_grade"] == "NO_RATE", "no_rate=true requires approved grade NO_RATE")
        require(final["approved_economic_score"] is None, "no_rate=true requires approved score null")
        require(final["approved_confidence"] is None, "NO_RATE output cannot have approved numeric-result confidence")
    if final["rejected"]:
        require(final["approved_grade"] == "REJECT", "rejected=true requires approved grade REJECT")
        require(final["approved_economic_score"] is None, "REJECT output requires approved score null")
        require(final["approved_confidence"] is None, "REJECT output cannot have approved numeric-result confidence")


def validate_score_formation_specifications(document: dict[str, Any]) -> bool:
    """Validate approved specifications without introducing a generic formula interpreter."""
    specifications = {item["score_formation_specification_id"]: item for item in document["score_formation_specifications"]}
    factors = {item["factor_evaluation_id"]: item for item in document["factor_evaluations"]}
    components = document["component_evaluations"]
    rating_date = parse_iso_date(document["rated_object"]["review_date"], "rated_object.review_date")
    used_specifications = {item["score_formation_specification_id"] for item in components}

    for specification_id in used_specifications:
        specification = specifications[specification_id]
        if specification["status"] != "approved":
            continue

        calculator_id = specification.get("calculator_id")
        calculator_version = specification.get("calculator_version")
        test_vector_ids = specification.get("test_vector_ids")
        require(calculator_id is not None, f"Approved specification {specification_id} requires calculator_id")
        require(calculator_version is not None, f"Approved specification {specification_id} requires calculator_version")
        require(test_vector_ids, f"Approved specification {specification_id} requires test_vector_ids")
        require(
            (calculator_id, calculator_version) in SUPPORTED_SCORE_CALCULATORS,
            f"Approved specification {specification_id} has no registered calculator implementation",
        )
        registered_vectors = SCORE_CALCULATOR_TEST_VECTORS[(calculator_id, calculator_version)]
        require(
            set(test_vector_ids) <= set(registered_vectors),
            f"Approved specification {specification_id} references an unregistered boundary test vector",
        )

        effective_date = parse_iso_date(specification["effective_date"], f"Specification {specification_id}.effective_date")
        review_date = parse_iso_date(specification["review_date"], f"Specification {specification_id}.review_date")
        require(effective_date <= rating_date <= review_date, f"Specification {specification_id} is not effective for the rating review date")

        specification_factors = set(specification["factor_definition_ids"])
        for component in components:
            if component["score_formation_specification_id"] != specification_id:
                continue
            require(
                component["component_type"] in specification["component_types"],
                f"Component {component['component_evaluation_id']} is not covered by specification {specification_id}",
            )
            component_factors = [factors[item] for item in component["factor_evaluation_ids"]]
            require(component_factors, f"Component {component['component_evaluation_id']} has no factor inputs")
            require(
                {item["factor_definition_id"] for item in component_factors} <= specification_factors,
                f"Component {component['component_evaluation_id']} uses a factor outside specification {specification_id}",
            )

            if calculator_id == "sole_factor_identity.v1":
                require(len(component_factors) == 1, f"Calculator sole_factor_identity.v1 requires one factor for {component['component_evaluation_id']}")
                factor = component_factors[0]
                require(factor["applicability"] == "applicable", f"Calculator sole_factor_identity.v1 does not accept N/A factor {factor['factor_evaluation_id']}")
                require(factor["score"] is not None, f"Calculator sole_factor_identity.v1 requires a score for {factor['factor_evaluation_id']}")
                require(component["score"] in registered_vectors.values(), f"Component {component['component_evaluation_id']} falls outside the registered boundary test vectors")
                require(close(component["score"], factor["score"]), f"Component {component['component_evaluation_id']} is disconnected from factor {factor['factor_evaluation_id']}")

    return bool(used_specifications) and all(specifications[item]["status"] == "approved" for item in used_specifications)


def validate_hardening_controls(document: dict[str, Any]) -> None:
    final = document["final_output"]
    rated_object = document["rated_object"]
    specifications = {item["score_formation_specification_id"]: item for item in document["score_formation_specifications"]}
    operators = {item["operator_id"]: item for item in document["operators"]}
    conditions = {item["risk_condition_id"]: item for item in document["risk_conditions"]}
    reconciliations = {item["reconciliation_record_id"]: item for item in document["reconciliation_records"]}

    all_specs_approved = validate_score_formation_specifications(document)
    require(final["score_formation_gate_passed"] == all_specs_approved, "Score-formation gate does not match specification approval status")
    if not all_specs_approved:
        require(final["no_rate"] or final["rejected"], "Unapproved score formation requires approved result NO_RATE unless an evidenced early-stop REJECT already binds")

    for attachment in document["attachments"]:
        if attachment["attribution"] != "SHARED" or attachment["materiality"] == "Immaterial":
            continue
        condition = conditions[attachment["risk_condition_id"]]
        carrier = condition["primary_carrier_id"] or attachment["primary_carrier_id"]
        operator_ids = set(condition["operator_ids"]) | set(attachment["operator_ids"])
        effective_operators = [operators[item] for item in operator_ids if operators[item]["operator_type"] != "NONE"]
        require(carrier is not None or effective_operators, f"Material SHARED Risk Condition {condition['risk_condition_id']} has no carrier or effective operator")
        mode = condition["economic_effect_mode"]
        if mode == "carrier":
            require(carrier is not None, f"Risk Condition {condition['risk_condition_id']} carrier mode lacks carrier")
        elif mode == "operator":
            require(bool(effective_operators), f"Risk Condition {condition['risk_condition_id']} operator mode lacks effective operator")
        elif mode == "carrier_and_operator":
            require(carrier is not None and bool(effective_operators), f"Risk Condition {condition['risk_condition_id']} carrier-and-operator mode incomplete")
        elif mode == "immaterial_diagnostic":
            require(condition["materiality"] == "Immaterial", f"Material Risk Condition {condition['risk_condition_id']} cannot use immaterial diagnostic mode")

    for record in document["critical_path_records"]:
        if not record["max_child_conservative"]:
            require(record["consequence_operator_ids"] or final["watchlist"] or final["no_rate"], f"Critical path {record['critical_path_record_id']} lacks conservative consequence")

    for record in document["mitigation_effectiveness_records"]:
        if record["relief_granted"]:
            require(record["status"] == "approved", f"Mitigation {record['mitigation_effectiveness_record_id']} grants relief without approval")
            require(record["evidence_state"] == "complete", f"Mitigation {record['mitigation_effectiveness_record_id']} grants relief without complete evidence")

    reconciliation = reconciliations[final["reconciliation_record_id"]]
    if final["indicated_economic_score"] is None:
        require(reconciliation["indicated_score"] is None, "Early-stop reconciliation must omit the indicated score")
    else:
        require(close(reconciliation["indicated_score"], final["indicated_economic_score"]), "Reconciliation indicated score differs from final output")
    require(reconciliation["indicated_grade"] == final["indicated_grade"], "Reconciliation indicated grade differs from final output")
    require(reconciliation["indicated_confidence"] == final["indicated_confidence"], "Reconciliation indicated confidence differs from final output")
    require(reconciliation["approved_score"] == final["approved_economic_score"], "Reconciliation approved score differs from final output")
    require(reconciliation["approved_grade"] == final["approved_grade"], "Reconciliation approved grade differs from final output")
    require(reconciliation["approved_confidence"] == final["approved_confidence"], "Reconciliation approved confidence differs from final output")
    if reconciliation["indicated_grade"] != reconciliation["approved_grade"] or reconciliation["indicated_score"] != reconciliation["approved_score"]:
        require(bool(reconciliation["differences"]), "Indicated-to-approved difference lacks typed reconciliation")

    require(final["token_family_lane"] == rated_object["token_family_lane"], "Final token-family lane differs from rated object")
    require(final["primary_loss_object"] == rated_object["primary_loss_object"], "Final primary loss object differs from rated object")
    require(final["secondary_loss_objects"] == rated_object["secondary_loss_objects"], "Final secondary loss objects differ from rated object")
    require(bool(final["limitation_ids"]), "Final output requires at least one rating-specific limitation")


def validate_conclusion_coverage(document: dict[str, Any]) -> None:
    """Require one atomic reasoning record for every rating-relevant conclusion."""
    expected_pairs: set[tuple[str, str]] = set()
    collection_types = {
        "factor_evaluations": ("factor", "factor_evaluation_id"),
        "component_evaluations": ("component", "component_evaluation_id"),
        "risk_conditions": ("risk_condition", "risk_condition_id"),
        "attachments": ("attachment", "attachment_id"),
        "operators": ("operator", "operator_id"),
        "critical_path_records": ("critical_path", "critical_path_record_id"),
        "mitigation_effectiveness_records": ("mitigation", "mitigation_effectiveness_record_id"),
        "gaps": ("gap", "gap_id"),
        "reconciliation_records": ("reconciliation", "reconciliation_record_id"),
        "limitation_records": ("limitation", "limitation_id"),
    }
    for collection, (conclusion_type, id_field) in collection_types.items():
        expected_pairs.update((conclusion_type, item[id_field]) for item in document[collection])
    expected_pairs.update(("propagation", item["layer_id"]) for item in document["propagation_steps"])
    expected_pairs.add(("final", document["rating_id"]))

    actual_pairs = [(item["conclusion_type"], item["subject_id"]) for item in document["conclusions"]]
    require(len(actual_pairs) == len(set(actual_pairs)), "Duplicate conclusion type/subject pair")
    missing = expected_pairs - set(actual_pairs)
    extra = set(actual_pairs) - expected_pairs
    require(not missing, f"Missing atomic conclusion records: {sorted(missing)}")
    require(not extra, f"Unexpected atomic conclusion records: {sorted(extra)}")
    for conclusion in document["conclusions"]:
        require(bool(conclusion["basis_ids"]), f"Conclusion {conclusion['conclusion_id']} has no recorded basis IDs")


def derive_audit_test_status(test_case: dict[str, Any]) -> str:
    if not test_case["applicable"]:
        return "not_applicable"
    statuses = {assertion["status"] for assertion in test_case["assertions"]}
    if "fail" in statuses:
        return "fail"
    if "blocked" in statuses:
        return "blocked"
    if "not_run" in statuses:
        return "not_run"
    require(statuses == {"pass"}, f"Applicable audit test {test_case['test_case_id']} has unsupported assertion statuses {sorted(statuses)}")
    return "pass"


def validate_acceptance_test_semantics(document: dict[str, Any], acceptance_test_id: str) -> None:
    """Run bounded semantic checks for acceptance tests marked pass.

    These checks intentionally reuse the canonical record rather than adding a
    second audit object or a general-purpose rule interpreter.
    """
    rated = document["rated_object"]
    layers = document["layers"]
    factors = document["factor_evaluations"]
    components = document["component_evaluations"]
    final = document["final_output"]
    allowed_materiality = {"Required", "Dominant", "Modifier", "Immaterial"}
    allowed_attribution = {"NEW", "CARRIED", "SHARED", "N/A"}
    allowed_operators = {"RATING_CEILING", "CONFIDENCE_CEILING", "WATCHLIST", "NO_RATE", "REJECT", "RISK_SCORE_FLOOR"}

    if acceptance_test_id == "EXACT_OBJECT":
        for field in ("name", "chain", "contract_or_market", "rated_route", "review_date"):
            require(bool(rated.get(field)), f"Exact object test requires rated_object.{field}")
    elif acceptance_test_id == "RECURSIVE_LAYER":
        component_layers = {item["layer_id"] for item in components}
        for layer in layers:
            if layer["assessment_status"] == "assessed":
                require(layer["layer_id"] in component_layers, f"Assessed layer {layer['layer_id']} lacks component scoring")
                require(all(layer.get(field) for field in ("instrument_route", "venue_route", "evidence_outcome", "source_ids")), f"Layer {layer['layer_id']} lacks route/evidence detail")
    elif acceptance_test_id == "RECURSIVE_LAYER_MAP":
        require(all(edge["graph_role"] in {"D", "I", "S", "R"} for edge in document["edges"]), "Recursive Layer Map contains an unsupported graph role")
    elif acceptance_test_id == "LAYER_SPECIFIC_VENUE":
        for layer in layers:
            require(bool(layer.get("venue_route")), f"Layer {layer['layer_id']} lacks a venue route")
        require(any(item["component_type"] == "Venue / Infrastructure" for item in components), "No venue/infrastructure component is scored")
    elif acceptance_test_id == "CONTROL_VIEW_LAYOUT":
        for collection in ("risk_conditions", "attachments", "operators", "propagation_steps", "change_log", "audit"):
            require(collection in document, f"Control-view collection {collection} is missing")
    elif acceptance_test_id == "SCORECARD_RATIONALE":
        require(all(item["source_ids"] and item["rationale"] for item in factors), "Factor scorecard rationale is incomplete")
        require(all(item["rationale"] for item in components), "Component rationale is incomplete")
        require(all(item["basis_ids"] and item["decision_rule"] for item in document["conclusions"]), "Atomic conclusion rationale is incomplete")
    elif acceptance_test_id == "ATTRIBUTION_COMPLETENESS":
        for item in [*factors, *components]:
            require(item["attribution"] in allowed_attribution, f"Unsupported attribution on {item.get('factor_evaluation_id', item.get('component_evaluation_id'))}")
            if item["attribution"] in {"CARRIED", "SHARED"}:
                require(item.get("primary_carrier_id") or item.get("risk_condition_id"), "Carried/shared item lacks a carrier or Risk Condition")
    elif acceptance_test_id == "NO_RENORMALIZATION":
        by_layer: dict[str, float] = {}
        for component in components:
            by_layer[component["layer_id"]] = by_layer.get(component["layer_id"], 0.0) + component["route_weight"]
            if component["attribution"] in {"CARRIED", "SHARED"}:
                require(close(component["chargeable_contribution"], 0.0), f"Carried/shared component {component['component_evaluation_id']} was charged")
        require(all(close(weight, 1.0) for weight in by_layer.values()), "Component route weights were renormalized or do not sum to one")
    elif acceptance_test_id == "LOSS_DOMINANCE":
        for item in factors:
            if item["materiality"] in {"Required", "Dominant"}:
                require(item["failure_condition"] and item["rationale"], f"Loss-dominance rationale is incomplete for {item['factor_evaluation_id']}")
    elif acceptance_test_id == "NON_ADDITIVE_EVIDENCE":
        require(all(item["score"] is None or 0.0 <= item["score"] <= 1.0 for item in factors), "Factor score outside the bounded economic scale")
        require(all(item["operator_type"] in allowed_operators for item in document["operators"]), "Evidence/operator vocabulary contains an unsupported economic effect")
    elif acceptance_test_id == "EVIDENCE_OPERATOR":
        require(all(layer["evidence_outcome"] in {"High", "Medium", "Low"} for layer in layers), "Layer evidence outcome is not separated from confidence")
        require(final["indicated_confidence"] in {"High", "Medium", "Low"}, "Indicated confidence is not typed")
    elif acceptance_test_id == "DETERMINISTIC_SCORING":
        require(validate_score_formation_specifications(document), "Deterministic scoring is not executable for every used specification")
    elif acceptance_test_id == "SCORE_FORMATION_GATE":
        if final["approved_economic_score"] is not None:
            require(validate_score_formation_specifications(document), "Approved numeric output lacks an executable score-formation specification")
        else:
            require(final["no_rate"] or final["rejected"], "Unapproved score formation must block approved numeric output")
    elif acceptance_test_id == "SHARED_RISK_EFFECTIVENESS":
        conditions = {item["risk_condition_id"]: item for item in document["risk_conditions"]}
        operators = {item["operator_id"]: item for item in document["operators"]}
        for attachment in document["attachments"]:
            if attachment["attribution"] != "SHARED" or attachment["materiality"] == "Immaterial":
                continue
            condition = conditions[attachment["risk_condition_id"]]
            carrier = condition["primary_carrier_id"] or attachment["primary_carrier_id"]
            effective_operator = any(operators[item]["operator_type"] != "NONE" for item in set(condition["operator_ids"]) | set(attachment["operator_ids"]))
            require(carrier or effective_operator, f"Shared Risk Condition {condition['risk_condition_id']} lacks economic effect")
    elif acceptance_test_id == "MITIGATION_RELIEF":
        for record in document["mitigation_effectiveness_records"]:
            if record["relief_granted"]:
                require(record["status"] == "approved" and record["evidence_state"] == "complete", f"Mitigation relief is unsupported for {record['mitigation_effectiveness_record_id']}")
    elif acceptance_test_id == "FAMILY_LOSS_OBJECT":
        require(final["token_family_lane"] == rated["token_family_lane"], "Token-family lane changed at final output")
        require(final["primary_loss_object"] == rated["primary_loss_object"], "Primary loss object changed at final output")
        require(final["secondary_loss_objects"] == rated["secondary_loss_objects"], "Secondary loss objects changed at final output")
    elif acceptance_test_id == "MATERIALITY_CLASSIFICATION":
        require(all(item["materiality"] in allowed_materiality for item in factors), "Factor materiality contains an unsupported class")
        require(all(item["materiality"] in allowed_materiality for item in document["risk_conditions"]), "Risk Condition materiality contains an unsupported class")
    elif acceptance_test_id == "NO_RATE_REJECT":
        if final["no_rate"]:
            require(final["approved_grade"] == "NO_RATE" and final["approved_economic_score"] is None, "NO_RATE output is not null-approved")
        if final["rejected"]:
            require(final["approved_grade"] == "REJECT" and final["approved_economic_score"] is None, "REJECT output is not null-approved")
    elif acceptance_test_id == "SCORED_PILOT":
        require(document["status"] in {"no_rate", "watchlist", "approved"}, "Pilot record has no controlled rating disposition")
        require(document["sources"] and document["layers"] and document["audit"]["test_cases"], "Pilot record is incomplete")
    elif acceptance_test_id == "NA_GUARDRAIL":
        for item in factors:
            if item["applicability"] == "N/A":
                require(item["rationale"], f"N/A factor {item['factor_evaluation_id']} lacks a rationale")
    elif acceptance_test_id == "DERIVATIVE_BRANCH":
        require("derivative" in rated["economic_form"].lower() or "derivative" in rated["token_family_lane"].lower(), "Derivative branch is not identified")
        require(any("liquid" in layer["function"].lower() or "debt" in layer["function"].lower() for layer in layers), "Derivative branch lacks liquidation/debt treatment")
    elif acceptance_test_id == "NO_CLAIM_ASSET":
        require("claim" not in rated["economic_form"].lower(), "No-claim asset test is not applicable to a claim-bearing object")
    elif acceptance_test_id == "OUTPUT_VISIBILITY":
        for field in ("indicated_economic_score", "indicated_grade", "indicated_confidence", "approved_grade", "gap_ids", "binding_driver_ids", "limitation_ids"):
            require(field in final, f"Final output omits {field}")
    elif acceptance_test_id == "PORTFOLIO_OVERLAY_SEPARATION":
        require("portfolio" in " ".join(rated["scope_exclusions"]).lower() or "portfolio" in " ".join(final["shared_factor_tags"]).lower(), "Portfolio overlay boundary is not stated")
    elif acceptance_test_id == "ATOMIC_SCHEMA":
        require(document["schema_version"] == "2.0.2-alpha", "Pilot does not use the current canonical schema")
        require(all(item["conclusion_id"] for item in document["conclusions"]), "Atomic conclusions are incomplete")
    elif acceptance_test_id == "COMPLEX_TRIGGER":
        require(document["critical_path_records"], "Complex trigger lacks a Critical Path Record")


def audit_coverage_metrics(document: dict[str, Any], schema: dict[str, Any]) -> dict[str, float | int]:
    declared = set(schema["$defs"]["acceptance_test_id"]["enum"])
    represented = {item["acceptance_test_id"] for item in document["audit"]["test_cases"]}
    applicable_or_na = {
        item["acceptance_test_id"]
        for item in document["audit"]["test_cases"]
        if item["applicable"] or item["status"] == "not_applicable"
    }
    return {
        "declared_acceptance_tests": len(declared),
        "represented_acceptance_tests": len(represented),
        "acceptance_test_coverage": len(applicable_or_na & declared) / len(declared),
    }


def validate_audit(document: dict[str, Any], ns: dict[str, set[str]], schema: dict[str, Any]) -> None:
    audit = document["audit"]
    source_ids = ns["sources"]
    conclusion_ids = ns["conclusions"]
    deviation_ids = ns["audit_deviations"]

    supported_assertions = {"JSON_POINTER_EQUALS", "JSON_POINTER_EXISTS"}
    for test_case in audit["test_cases"]:
        for assertion in test_case["assertions"]:
            if assertion["assertion_type"] == "JSON_POINTER_EQUALS":
                require(assertion["target_pointer"] is not None, f"Assertion {assertion['assertion_id']} requires target_pointer")
                try:
                    actual = resolve_json_pointer(document, assertion["target_pointer"])
                except RatingValidationError:
                    actual = None
                    pointer_found = False
                else:
                    pointer_found = True
                tolerance = assertion["numeric_tolerance"]
                require(equal_value(assertion["observed_value"], actual, tolerance), f"Assertion {assertion['assertion_id']} observed_value differs from the rating record")
                expected_status = "pass" if pointer_found and equal_value(actual, assertion["expected_value"], tolerance) else "fail"
                require(assertion["status"] == expected_status, f"Assertion {assertion['assertion_id']} status {assertion['status']} != derived {expected_status}")
            elif assertion["assertion_type"] == "JSON_POINTER_EXISTS":
                require(assertion["target_pointer"] is not None, f"Assertion {assertion['assertion_id']} requires target_pointer")
                try:
                    resolve_json_pointer(document, assertion["target_pointer"])
                except RatingValidationError:
                    exists = False
                else:
                    exists = True
                require(assertion["observed_value"] == exists, f"Assertion {assertion['assertion_id']} observed existence differs from the rating record")
                expected_status = "pass" if exists == assertion["expected_value"] else "fail"
                require(assertion["status"] == expected_status, f"Assertion {assertion['assertion_id']} status {assertion['status']} != derived {expected_status}")
            elif assertion["assertion_type"] not in supported_assertions:
                require(
                    assertion["status"] in {"blocked", "not_run"},
                    f"Unsupported assertion type {assertion['assertion_type']} cannot pass without an execution path",
                )
            for source_id in assertion["evidence_source_ids"]:
                require(source_id in source_ids, f"Assertion {assertion['assertion_id']} references unknown source {source_id!r}")
        derived = derive_audit_test_status(test_case)
        require(test_case["status"] == derived, f"Audit test {test_case['test_case_id']} status {test_case['status']} != derived {derived}")
        if derived == "pass":
            validate_acceptance_test_semantics(document, test_case["acceptance_test_id"])

    coverage = audit["conclusion_coverage"]
    required_conclusions = set(coverage["required_conclusion_ids"])
    tested_conclusions = set(coverage["tested_conclusion_ids"])
    uncovered_conclusions = set(coverage["uncovered_conclusion_ids"])
    test_case_conclusions = {item for test_case in audit["test_cases"] for item in test_case["conclusion_ids"]}
    require(required_conclusions == conclusion_ids, "Audit required_conclusion_ids do not equal the complete conclusion set")
    require(tested_conclusions == test_case_conclusions, "Audit tested_conclusion_ids do not equal the test-case conclusion union")
    require(uncovered_conclusions == required_conclusions - tested_conclusions, "Audit uncovered_conclusion_ids do not match required minus tested")
    expected_coverage = len(tested_conclusions & required_conclusions) / len(required_conclusions)
    require(close(coverage["coverage_rate"], expected_coverage), "Audit conclusion coverage_rate is incorrect")
    require(not uncovered_conclusions and close(expected_coverage, 1.0), "Audit must test every atomic rating conclusion")

    declared_acceptance_tests = set(schema["$defs"]["acceptance_test_id"]["enum"])
    represented_acceptance_tests = {item["acceptance_test_id"] for item in audit["test_cases"]}
    require(len(represented_acceptance_tests) == len(audit["test_cases"]), "Audit contains duplicate acceptance-test IDs")
    if audit["status"] == "accepted":
        require(represented_acceptance_tests == declared_acceptance_tests, "Accepted audit must account for every declared acceptance test")

    statuses = [item["status"] for item in audit["test_cases"]]
    summary = audit["acceptance_summary"]
    expected_counts = {
        "total": len(statuses),
        "passed": statuses.count("pass"),
        "failed": statuses.count("fail"),
        "blocked": statuses.count("blocked"),
        "not_run": statuses.count("not_run"),
        "not_applicable": statuses.count("not_applicable"),
    }
    for field, expected in expected_counts.items():
        require(summary[field] == expected, f"Acceptance summary {field} {summary[field]} != {expected}")
    missing_acceptance_tests = declared_acceptance_tests - represented_acceptance_tests
    if summary["failed"]:
        overall_status = "fail"
    elif summary["blocked"]:
        overall_status = "blocked"
    elif summary["not_run"] or missing_acceptance_tests:
        overall_status = "incomplete"
    else:
        overall_status = "pass"
    require(summary["overall_status"] == overall_status, f"Acceptance overall_status {summary['overall_status']} != {overall_status}")
    if audit["status"] == "accepted":
        require(overall_status == "pass", "Accepted audit must pass every applicable completed test")
        require(summary["rating_decision"] == "accept", "Accepted audit requires rating_decision=accept")
    if document["status"] == "approved" and document["final_output"]["approved_economic_score"] is not None:
        require(audit["status"] == "accepted", "Approved numeric output requires an accepted embedded audit")

    if document["rating_version"] == 1:
        require(document["supersedes_rating_id"] is None, "Rating version 1 cannot supersede a prior rating")
    else:
        require(document["supersedes_rating_id"] is not None, "Rating version greater than 1 requires supersedes_rating_id")
        require(document["supersedes_rating_id"] != document["rating_id"], "A rating cannot supersede itself")
        require(bool(document["change_log"]), "Revised rating version requires a non-empty change_log")
    require(document["created_at"] <= document["updated_at"], "created_at must not be after updated_at")
    require(document["frozen_at"] <= document["updated_at"], "frozen_at must not be after updated_at")


def validate_document(document: dict[str, Any], schema: dict[str, Any]) -> None:
    errors = sorted(
        Draft202012Validator(schema, format_checker=FormatChecker()).iter_errors(document),
        key=lambda error: list(error.absolute_path),
    )
    if errors:
        rendered = "\n".join(f"- {'/'.join(map(str, error.absolute_path)) or '<root>'}: {error.message}" for error in errors)
        raise RatingValidationError(f"JSON Schema validation failed:\n{rendered}")

    owners, namespaces = collect_ids(document)
    validate_references(document, owners, namespaces)
    validate_graph(document)
    validate_arithmetic(document)
    validate_hardening_controls(document)
    validate_conclusion_coverage(document)
    validate_audit(document, namespaces, schema)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("rating", type=Path, help="Rating JSON document")
    parser.add_argument("--schema", type=Path, default=DEFAULT_SCHEMA, help="JSON Schema path")
    args = parser.parse_args()

    document = load_json(args.rating)
    schema = load_json(args.schema)
    validate_document(document, schema)
    metrics = audit_coverage_metrics(document, schema)
    print(
        f"PASS: {args.rating} | acceptance tests {metrics['represented_acceptance_tests']}/{metrics['declared_acceptance_tests']} "
        f"({metrics['acceptance_test_coverage']:.1%})"
    )


if __name__ == "__main__":
    main()
