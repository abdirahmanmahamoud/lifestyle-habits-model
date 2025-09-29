# HealthStatus Prediction Project

This project predicts a person's **health status** based on lifestyle habits such as age, sleep, caffeine intake, exercise, and meals. It consists of a **Flask API backend** and a **Next.js 15 frontend**.

---

## Project Structure

```
.
├── dataset/
│   └── data.csv                # Raw CSV dataset
├── models/
│   ├── lr_model.joblib          # Linear Regression model
│   ├── rf_model.joblib          # Random Forest model
│   ├── health_scaler.pkl        # StandardScaler
│   └── train_columns.json       # Columns used in training
├── model.ipynb                  # Notebook for preprocessing & training
├── utils.py                     # Feature preparation functions
├── server.py                    # Flask API server
├── requirements.txt             # Python dependencies
├── client/                      # Next.js 15 frontend
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── .env_example
└── README.md
```

---

## Features

- Data cleaning and preprocessing
- Feature engineering:

  - `Meals_to_SleepRatio`
  - `Exercise_to_AgeRatio`
  - `Caffeine_to_Meals`

- Scaling numeric features using `StandardScaler`
- Trains two models:

  - Linear Regression
  - Random Forest Regressor

- REST API for real-time predictions
- Next.js 15 frontend to interact with the API

---

## Environment Variables

Create a `.env` file in the `client` folder based on `.env_example`:

```env
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"
```

- `NEXT_PUBLIC_API_URL` points to the backend API.

---

## Installation

### Backend

1. Install Python dependencies:

```bash
pip install -r requirements.txt
```

2. Start the Flask API server:

```bash
python server.py
```

The API will run at `http://127.0.0.1:8000`.

---

### Frontend (Next.js 15)

1. Navigate to the client folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Next.js app will run at `http://localhost:3000` and interact with the API via `NEXT_PUBLIC_API_URL`.

---

## API Endpoints

### GET /

Returns general information about the API.

**Example Response:**

```json
{
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
}
```

### POST /predict?model=lr|rf

Predicts health status using the specified model (`lr` for Linear Regression, `rf` for Random Forest).

**Request Body Example:**

```json
{
  "Age": 30,
  "SleepHours": 6,
  "TeaCoffeePerDay": 2,
  "ExerciseDays": 3,
  "HealthyMeals": 2,
  "MealsPerDay": 3
}
```

**Response Example:**

```json
{
  "model": "random_forest",
  "input": {
    "Age": 30,
    "SleepHours": 6,
    "TeaCoffeePerDay": 2,
    "ExerciseDays": 3,
    "HealthyMeals": 2,
    "MealsPerDay": 3
  },
  "prediction": "Average"
}
```

---

## Utilities

- `utils.py` provides `prepare_features_from_raw(record)` to convert raw JSON input into model-ready features.
- Handles ratios and scaling consistently with training data.

**Example Usage:**

```python
from utils import prepare_features_from_raw

new_record = {
    "Age": 30,
    "SleepHours": 6,
    "TeaCoffeePerDay": 2,
    "ExerciseDays": 3,
    "HealthyMeals": 2,
    "MealsPerDay": 3
}

df_prepared = prepare_features_from_raw(new_record)
print(df_prepared)
```

---
