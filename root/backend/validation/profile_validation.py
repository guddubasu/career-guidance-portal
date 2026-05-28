import numpy as np

def validate_profile(sample_input):

    values = np.array(
        list(sample_input.values())
    )

    avg_score = np.mean(values)

    std_dev = np.std(values)

    issues = []

    # =====================================================
    # ALL HIGH
    # =====================================================

    if avg_score > 0.90:

        issues.append(
            "All responses are extremely high."
        )

    # =====================================================
    # ALL LOW
    # =====================================================

    if avg_score < 0.10:

        issues.append(
            "All responses are extremely low."
        )

    # =====================================================
    # SAME VALUES
    # =====================================================

    unique_values = len(set(values))

    if unique_values == 1:

        issues.append(
            "All answers are exactly the same."
        )

    # =====================================================
    # LOW VARIATION
    # =====================================================

    if std_dev < 0.08:

        issues.append(
            "Responses are too similar."
        )

    # =====================================================
    # EXTREME VALUES
    # =====================================================

    extreme_count = np.sum(
        (values >= 0.95) |
        (values <= 0.05)
    )

    if extreme_count >= 10:

        issues.append(
            "Too many extreme values detected."
        )

    # =====================================================
    # CONTRADICTIONS
    # =====================================================

    if (
        sample_input["technology_interest"] > 0.8 and
        sample_input["logical_reasoning"] < 0.3
    ):

        issues.append(
            "Technology interest is high but logical reasoning is low."
        )

    if (
        sample_input["arts_creativity"] > 0.8 and
        sample_input["creativity"] < 0.3
    ):

        issues.append(
            "Arts interest is high but creativity is low."
        )

    return {

        "valid": len(issues) == 0,
        "issues": issues
    }