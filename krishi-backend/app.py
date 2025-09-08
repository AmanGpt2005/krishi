import os
import numpy as np
import pandas as pd
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
import tensorflow as tf  

app = Flask(__name__)
CORS(app)

MODEL_PATH = "my_model.h5"
CSV_PATH = "indian_soil_crop_mapping.csv"
MODEL_INPUT_SIZE = (180, 180)  

model = load_model(MODEL_PATH)

def load_soil_crop_mapping(csv_path: str) -> pd.DataFrame:
    df = pd.read_csv(csv_path, encoding="utf-8-sig", engine="python")
    df.columns = [c.strip().lower().replace(" ", "_") for c in df.columns]

    soil_candidates = ["soil_type", "soil", "soilname", "soiltype", "soil_category"]
    crop_candidates = [
        "crop", "crops", "crop_name", "recommended_crop",
        "recommended_crops", "suitable_crops"
    ]

    soil_col = next((c for c in soil_candidates if c in df.columns), None)
    crop_col = next((c for c in crop_candidates if c in df.columns), None)

    if soil_col is None or crop_col is None:
        raise ValueError(
            f"Could not find soil/crop columns in CSV. "
            f"Found columns: {df.columns.tolist()}. "
        )

    df = df[[soil_col, crop_col]].dropna()
    df = df.rename(columns={soil_col: "soil_type", crop_col: "crop"})
    df["soil_type"] = df["soil_type"].astype(str).str.strip()
    df["crop"] = df["crop"].astype(str).str.strip()
    return df


soil_df = load_soil_crop_mapping(CSV_PATH)

# ---- Class names ----
def load_class_names() -> list:
    if os.path.exists("class_names.txt"):
        with open("class_names.txt", "r", encoding="utf-8") as f:
            names = [ln.strip() for ln in f if ln.strip()]
            if names:
                return names
    return sorted(soil_df["soil_type"].unique().tolist())

CLASS_NAMES = load_class_names()
NUM_CLASSES = len(CLASS_NAMES)


@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "file" not in request.files:
            return jsonify({"error": 'No file field "file" in form-data'}), 400

        file = request.files["file"]

        # Preprocess image
        img = Image.open(file.stream).convert("RGB").resize(MODEL_INPUT_SIZE)
        x = np.array(img, dtype=np.float32) / 255.0
        x = np.expand_dims(x, axis=0)

        # Predict with softmax normalization
        predictions = model.predict(x)
        probs = tf.nn.softmax(predictions[0]).numpy()

        raw_idx = int(np.argmax(probs))
        conf = float(np.max(probs))

        # ✅ Fix: handle 1-indexed training
        if len(probs) == NUM_CLASSES + 1:
            idx = raw_idx - 1
        else:
            idx = raw_idx

        if idx < 0 or idx >= NUM_CLASSES:
            idx = idx % NUM_CLASSES  # safe fallback

        soil_type = CLASS_NAMES[idx]

        # Recommend crops from CSV
        recs = soil_df.loc[
            soil_df["soil_type"].str.lower() == soil_type.lower(), "crop"
        ].tolist()

        if not recs:
            recs = soil_df["crop"].value_counts().head(5).index.tolist()

        return jsonify({
            "soilType": soil_type,
            "confidence": f"{conf:.2%}",
            "marketTrend": "Stable",
            "soilMoisture": "Adequate",
            "recommendations": recs,
            "debug": {
                "raw_idx": raw_idx,
                "mapped_idx": idx,
                "num_classes": NUM_CLASSES,
                "probs_shape": len(probs)
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/debug/columns", methods=["GET"])
def debug_columns():
    return jsonify({
        "columns": soil_df.columns.tolist(),
        "unique_soils_sample": sorted(soil_df["soil_type"].unique().tolist())[:20],
        "class_names": CLASS_NAMES
    })


if __name__ == "__main__":
    app.run(debug=True)
