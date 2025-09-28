from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from utils import prepare_features_from_raw  

app = Flask(__name__)
CORS(app) 


MODELS = {
    "lr": joblib.load("models/lr_model.joblib"), 
    "rf": joblib.load("models/rf_model.joblib"),
}


LE = joblib.load("models/label_encoder.joblib") 

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "HealthStatus Prediction API",
        "endpoints": {
            "POST /predict?model=lr|rf": {
                "expects_json": {
                    "Age": "number",
                    "SleepHours": "number",
                    "TeaCoffeePerDay": "number",
                    "ExerciseDays": "number",
                    "HealthyMeals": "number",
                    "MealsPerDay": "number"
                }
            }
        }
    })


@app.route("/predict", methods=["POST"])
def predict():
    choice = (request.args.get("model") or "").lower()
    if choice not in MODELS:
        return jsonify({"error": "Unknown model. Use model=lr or model=rf"}), 400
    model = MODELS[choice]

    data = request.get_json(silent=True) or {}
    required = ["Age", "SleepHours", "TeaCoffeePerDay", "ExerciseDays", "HealthyMeals", "MealsPerDay"]
    missing = [k for k in required if k not in data]
    if missing:
        return jsonify({"error": f"Missing fields: {missing}"}), 400

    try:
        x_new = prepare_features_from_raw(data) 
        pred_numeric = model.predict(x_new)[0]
        pred_label = LE.inverse_transform([int(pred_numeric)])[0]
    except Exception as e:
        return jsonify({"error": f"Failed to prepare/predict: {e}"}), 500

    return jsonify({
        "model": "logistic_regression" if choice == "lr" else "random_forest",
        "input": {k: data[k] for k in required},
        "prediction": pred_label
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)
