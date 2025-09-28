import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import LabelEncoder, StandardScaler
import joblib
import json
import os

# Load CSV
df = pd.read_csv('./dataset/data.csv')

# Data cleaning
df["HealthStatus"] = df["HealthStatus"].str.strip()
df["Age"] = df["Age"].fillna(df["Age"].median())
df["SleepHours"] = df["SleepHours"].fillna(df["SleepHours"].median())
df["TeaCoffeePerDay"] = df["TeaCoffeePerDay"].fillna(0)
df["ExerciseDays"] = df["ExerciseDays"].fillna(0)
df["HealthyMeals"] = df["HealthyMeals"].fillna(df["HealthyMeals"].median())
df["MealsPerDay"] = df["MealsPerDay"].fillna(df["MealsPerDay"].mode()[0])
df["HealthStatus"] = df["HealthStatus"].fillna("Average")
df = df.drop_duplicates()
df = df.dropna()

# Feature engineering with safe division (avoid division by zero)
df["Meals_to_SleepRatio"] = np.where(
    df["SleepHours"] > 0, 
    df["MealsPerDay"] / df["SleepHours"], 
    0
)
df["Exercise_to_AgeRatio"] = np.where(
    df["Age"] > 0, 
    df["ExerciseDays"] / df["Age"], 
    0
)
df["Caffeine_to_Meals"] = np.where(
    df["MealsPerDay"] > 0, 
    df["TeaCoffeePerDay"] / df["MealsPerDay"], 
    0
)

# Identify numeric columns for scaling
numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns.tolist()
num_features_to_scale = [c for c in numeric_cols]

# Scale features
scaler = StandardScaler()
df[num_features_to_scale] = scaler.fit_transform(df[num_features_to_scale])

# Create models directory
os.makedirs("models", exist_ok=True)

# Save scaler and training columns
joblib.dump(scaler, "models/health_scaler.pkl")
TRAIN_COLUMNS = df.drop(columns=["HealthStatus"]).columns.tolist()
json.dump(TRAIN_COLUMNS, open("models/train_columns.json", "w"))

print("Data after preprocessing:")
print(df.head())

# Prepare features and target
X = df.drop(columns=["HealthStatus"])
y = df["HealthStatus"]

# Encode target variable
le = LabelEncoder()
y_encoded = le.fit_transform(y)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# Train models
lr = LinearRegression()
lr.fit(X_train, y_train)
lr_pred = lr.predict(X_test)

rf = RandomForestRegressor(random_state=42)
rf.fit(X_train, y_train)
rf_pred = rf.predict(X_test)

def print_metrics(name, y_true, y_pred):
    r2 = r2_score(y_true, y_pred)
    mae = mean_absolute_error(y_true, y_pred)
    mse = mean_squared_error(y_true, y_pred)
    rmse = np.sqrt(mse)
    print(f"\n{name} Performance:")
    print(f"  R²   : {r2:.3f}")
    print(f"  MAE  : {mae:,.3f}")
    print(f"  MSE  : {mse:,.3f}")
    print(f"  RMSE : {rmse:,.3f}")

print_metrics("Linear Regression", y_test, lr_pred)
print_metrics("Random Forest", y_test, rf_pred)

# Single-row validation
x_one_df = X_test.iloc[[0]]
y_true = y_test[0]
p_lr_one = float(lr.predict(x_one_df)[0])
p_rf_one = float(rf.predict(x_one_df)[0])

print("\nSingle-row sanity check:")
print(f"  Actual Value: {y_true} ({le.inverse_transform([y_true])[0]})")
print(f"  LR Pred     : {p_lr_one:.2f}")
print(f"  RF Pred     : {p_rf_one:.2f}")

# Save models
joblib.dump(lr, "models/lr_model.joblib")
joblib.dump(rf, "models/rf_model.joblib")

print("\nModels and preprocessing artifacts saved successfully!")