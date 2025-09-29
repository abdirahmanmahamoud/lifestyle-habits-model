"use client";

import { TrendingUp } from "lucide-react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface UserInputFormData {
  Age: number | "";
  SleepHours: number | "";
  TeaCoffeePerDay: number | "";
  ExerciseDays: number | "";
  HealthyMeals: number | "";
  MealsPerDay: number | "";
  model: "lr" | "rf";
}

type FormError = Partial<Record<keyof UserInputFormData, string>>;

interface UserInputProps {
  formData: UserInputFormData;
  setFormData: (formData: UserInputFormData) => void;
  error: FormError;
  handleSubmit: () => void;
}

const UserInput = ({
  error,
  formData,
  setFormData,
  handleSubmit,
}: UserInputProps) => {
  // generic handler
  const handleChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="w-full">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 rounded-t-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-white text-2xl font-bold">
            Lifestyle Habits Model
          </CardTitle>
        </div>
        <CardDescription className="text-blue-100 text-lg font-medium">
          AI-powered lifestyle habits assessment
        </CardDescription>
        <p className="text-blue-200 text-sm mt-2">
          Powered by advanced algorithms
        </p>
      </CardHeader>

      {/* Form */}
      <CardContent className="py-8 px-7 space-y-4">
        {/* Age + ExerciseDays */}
        <div className="w-full flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-[50%]">
            <label className="block text-base font-medium text-gray-700">
              Your Age
            </label>
            <Input
              type="number"
              className={`mt-1 border-2 ${error?.Age ? "border-red-500" : ""}`}
              placeholder="Your Age"
              value={formData.Age || ""}
              onChange={(e) => handleChange("Age", e.target.value)}
            />
            {error?.Age && (
              <p className="text-red-500 text-sm mt-1">{error.Age}</p>
            )}
          </div>

          <div className="w-full lg:w-[50%]">
            <label className="block text-base font-medium text-gray-700">
              Exercise Days
            </label>
            <Input
              type="number"
              className={`mt-1 border-2 ${
                error?.ExerciseDays ? "border-red-500" : ""
              }`}
              placeholder="Exercise Days"
              value={formData.ExerciseDays || ""}
              onChange={(e) => handleChange("ExerciseDays", e.target.value)}
            />
            {error?.ExerciseDays && (
              <p className="text-red-500 text-sm mt-1">{error.ExerciseDays}</p>
            )}
          </div>
        </div>

        {/* TeaCoffeePerDay + SleepHours */}
        <div className="w-full flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-[50%]">
            <label className="block text-base font-medium text-gray-700">
              Tea / Coffee Per Day
            </label>
            <Input
              type="number"
              className={`mt-1 border-2 ${
                error?.TeaCoffeePerDay ? "border-red-500" : ""
              }`}
              placeholder="Tea / Coffee Per Day"
              value={formData.TeaCoffeePerDay || ""}
              onChange={(e) => handleChange("TeaCoffeePerDay", e.target.value)}
            />
            {error?.TeaCoffeePerDay && (
              <p className="text-red-500 text-sm mt-1">
                {error.TeaCoffeePerDay}
              </p>
            )}
          </div>

          <div className="w-full lg:w-[50%]">
            <label className="block text-base font-medium text-gray-700">
              Sleep Hours
            </label>
            <Input
              type="number"
              className={`mt-1 border-2 ${
                error?.SleepHours ? "border-red-500" : ""
              }`}
              placeholder="Sleep Hours"
              value={formData.SleepHours || ""}
              onChange={(e) => handleChange("SleepHours", e.target.value)}
            />
            {error?.SleepHours && (
              <p className="text-red-500 text-sm mt-1">{error.SleepHours}</p>
            )}
          </div>
        </div>

        {/* HealthyMeals + MealsPerDay */}
        <div className="w-full flex flex-col lg:flex-row gap-3">
          <div className="w-full lg:w-[50%]">
            <label className="block text-base font-medium text-gray-700">
              Healthy Meals Per Day
            </label>
            <Input
              type="number"
              className={`mt-1 border-2 ${
                error?.HealthyMeals ? "border-red-500" : ""
              }`}
              placeholder="Healthy Meals"
              value={formData.HealthyMeals || ""}
              onChange={(e) => handleChange("HealthyMeals", e.target.value)}
            />
            {error?.HealthyMeals && (
              <p className="text-red-500 text-sm mt-1">{error.HealthyMeals}</p>
            )}
          </div>

          <div className="w-full lg:w-[50%]">
            <label className="block text-base font-medium text-gray-700">
              Meals Per Day
            </label>
            <Input
              type="number"
              className={`mt-1 border-2 ${
                error?.MealsPerDay ? "border-red-500" : ""
              }`}
              placeholder="Meals Per Day"
              value={formData.MealsPerDay || ""}
              onChange={(e) => handleChange("MealsPerDay", e.target.value)}
            />
            {error?.MealsPerDay && (
              <p className="text-red-500 text-sm mt-1">{error.MealsPerDay}</p>
            )}
          </div>
        </div>

        {/* Select Model */}
        <div className="w-full">
          <label className="block text-base font-medium text-gray-700">
            Select Model
          </label>
          <Select
            value={formData.model || ""}
            onValueChange={(val) => handleChange("model", val)}
          >
            <SelectTrigger
              className={`w-full border-2 mt-1 ${
                error?.model ? "border-red-500" : ""
              }`}
            >
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lr">Logistic Regression</SelectItem>
              <SelectItem value="rf">Random Forest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 mt-4 rounded-lg cursor-pointer"
          onClick={handleSubmit}
        >
          Get Predict
        </Button>
      </CardContent>
    </div>
  );
};

export default UserInput;
