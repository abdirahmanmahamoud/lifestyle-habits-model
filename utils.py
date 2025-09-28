import json
import joblib
import pandas as pd

TRAIN_COLUMNS = json.load(open("models/train_columns.json"))
SCALER = joblib.load("models/house_scaler.pkl") 

def prepare_features_from_raw(record: dict) -> pd.DataFrame:
    age = float(record.get("Age", 0))
    sleep = float(record.get("SleepHours", 0))
    tea = float(record.get("TeaCoffeePerDay", 0))
    exercise = float(record.get("ExerciseDays", 0))
    healthy_meals = float(record.get("HealthyMeals", 0))
    meals = float(record.get("MealsPerDay", 0))

    meals_to_sleep = meals / sleep if sleep else 0.0
    exercise_to_age = exercise / age if age else 0.0
    caffeine_to_meals = tea / meals if meals else 0.0

    row = {col: 0.0 for col in TRAIN_COLUMNS}

    for name, val in [
        ("Age", age),
        ("SleepHours", sleep),
        ("TeaCoffeePerDay", tea),
        ("ExerciseDays", exercise),
        ("HealthyMeals", healthy_meals),
        ("MealsPerDay", meals),
        ("Meals_to_SleepRatio", meals_to_sleep),
        ("Exercise_to_AgeRatio", exercise_to_age),
        ("Caffeine_to_Meals", caffeine_to_meals),
    ]:
        if name in row:
            row[name] = float(val)

    df_one = pd.DataFrame([row], columns=TRAIN_COLUMNS)

    if hasattr(SCALER, "feature_names_in_"):
        cols_to_scale = list(SCALER.feature_names_in_)
        df_one[cols_to_scale] = SCALER.transform(df_one[cols_to_scale])

    return df_one


new_record = {
    "Age": 30,
    "SleepHours": 6,
    "TeaCoffeePerDay": 2,
    "ExerciseDays": 3,
    "HealthyMeals": 2,
    "MealsPerDay": 3
}

prepared_df = prepare_features_from_raw(new_record)
print(prepared_df)