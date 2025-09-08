import os
import numpy as np
import pandas as pd
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model

# ---- Flask setup ----
app = Flask(__name__)
CORS(app)

# ---- Config ----
MODEL_PATH = "my_model.h5"
CSV_PATH = "indian_soil_crop_mapping.csv"
CLASS_NAMES_PATH = "class_names.txt"  # must come from training
MODEL_INPUT_SIZE = (180, 180)  # e.g. (180x180x3)

# ---- Load model ----
model = load_model(MODEL_PATH)

# ---- Load soil-crop mapping CSV ----
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

# ---- Load class names (MUST come from training) ----
def load_class_names(path: str) -> list:
    if not os.path.exists(path):
        raise FileNotFoundError(
            f"Missing {path}. Please save class names during training:\n"
            f'with open("{path}", "w") as f:\n'
            f'    for name in train_ds.class_names:\n'
            f'        f.write(name + "\\n")'
        )
    with open(path, "r", encoding="utf-8") as f:
        names = [ln.strip() for ln in f if ln.strip()]
    if not names:
        raise ValueError(f"{path} is empty. It must contain one class name per line.")
    return names

CLASS_NAMES = load_class_names(CLASS_NAMES_PATH)
NUM_CLASSES = len(CLASS_NAMES)

# ---- Verify model output shape vs class names ----
if model.output_shape[-1] != NUM_CLASSES:
    raise ValueError(
        f"Model outputs {model.output_shape[-1]} classes, "
        f"but class_names.txt has {NUM_CLASSES}. "
        f"Please regenerate class_names.txt from the same dataset used in training."
    )

# ---- Prediction route ----
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "file" not in request.files:
            return jsonify({"error": 'No file field "file" in form-data'}), 400

        file = request.files["file"]

        # Preprocess image
        img = Image.open(file.stream).convert("RGB").resize(MODEL_INPUT_SIZE)
        x = np.array(img, dtype=np.float32)   # keep 0–255 like in Colab
        x = np.expand_dims(x, axis=0)


        # Predict (assume last Dense already has softmax)
        predictions = model.predict(x)
        probs = predictions[0]

        idx = int(np.argmax(probs))
        conf = float(np.max(probs))
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
                "idx": idx,
                "class_names": CLASS_NAMES,
                "probs": probs.tolist()
            }
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ---- Debug route ----
@app.route("/debug/columns", methods=["GET"])
def debug_columns():
    return jsonify({
        "columns": soil_df.columns.tolist(),
        "unique_soils_sample": sorted(soil_df["soil_type"].unique().tolist())[:20],
        "class_names": CLASS_NAMES
    })

# ---- Run app ----
if __name__ == "__main__":
    app.run(debug=True)
