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
        "✓ Model loaded successfully"
    )

except Exception as e:

    print(
        f"Model loading failed: {e}"
    )


# =====================================
# ROUTE
# =====================================

@app.route(
"/predict",
methods=["POST"]
)

def predict():

    try:

        sample_input = request.json


        # -------------------------
        # Empty request check
        # -------------------------

        if not sample_input:

            return jsonify({

                "valid": False,

                "issues": [

                    "No input received"

                ]

            }),400


        # -------------------------
        # VALIDATION
        # -------------------------

        validation = validate_profile(
            sample_input
        )


        if not validation["valid"]:

            return jsonify({

                "valid": False,

                "issues":

                validation["issues"]

            }),400


        # -------------------------
        # CONVERT TO DATAFRAME
        # -------------------------

        sample_df = pd.DataFrame(
            [sample_input]
        )


        # -------------------------
        # PREDICTION
        # -------------------------

        pred = model.predict(
            sample_df
        )[0]


        predicted_domain = (

            encoder.inverse_transform(

                [pred]

            )[0]

        )


        probs = model.predict_proba(
            sample_df
        )[0]


        # -------------------------
        # TOP 5 MATCHES
        # -------------------------

        top_5_idx = (

            probs.argsort()

            [-5:][::-1]

        )


        top_matches = []


        for idx in top_5_idx:
            # compute native Python float score to avoid NumPy types in JSON
            try:
                score = float(round(float(probs[idx]) * 100, 2))
            except Exception:
                score = float(round(probs[idx] * 100, 2))

            top_matches.append({
                "domain": encoder.inverse_transform([idx])[0],
                "score": score
            })


        # -------------------------
        # SUCCESS RESPONSE
        # -------------------------

        return jsonify({

            "valid": True,

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

            "valid": False,

            "issues": [

                str(e)

            ]

        }),500



# =====================================
# START SERVER
# =====================================

if __name__=="__main__":

    app.run(

        host="0.0.0.0",

        port=5000,

        debug=True

    )