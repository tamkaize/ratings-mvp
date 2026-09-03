"""Focused negative controls for the V0.3 alpha control-hardening patch."""

from __future__ import annotations

import unittest
from pathlib import Path

from analysis.scripts.validate_token_rating import RatingValidationError, load_json, validate_document


ROOT = Path(__file__).resolve().parents[2]
SCHEMA = load_json(ROOT / "references/schemas/token-risk-rating.schema.json")
PT = ROOT / "outputs/token-risk-rating/pt-susdai-15oct2026-rating.json"
ONYC = ROOT / "outputs/token-risk-rating/onyc-kamino-multiply-route-pattern-rating.json"
CONFORMANCE = ROOT / "outputs/token-risk-rating/schema-conformance-example.json"


def expect_rejection(test_case: unittest.TestCase, document: dict) -> None:
    with test_case.assertRaises(RatingValidationError):
        validate_document(document, SCHEMA)


class V03HardeningTests(unittest.TestCase):
    def test_current_records_remain_valid(self) -> None:
        for path in (PT, ONYC, CONFORMANCE):
            validate_document(load_json(path), SCHEMA)

    def test_factor_change_without_component_recalculation_is_rejected(self) -> None:
        document = load_json(CONFORMANCE)
        document["factor_evaluations"][0]["score"] = 0.5
        expect_rejection(self, document)

    def test_graph_role_change_without_propagation_change_is_rejected(self) -> None:
        document = load_json(PT)
        direct_edge = next(edge for edge in document["edges"] if edge["graph_role"] == "D")
        direct_edge["graph_role"] = "I"
        expect_rejection(self, document)

    def test_unsupported_assertion_cannot_be_marked_pass(self) -> None:
        document = load_json(CONFORMANCE)
        assertion = next(
            assertion
            for test_case in document["audit"]["test_cases"]
            for assertion in test_case["assertions"]
            if assertion["assertion_type"] == "JSON_POINTER_EQUALS"
        )
        assertion["assertion_type"] = "MANUAL_REVIEW"
        assertion["status"] = "pass"
        expect_rejection(self, document)

    def test_approved_specification_requires_effective_date(self) -> None:
        document = load_json(CONFORMANCE)
        document["score_formation_specifications"][0]["effective_date"] = None
        expect_rejection(self, document)

    def test_accepted_audit_must_account_for_all_declared_tests(self) -> None:
        document = load_json(CONFORMANCE)
        document["audit"]["status"] = "accepted"
        document["audit"]["acceptance_summary"].update(
            {"blocked": 0, "passed": 4, "overall_status": "pass", "rating_decision": "accept"}
        )
        expect_rejection(self, document)

    def test_approved_numeric_output_requires_accepted_audit(self) -> None:
        document = load_json(CONFORMANCE)
        document["status"] = "approved"
        expect_rejection(self, document)


if __name__ == "__main__":
    unittest.main()
