"use client";

import PerformanceMetrics from "@/components/PerformanceMetrics";
import PredictionResults from "@/components/PredictionResults";
import { Card } from "@/components/ui/card";
import UserInput from "@/components/UserInput";
import { useState } from "react";

type FormData = {
  Age: number | "";
  SleepHours: number | "";
  TeaCoffeePerDay: number | "";
  ExerciseDays: number | "";
  HealthyMeals: number | "";
  MealsPerDay: number | "";
  model: "lr" | "rf";
};

type PredictionResult = {
  model: "logistic_regression" | "random_forest";
  input: {
    Age: number;
    SleepHours: number;
    TeaCoffeePerDay: number;
    ExerciseDays: number;
    HealthyMeals: number;
    MealsPerDay: number;
  };
  prediction: "Good" | "Average" | "Poor";
};

type FormError = Partial<Record<keyof FormData, string>>;

export default function Home() {
  const [error, setError] = useState<FormError>({});
  const [formData, setFormData] = useState<FormData>({
    Age: "",
    SleepHours: "",
    TeaCoffeePerDay: "",
    ExerciseDays: "",
    HealthyMeals: "",
    MealsPerDay: "",
    model: "rf",
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [predictionShow, setPredictionShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const newErrors: FormError = {};

    if (!formData.Age) newErrors.Age = "Age is required";
    if (!formData.SleepHours) newErrors.SleepHours = "Sleep Hours required";
    if (!formData.TeaCoffeePerDay)
      newErrors.TeaCoffeePerDay = "Tea / Coffee is required";
    if (!formData.ExerciseDays)
      newErrors.ExerciseDays = "Exercise Days required";
    if (!formData.HealthyMeals)
      newErrors.HealthyMeals = "Healthy Meal required";
    if (!formData.MealsPerDay) newErrors.MealsPerDay = "Meals Per Day required";

    setError(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const requestData = {
        Age: Number(formData.Age),
        SleepHours: Number(formData.SleepHours),
        TeaCoffeePerDay: Number(formData.TeaCoffeePerDay),
        ExerciseDays: Number(formData.ExerciseDays),
        HealthyMeals: Number(formData.HealthyMeals),
        MealsPerDay: Number(formData.MealsPerDay),
      };

      const response = await fetch(
        `${apiUrl}/predict?model=${formData.model}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PredictionResult = await response.json();
      setPrediction(result);
      setPredictionShow(true);
    } catch (err) {
      console.error("Prediction error:", err);
      setError({
        ...error,
        model: "Error calculating prediction. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-200 space-x-3">
      <Card className="w-full lg:w-1/2 shadow-lg p-0">
        <UserInput
          formData={formData}
          setFormData={setFormData}
          error={error}
          handleSubmit={handleSubmit}
        />
      </Card>
      <Card className="w-full lg:w-1/4 shadow-sm p-0">
        {predictionShow && prediction ? (
          <PredictionResults prediction={prediction} />
        ) : (
          <PerformanceMetrics />
        )}
      </Card>
    </div>
  );
}
