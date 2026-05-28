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
        # SAVE TO CACHE
        # =================================

        save_to_cache({

            "predicted_domain":
                predicted_domain,

            "top_matches":
                top_matches
        })

        # =================================
        # SUCCESS RESPONSE
        # =================================

        return jsonify({

            "success": True,

            "predicted_domain":
                predicted_domain,

            "top_matches":
                top_matches
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

