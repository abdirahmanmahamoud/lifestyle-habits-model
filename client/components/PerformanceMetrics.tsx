import React from "react";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { BarChart3 } from "lucide-react";

const PerformanceMetrics = () => {
  const metrics = {
    linear_regression: {
      r2: 0.188,
      mae: 0.667,
      mse: 0.519,
      rmse: 0.72,
    },
    random_forest: {
      r2: 0.354,
      mae: 0.478,
      mse: 0.413,
      rmse: 0.642,
    },
  };

  return (
    <>
      <CardHeader className="relative z-10 pb-6 pt-6 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                Lifestyle Habits – Model Performance
              </CardTitle>
              <div className="text-indigo-100 text-sm mt-1">
                Comparison of Linear Regression & Random Forest
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-1 space-y-6 flex-1 flex flex-col">
        {/* Performance Overview */}
        <div className="grid gap-4">
          {/* Linear Regression */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="font-semibold text-blue-900">
                  Linear Regression
                </span>
              </div>
              <span className="text-2xl font-bold text-blue-900">
                {(metrics.linear_regression.r2 * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={metrics.linear_regression.r2 * 100}
              className="h-3 bg-blue-200"
            />
            <div className="mt-2 text-sm text-blue-600">
              R² Score • {metrics.linear_regression.r2}
            </div>
          </div>

          {/* Random Forest */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="font-semibold text-purple-900">
                  Random Forest
                </span>
              </div>
              <span className="text-2xl font-bold text-purple-900">
                {(metrics.random_forest.r2 * 100).toFixed(1)}%
              </span>
            </div>
            <Progress
              value={metrics.random_forest.r2 * 100}
              className="h-3 bg-purple-200"
            />
            <div className="mt-2 text-sm text-purple-600">
              R² Score • {metrics.random_forest.r2}
            </div>
          </div>
        </div>

        {/* Error Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-lg font-semibold text-slate-800 mb-2">
              Linear Regression
            </div>
            <div className="text-sm text-slate-600">
              MAE: {metrics.linear_regression.mae}
            </div>
            <div className="text-sm text-slate-600">
              MSE: {metrics.linear_regression.mse}
            </div>
            <div className="text-sm text-slate-600">
              RMSE: {metrics.linear_regression.rmse}
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-lg font-semibold text-slate-800 mb-2">
              Random Forest
            </div>
            <div className="text-sm text-slate-600">
              MAE: {metrics.random_forest.mae}
            </div>
            <div className="text-sm text-slate-600">
              MSE: {metrics.random_forest.mse}
            </div>
            <div className="text-sm text-slate-600">
              RMSE: {metrics.random_forest.rmse}
            </div>
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default PerformanceMetrics;
