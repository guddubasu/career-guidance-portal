import json
from datetime import datetime

from flask import (
    Flask,
    request,
    jsonify
)

from flask_cors import CORS

import pandas as pd
import joblib

from validation.profile_validation import (
    validate_profile
)

# =====================================
# APP
# =====================================

app = Flask(__name__)

CORS(app)

# =====================================
# LOAD MODEL
# =====================================

try:

    model = joblib.load(
        "training/xgboost_domain_model.pkl"
    )

    encoder = joblib.load(
        "training/domain_label_encoder.pkl"
    )

    print(
        "Model loaded successfully"
    )

except Exception as e:

    print(
        f"Model loading failed: {e}"
    )

    model = None
    encoder = None

# =====================================
# DOMAIN REASONING RULES
# =====================================

DOMAIN_REASON_RULES = {
    "Administrative_Support": [
        ("logical_reasoning", "logical reasoning"),
        ("helping_people", "supporting and helping people"),
        ("business_interest", "organized business-related work")
    ],
    "Agriculture_Environment": [
        ("outdoor_preference", "outdoor work"),
        ("research_interest", "research and observation"),
        ("hands_on_work", "practical hands-on work")
    ],
    "Arts_Design": [
        ("arts_creativity", "arts and creative activities"),
        ("creativity", "creative thinking"),
        ("public_speaking", "expressive communication")
    ],
    "Commerce_Business": [
        ("business_interest", "business and management"),
        ("leadership", "leadership"),
        ("entrepreneurship_mindset", "entrepreneurial thinking")
    ],
    "Education": [
        ("teaching_interest", "teaching and mentoring"),
        ("helping_people", "helping others"),
        ("public_speaking", "explaining ideas clearly")
    ],
    "Emerging_Careers": [
        ("technology_interest", "technology"),
        ("creativity", "creative problem solving"),
        ("research_interest", "exploring new ideas")
    ],
    "Entrepreneurship_Freelancing": [
        ("entrepreneurship_mindset", "starting or building something independently"),
        ("leadership", "decision making and leadership"),
        ("business_interest", "business thinking")
    ],
    "Finance_Banking": [
        ("business_interest", "business and finance"),
        ("logical_reasoning", "analytical thinking"),
        ("research_interest", "research and analysis")
    ],
    "Government_Public_Service": [
        ("helping_people", "serving people"),
        ("leadership", "responsibility and leadership"),
        ("public_speaking", "public communication")
    ],
    "Healthcare": [
        ("helping_people", "helping and caring for people"),
        ("research_interest", "scientific curiosity"),
        ("logical_reasoning", "careful analytical thinking")
    ],
    "Law": [
        ("logical_reasoning", "logical reasoning"),
        ("public_speaking", "argument and public speaking"),
        ("research_interest", "research and interpretation")
    ],
    "Media_Entertainment": [
        ("arts_creativity", "creative expression"),
        ("public_speaking", "communication and presentation"),
        ("creativity", "original ideas")
    ],
    "Psychology_Social_Work": [
        ("helping_people", "understanding and helping people"),
        ("teaching_interest", "guiding others"),
        ("research_interest", "understanding behavior")
    ],
    "STEM": [
        ("logical_reasoning", "logical reasoning"),
        ("research_interest", "research and discovery"),
        ("technology_interest", "technology and science")
    ],
    "Skilled_Trades": [
        ("hands_on_work", "hands-on practical work"),
        ("outdoor_preference", "active work environments"),
        ("logical_reasoning", "practical problem solving")
    ],
    "Sports_Fitness": [
        ("sports_interest", "sports and fitness"),
        ("leadership", "team leadership"),
        ("outdoor_preference", "active environments")
    ],
    "Travel_Hospitality": [
        ("helping_people", "people-focused service"),
        ("public_speaking", "communication"),
        ("outdoor_preference", "dynamic work environments")
    ]
}


def build_domain_recommendations(top_matches, sample_input):

    recommendations = []

    for match in top_matches:

        domain = match["domain"]

        rules = DOMAIN_REASON_RULES.get(
            domain,
            []
        )

        matched_factors = []

        for factor, label in rules:

            score = float(
                sample_input.get(
                    factor,
                    0
                )
            )

            if score >= 0.7:

                matched_factors.append({

                    "factor": factor,

                    "label": label,

                    "score": score
                })

        reasons = [

            f"High score in {item['label']} ({item['score']:.1f}) supports this domain."

            for item in matched_factors
        ]

        if not reasons and rules:

            strongest_factor = max(

                rules,

                key=lambda item: float(
                    sample_input.get(
                        item[0],
                        0
                    )
                )
            )

            strongest_score = float(
                sample_input.get(
                    strongest_factor[0],
                    0
                )
            )

            reasons.append(
                f"Your strongest related score for this domain is {strongest_factor[1]} ({strongest_score:.1f})."
            )

        recommendations.append({

            "domain": domain,

            "score": match["score"],

            "reasons": reasons,

            "matched_factors": matched_factors
        })

    return recommendations

# =====================================
# CACHE SAVE FUNCTION
# =====================================

def save_to_cache(result_data):

    try:

        cache_file = (
            "cache/assessment_cache.json"
        )

        # ================================
        # LOAD EXISTING CACHE
        # ================================

        with open(
            cache_file,
            "r"
        ) as file:

            cache_data = json.load(file)

        # ================================
        # ADD TIMESTAMP
        # ================================

        result_data["timestamp"] = (

            datetime.now()

            .strftime(
                "%Y-%m-%d %H:%M:%S"
            )
        )

        # ================================
        # APPEND RESULT
        # ================================

        cache_data.append(
            result_data
        )

        # ================================
        # KEEP ONLY LAST 50 RESULTS
        # ================================

        cache_data = cache_data[-50:]

        # ================================
        # SAVE BACK
        # ================================

        with open(
            cache_file,
            "w"
        ) as file:

            json.dump(

                cache_data,

                file,

                indent=4
            )

    except Exception as e:

        print(
            "Cache Save Error:",
            e
        )

# =====================================
# HEALTH CHECK ROUTE
# =====================================

@app.route("/")

def home():

    return jsonify({

        "message":
            "Career Prediction API Running"
    })

# =====================================
# PREDICTION ROUTE
# =====================================

@app.route(
    "/predict",
    methods=["POST"]
)

def predict():

    try:

        # =================================
        # MODEL CHECK
        # =================================

        if model is None or encoder is None:

            return jsonify({

                "success": False,

                "issues": [

                    "ML model not loaded properly."
                ]

            }), 500

        # =================================
        # GET INPUT
        # =================================

        sample_input = request.json

        # =================================
        # EMPTY INPUT CHECK
        # =================================

        if not sample_input:

            return jsonify({

                "success": False,

                "issues": [

                    "No input received."
                ]

            }), 400

        # =================================
        # VALIDATION
        # =================================

        validation = validate_profile(
            sample_input
        )

        # =================================
        # STOP IF INVALID
        # =================================

        if not validation["valid"]:

            return jsonify({

                "success": False,

                "validation": {

                    "valid": False,

                    "issues":
                        validation["issues"]
                }

            }), 400

        # =================================
        # CONVERT TO DATAFRAME
        # =================================

        sample_df = pd.DataFrame(
            [sample_input]
        )

        # =================================
        # PREDICTION
        # =================================

        pred = model.predict(
            sample_df
        )[0]

        predicted_domain = (

            encoder.inverse_transform(
                [pred]
            )[0]
        )

        # =================================
        # PROBABILITIES
        # =================================

        probs = model.predict_proba(
            sample_df
        )[0]

        # =================================
        # TOP 5 MATCHES
        # =================================

        top_5_idx = (

            probs.argsort()

            [-5:][::-1]
        )

        top_matches = []

        for idx in top_5_idx:

            score = float(

                round(
                    probs[idx] * 100,
                    2
                )
            )

            top_matches.append({

                "domain":

                    encoder.inverse_transform(
                        [idx]
                    )[0],

                "score": score
            })

        # =================================
        # DOMAIN RECOMMENDATIONS
        # =================================

        recommendations = build_domain_recommendations(
            top_matches,
            sample_input
        )

        # =================================
        # SAVE TO CACHE
        # =================================

        save_to_cache({

            "predicted_domain":
                predicted_domain,

            "top_matches":
                top_matches,

            "recommendations":
                recommendations
        })

        # =================================
        # SUCCESS RESPONSE
        # =================================

        return jsonify({

            "success": True,

            "predicted_domain":
                predicted_domain,

            "top_matches":
                top_matches,

            "recommendations":
                recommendations
        })

    except Exception as e:

        print(
            "Prediction Error:",
            e
        )

        return jsonify({

            "success": False,

            "issues": [

                str(e)
            ]

        }), 500

# =====================================
# START SERVER
# =====================================

if __name__ == "__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True
    )
