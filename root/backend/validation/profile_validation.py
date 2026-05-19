import numpy as np


def validate_profile(sample_input):

    values = np.array(
        list(sample_input.values())
    )

    avg_score = np.mean(values)

    std_dev = np.std(values)

    issues = []


    if avg_score > 0.90:

        issues.append(
        "All responses are extremely high."
        )


    if avg_score < 0.10:

        issues.append(
        "All responses are extremely low."
        )


    if len(set(values)) == 1:

        issues.append(
        "All answers are identical."
        )


    if std_dev < 0.08:

        issues.append(
        "Responses are too similar."
        )


    extreme_count = np.sum(

        (values >= 0.95) |

        (values <= 0.05)

    )


    if extreme_count >= 10:

        issues.append(
        "Too many extreme values."
        )


    # contradictions

    if (

        sample_input["technology_interest"] > 0.8

        and

        sample_input["logical_reasoning"] < 0.3

    ):

        issues.append(
        "Tech high but logic low."
        )


    if len(issues)==0:

        return {

            "valid":True,

            "issues":[]

        }


    return {

        "valid":False,

        "issues":issues

    }