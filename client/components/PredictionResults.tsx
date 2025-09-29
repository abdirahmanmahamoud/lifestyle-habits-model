import React from "react";
import { CardHeader, CardTitle, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";

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

const PredictionResults = ({
  prediction,
}: {
  prediction: PredictionResult;
}) => {
  const model =
    prediction.model === "logistic_regression"
      ? "Logistic Regression"
      : "Random Forest";

  return (
    <>
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-0">
        <div className="absolute inset-0 bg-black/10"></div>
        <CardHeader className="relative z-10 pt-6 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-white">
                  Lifestyle Prediction
                </CardTitle>
                <div className="text-emerald-100 text-sm mt-1">
                  {model} Analysis
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
              <span className="text-sm font-medium text-white">
                Prediction Report
              </span>
            </div>
          </div>
        </CardHeader>
      </div>

      <CardContent className="px-4 pb-3 space-y-6">
        {/* Prediction Display */}
        <div className="text-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
          <div
            className={`text-4xl font-bold mb-3 ${
              prediction.prediction === "Good"
                ? "text-green-600"
                : prediction.prediction === "Poor"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {prediction.prediction}
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 px-3 py-1">
              Prediction Result
            </Badge>
            <div className="text-sm text-slate-500">•</div>
            <div className="text-sm text-slate-600">{model}</div>
          </div>
        </div>

        {/* Input Summary */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-blue-800 rounded-full"></div>
            <h4 className="font-semibold text-slate-800">Input Information</h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(prediction.input).map(([key, value]) => (
              <div
                key={key}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200"
              >
                <div className="text-xl font-bold text-slate-900">{value}</div>
                <div className="text-sm text-slate-600 font-medium">{key}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default PredictionResults;
